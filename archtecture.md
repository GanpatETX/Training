# Aerospace ERP — Architecture & LLD

**Version**: 1.1 | **Phase 1 Target**: ATS (HRMS Module) | **Stack**: FastAPI · PostgreSQL · React · Redis · RabbitMQ · Celery · MinIO · Zoho SSO/Email

---

## 1\. Purpose of This Document

This document defines:

* The **long-term engine architecture** of the Aerospace ERP platform
* The **boundaries** between every engine — what each owns, what it does not
* The **Phase 1 build scope** (ATS module, end of month)
* The **LLD contract** for each engine: data schemas, function signatures, inputs, outputs, constraints, validation logic — no actual code

Developers use this as the single source of truth. No ambiguity. No overlap.

---

## 2\. System Philosophy

> **Configuration over code deployment.** Every module (ATS, Procurement, Testing, etc.) is a runtime configuration of the same set of engines — not a separately built application.

|Principle|Implementation|
|---|---|
|Modules are config|Entities, forms, workflows, permissions defined in DB — not in Python files|
|Immutable audit trail|Append-only event logs enforced at DB level|
|Engines are stateless|All state lives in PostgreSQL; engines are pure processors|
|RBAC at every layer|Applied from org → department → module → record → field|
|Change tracking|SCD Type 2 on all config tables — who changed what, when|
|Idempotency|All write operations keyed on idempotency_key — duplicate requests are safe and return the original result|
|Node-editor compatibility|All configs stored in DB as structured rows/JSONB — directly editable now, GUI node editor slots in later without schema changes|

---

## 3\. Infrastructure Overview

```
┌─────────────────────────────────────────────────────────┐
│                        React Frontend                    │
│         Reads page config → renders form schema          │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────────┐
│                    FastAPI (API Layer)                    │
│   Auth middleware → RBAC check → Engine dispatch         │
└──┬──────────┬──────────┬──────────┬──────────┬──────────┘
   │          │          │          │          │
Entity    Form       Workflow  Permission  Audit
Engine    Engine     Engine    Engine      Engine
   │          │          │          │          │
└──┴──────────┴──────────┴──────────┴──────────┴──────────┘
                         │
              ┌──────────▼──────────┐
              │     PostgreSQL       │
              │   (standalone)      │
              └──────────┬──────────┘
          ┌──────────────┼──────────────┐
        Redis         RabbitMQ        MinIO
      (Cache)        (Queue)       (File store)
                         │
                      Celery
                    (Async workers)
                         │
                    Zoho Email API
```

### Infrastructure Components

|Component|Role|Dockerized|
|---|---|---|
|FastAPI|API layer, middleware, engine orchestration|✅|
|PostgreSQL|Source of truth for all state and config|✅ with volume|
|Redis|RBAC cache, session cache, record cache|✅ with volume|
|RabbitMQ|Message broker for async tasks|✅ with volume|
|Celery|Async workers: notifications, SLA timers, bulk ops|✅|
|MinIO|Object storage for documents, attachments|✅ with volume|
|Zoho SSO|Authentication provider (OAuth2)|External|
|Zoho Email API|Transactional email (Phase 1); extensible to Cliq, SMS|External|
|systemd|Scheduled ERP jobs: DB backups, SLA sweeps, digest emails|Host OS|

---

## 4\. Engine Architecture — Boundaries

### 4.1 The 7 Engines

```
┌─────────────────────────────────────────────────────────┐
│                    ENTITY BUILDER                        │
│  Defines what exists: entities, fields, relationships    │
│  Owner of schema. All other engines read from here.      │
└──────────────────────┬──────────────────────────────────┘
                       │ entity schema
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────────┐
  │  FORM    │  │PERMISSION│  │  WORKFLOW    │
  │  ENGINE  │  │  ENGINE  │  │   ENGINE     │
  │          │  │          │  │              │
  │Renders   │  │Evaluates │  │Validates &   │
  │form from │  │RBAC      │  │transitions   │
  │schema +  │  │policies  │  │states        │
  │RBAC mask │  │          │  │              │
  └────┬─────┘  └────┬─────┘  └──────┬───────┘
       │              │               │
       └──────────────┼───────────────┘
                      ▼
              ┌───────────────┐
              │  AUDIT ENGINE │
              │  Append-only  │
              │  event log    │
              └───────┬───────┘
                      │
              ┌───────▼───────┐
              │NOTIFICATION   │
              │ENGINE         │
              │(via Workflow) │
              └───────────────┘
              ┌───────────────┐
              │ PAGE          │
              │ ORCHESTRATOR  │
              │ role+state →  │
              │ page config   │
              └───────────────┘
```

### 4.2 Boundary Rules — No Exceptions

|Engine|Owns|Does NOT own|
|---|---|---|
|**Entity Builder**|Entity schemas, field definitions, relationships, custom_fields JSONB, schema versions|Form layout, permissions, workflow states|
|**Form Engine**|Form schema (field order, visibility, validation rules), field rendering config, form versions|Entity schema, permission decisions, state transitions|
|**Permission Engine**|RBAC role definitions, policy rules (who can do what on which entity/field/record), policy evaluation|Workflow transitions, form layout, entity schema|
|**Workflow Engine**|State definitions, transition rules, validator registry, SLA escalations, action handlers|Permission decisions (calls Permission Engine), form rendering|
|**Audit Engine**|Append-only event log, change history, SCD Type 2 snapshots|Business logic, notifications|
|**Notification Engine**|Template registry, dispatch logic, delivery log|When to notify (told by Workflow Engine)|
|**Page Orchestrator**|Route config: role + entity state → page component mapping|Form content, permission logic|

---

## 5\. Engine Interactions — How They Work Together

This section defines exactly which engine calls which, in what order, and what data flows between them. This is the connective tissue of the system.

### 5.1 Interaction Map

```
Actor (HTTP Request)
    │
    ▼
[Auth Middleware]  ←── Zoho SSO JWT validation
    │ actor_id + roles
    ▼
[Permission Engine]  ◄─── called by every engine before acting
    │ ALLOW / DENY decision
    ▼
┌───────────────────────────────────────────────┐
│              Request Router (FastAPI)          │
└──┬──────────────┬──────────────┬──────────────┘
   │              │              │
   ▼              ▼              ▼
[Form Engine] [Workflow Engine] [Page Orchestrator]
   │              │
   │         reads entity schema from [Entity Builder]
   │              │
   └──────────────┤
                  ▼
            [Audit Engine]  ◄── called by ALL engines on any write
                  │
                  ▼
           [RabbitMQ Queue]
                  │
                  ▼
           [Celery Workers]
                  │
                  ▼
        [Notification Engine]
                  │
                  ▼
           [Zoho Email API]
```

### 5.2 Who Calls Whom

|Caller|Calls|Why|
|---|---|---|
|API Middleware|Permission Engine|Validate actor on every request|
|Form Engine|Permission Engine|Get field-level read/write masks|
|Form Engine|Entity Builder|Get field definitions for rendering|
|Workflow Engine|Permission Engine|Check transition authorization|
|Workflow Engine|Audit Engine|Log every state transition|
|Workflow Engine|RabbitMQ|Enqueue notification dispatch|
|Workflow Engine|Entity Builder|Read entity schema for validator context|
|Celery Worker|Notification Engine|Execute async dispatch|
|Notification Engine|Zoho Email API|Send email (Phase 1)|
|Page Orchestrator|Workflow Engine|Get available transitions for current state|
|Page Orchestrator|Permission Engine|Filter actions by role|

### 5.3 What Happens on a Record Write (Form Submission)

```
1. Actor submits form  →  POST /entity/{name}/records
2. Auth Middleware     →  extracts actor + roles from JWT
3. Permission Engine   →  evaluate(actor, 'create', entity) → ALLOW/DENY
4. Form Engine         →  validate_submission(entity, form_data, actor)
                          - checks required fields, types, enum values
                          - checks actor cannot inject fields they can't write
5. Entity Builder      →  validates against field_definitions constraints
6. DB write            →  INSERT into entity record table (idempotency_key checked)
7. Workflow Engine     →  creates workflow_instance with initial state
                          - sets context = validated form_data
8. Audit Engine        →  log(entity, record_id, actor, 'record_created', ...)
9. Response            →  {record_id, current_state, available_transitions}
```

### 5.4 What Happens on a Workflow Transition

```
1. Actor triggers transition  →  POST /workflow/transition
   {instance_id, transition_name, payload, idempotency_key}
2. Auth Middleware      →  extracts actor + roles
3. Workflow Engine      →  checks idempotency_key in workflow_events
                           (if found → return original result, stop)
4. Permission Engine    →  evaluate(actor, 'transition', entity, record_id)
5. Workflow Engine      →  runs validator primitives from transition config
6. DB transaction (atomic):
   a. Update workflow_instances.current_state
   b. Append to workflow_events (immutable, with idempotency_key)
   c. Execute action handlers in order:
      - update_field    → writes to record
      - create_audit_log → calls Audit Engine.log()
      - send_notification → publishes to RabbitMQ
      - trigger_workflow  → spins up child workflow instance
7. RabbitMQ            →  receives notification event
8. Celery Worker       →  consumes event, calls Notification Engine.dispatch()
9. Notification Engine →  checks notification_log idempotency_key
                          → renders template, calls Zoho Email API
                          → writes delivery status to notification_log
10. Frontend           →  polls or receives push → re-fetches PageConfig
```

### 5.5 What Happens on a Config Change (e.g. Workflow State Added)

```
1. Admin directly inserts/updates config in DB (Phase 1)
   (Future: node editor UI writes same DB rows)
2. Workflow Engine      →  register_workflow_change() called
   a. Reads current definition
   b. Writes SCD Type 2 snapshot to workflow_definition_history
      {changed_by, changed_at, change_reason, states_snapshot, version++}
   c. Updates live workflow_states + workflow_transitions rows
3. Audit Engine         →  log(workflow_definition, id, actor, 'workflow_config_change')
4. Redis cache          →  invalidate workflow definition cache key
5. Existing instances   →  continue on their pinned version until explicitly migrated
```

**Node editor compatibility**: In Phase 1, admins write directly to the DB rows that the node editor will later write to. The schema is identical — the editor is just a GUI layer on top of the same tables. No migration needed when the editor is introduced.

### 5.6 Systemd Scheduled Jobs

systemd services run on the host OS (outside Docker) and trigger Celery tasks or direct DB operations on schedule:

|Service|Schedule|Action|
|---|---|---|
|`erp-db-backup.service`|Daily 2AM|pg_dump → MinIO backup bucket|
|`erp-sla-sweep.service`|Every 15min|Query workflow_instances for breached SLA → publish to RabbitMQ|
|`erp-digest.service`|Weekly Monday 8AM|Trigger digest notification for configured roles|
|`erp-cache-refresh.service`|On boot|Pre-warm Redis with RBAC + workflow definitions|

---

## 6\. RBAC vs Permission Engine — Explicit Boundary

This is the most commonly confused boundary. Here is the precise definition:

### RBAC (Role-Based Access Control)

*  **What it is**: A *model* — a set of rules that say "Role X can perform Action Y on Resource Z"
*  **Where it lives**: `roles`, `permissions`, `role_permissions` tables — owned by Permission Engine
*  **Who enforces it**: Every engine calls the Permission Engine before acting

### Permission Engine

*  **What it is**: The *engine* that stores RBAC policies and evaluates them at runtime
*  **It does not enforce** — it *evaluates and returns a decision*
*  **Callers act on the decision**: Form Engine masks fields, Workflow Engine blocks transitions, API layer returns 403

### Flow

```
Request arrives at API
    → Auth Middleware extracts actor + roles (from Zoho SSO JWT)
    → Permission Engine.evaluate(actor, action, resource) → ALLOW / DENY
    → If ALLOW: engine proceeds
    → If DENY: 403 returned, audit log written
```

### RBAC-First Design — ABAC-Ready

Phase 1 implements **pure RBAC**. The Permission Engine is designed to accommodate ABAC in future phases without structural changes:

* ` permissions`table includes a `scope` column (`own` / `department` / `all`) — this is row-level filtering today, extensible to full ABAC context evaluation later
* ` evaluate()`function signature accepts `context: dict` as an optional parameter — ignored in Phase 1, consumed by ABAC evaluator in future phases
* No ABAC policy engine is built now. The interface contract is set so ABAC slots in as an additional evaluation layer inside `evaluate()` without changing callers

---

## 7\. Engine LLD Contracts

### 6.1 Entity Builder

#### Purpose

Defines all entities (tables), their fields, types, relationships, and versioning. Phase 1: hard-coded as DB migrations + Pydantic models. The builder UI is deferred.

#### DB Schema

```
-- Entity registry
entity_definitions (
    id              UUID PK,
    name            TEXT UNIQUE,        -- e.g. 'candidate', 'job_requisition'
    label           TEXT,
    module_id       UUID FK,
    custom_fields   JSONB DEFAULT '{}', -- escape hatch for ad-hoc fields
    schema_version  INT DEFAULT 1,
    is_active       BOOL DEFAULT TRUE,
    created_at      TIMESTAMPTZ,
    created_by      UUID FK actors
)

-- SCD Type 2: tracks every schema change
entity_schema_history (
    id              UUID PK,
    entity_id       UUID FK entity_definitions,
    schema_snapshot JSONB,              -- full field list at that version
    version         INT,
    changed_by      UUID FK actors,
    changed_at      TIMESTAMPTZ,
    change_reason   TEXT
)

-- Field definitions per entity
field_definitions (
    id              UUID PK,
    entity_id       UUID FK,
    name            TEXT,
    label           TEXT,
    field_type      TEXT,              -- text, number, date, enum, fk, file, boolean
    is_required     BOOL,
    is_system       BOOL,              -- system fields cannot be deleted
    enum_values     JSONB,            -- for enum types
    fk_entity       UUID FK,          -- for FK types
    constraints     JSONB,            -- {min, max, regex, allowed_values}
    created_by      UUID FK actors,
    created_at      TIMESTAMPTZ
)
```

#### Functions

`**get_entity_schema(entity_name: str, version: int | None) → EntitySchema**`

* Input: entity name, optional version (None = latest)
* Output: EntitySchema {entity_id, fields: List\[FieldDefinition\], version}
* Constraint: raises `EntityNotFound` if entity_name invalid

`**register_schema_change(entity_id, changed_by, new_fields, reason) → SchemaVersion**`

* Input: entity_id, actor_id, updated field list, reason string
* Output: new version number
* Constraint: increments version, writes SCD Type 2 row, emits `entity.schema_changed` event to Audit Engine
* Validation: cannot remove `is_system=True` fields

---

### 6.2 Form Engine

#### Purpose

Renders form schemas from entity definitions + RBAC masks. Does not store data — produces a form config that the frontend renders. Forms have two field categories:

*  **Basic fields**: statically defined in `field_definitions` (system fields, always present)
*  **Dynamic fields**: driven by `custom_fields` JSONB on the entity or conditional logic in the form layout (shown/hidden based on record state or other field values)

#### DB Schema

```
form_definitions (
    id              UUID PK,
    entity_id       UUID FK entity_definitions,
    name            TEXT,
    layout          JSONB,    -- field order, sections, conditional logic
    version         INT,
    is_active       BOOL,
    created_by      UUID FK actors,
    created_at      TIMESTAMPTZ
)

form_schema_history (          -- SCD Type 2
    id              UUID PK,
    form_id         UUID FK,
    layout_snapshot JSONB,
    version         INT,
    changed_by      UUID FK,
    changed_at      TIMESTAMPTZ,
    change_reason   TEXT
)
```

#### Form Schema Shape (JSONB layout)

```
{
  "sections": [
    {
      "label": "Personal Info",
      "fields": [
        {
          "field_name": "full_name",
          "field_category": "basic",
          "visible": true,
          "editable": true,
          "required": true,
          "conditional": null
        },
        {
          "field_name": "salary_expectation",
          "field_category": "basic",
          "visible": false,
          "editable": false,
          "conditional": {
            "show_if": { "field": "stage", "equals": "offer" }
          }
        }
      ]
    },
    {
      "label": "Additional Info",
      "fields": [
        {
          "field_name": "custom_clearance_level",
          "field_category": "dynamic",
          "source": "custom_fields",
          "visible": true,
          "editable": true,
          "required": false,
          "conditional": null
        }
      ]
    }
  ]
}
```

#### Functions

`**render_form(entity_name: str, record_id: UUID | None, actor: Actor) → RenderedForm**`

* Input: entity name, optional record_id (None = new record), actor with roles
* Output: RenderedForm — layout with fields masked per RBAC
* Process:
  1. Load form_definition for entity
  2. Call `permission_engine.get_field_permissions(actor, entity_name)` → allowed fields
  3. Mask fields: set `visible=False`, `editable=False` for denied fields
  4. Apply conditional logic from layout config
* Constraint: never returns fields actor has no read permission on

`**validate_submission(entity_name: str, form_data: dict, actor: Actor) → ValidationResult**`

* Input: entity name, submitted form data, actor
* Output: ValidationResult {ok: bool, errors: List\[{field, message}\]}
* Validation:
  * Required fields present
  * Field types match field_definitions
  * Enum values within allowed set
  * Actor cannot submit values for fields they have no write permission on (injection check)

---

### 6.3 Permission Engine

#### Purpose

Stores RBAC policies. Evaluates access decisions. Called by all other engines. Does not enforce — returns decisions only.

#### DB Schema

```
roles (
    id          UUID PK,
    name        TEXT UNIQUE,    -- 'hiring_manager', 'candidate', 'founder'
    label       TEXT,
    module_id   UUID FK,
    created_by  UUID FK actors,
    created_at  TIMESTAMPTZ
)

permissions (
    id          UUID PK,
    role_id     UUID FK roles,
    entity_name TEXT,
    action      TEXT,          -- create, read, update, delete, transition
    field_name  TEXT,          -- NULL = whole record
    scope       TEXT,          -- 'own', 'department', 'all'
    effect      TEXT           -- 'allow', 'deny'
)

-- SCD Type 2 on permission changes
permission_history (
    id              UUID PK,
    permission_id   UUID FK,
    snapshot        JSONB,
    changed_by      UUID FK actors,
    changed_at      TIMESTAMPTZ,
    change_reason   TEXT
)

actor_roles (
    actor_id    UUID FK actors,
    role_id     UUID FK roles,
    assigned_by UUID FK actors,
    assigned_at TIMESTAMPTZ,
    revoked_at  TIMESTAMPTZ    -- NULL = active
)
```

#### Phase 1 Roles (ATS)

|Role|Scope|
|---|---|
|`hiring_manager`|Own requisitions + pipelines only|
|`ptc` (People & Talent Coordinator)|All candidates, offer letters|
|`cos` (Chief of Staff)|All — read + approve|
|`founder`|All — full access|
|`supporting_member`|Assigned candidates only|
|`candidate`|Own profile only|
|`referee`|Assigned feedback forms only|

#### Functions

`**evaluate(actor: Actor, action: str, entity_name: str, record_id: UUID | None, field_name: str | None) → Decision**`

* Input: actor with roles, action string, entity name, optional record + field
* Output: Decision {effect: 'allow'|'deny', reason: str}
* Process:
  1. Load permissions for actor's roles (from Redis cache first)
  2. Match most specific rule: field > record > entity > module
  3. Deny-by-default if no rule matches
* Constraint: cache invalidated on role change or permission change events

`**get_field_permissions(actor: Actor, entity_name: str) → Dict\[str, FieldAccess\]**`

* Input: actor, entity name
* Output: `{field_name: {read: bool, write: bool}}`
* Used by Form Engine to mask fields

`**get_record_scope(actor: Actor, entity_name: str) → ScopeFilter**`

* Input: actor, entity
* Output: ScopeFilter {type: 'own'|'department'|'all', filter_by: str | None}
* Used by API layer to apply row-level filters to queries

---

### 6.4 Workflow Engine

#### Purpose

Manages state machines for entities. States and transitions are stored in DB — not hardcoded in Python. Every change to a workflow definition is tracked (SCD Type 2). Calls Permission Engine for transition authorization. Calls Notification Engine via RabbitMQ.

#### DB Schema

```
-- Workflow definitions: config-driven, not hardcoded
workflow_definitions (
    id              UUID PK,
    entity_name     TEXT,
    name            TEXT,
    version         INT,
    is_active       BOOL,
    created_by      UUID FK actors,
    created_at      TIMESTAMPTZ
)

-- States: stored in DB, fully dynamic
workflow_states (
    id              UUID PK,
    definition_id   UUID FK workflow_definitions,
    name            TEXT,
    label           TEXT,
    is_initial      BOOL DEFAULT FALSE,
    is_terminal     BOOL DEFAULT FALSE,
    created_by      UUID FK actors,
    created_at      TIMESTAMPTZ
)

-- Transitions between states
workflow_transitions (
    id              UUID PK,
    definition_id   UUID FK,
    name            TEXT,
    from_state_id   UUID FK workflow_states,
    to_state_id     UUID FK workflow_states,
    validator_rules JSONB,   -- list of primitive validator configs
    roles_required  JSONB,   -- list of role names
    actions         JSONB,   -- list of action handler configs
    sla_hours       INT      -- NULL = no SLA
)

-- SCD Type 2: every workflow config change tracked
workflow_definition_history (
    id              UUID PK,
    definition_id   UUID FK,
    states_snapshot JSONB,
    transitions_snapshot JSONB,
    version         INT,
    changed_by      UUID FK actors,
    changed_at      TIMESTAMPTZ,
    change_reason   TEXT
)

-- Live instance per record
workflow_instances (
    id              UUID PK,
    definition_id   UUID FK,
    record_id       UUID,
    entity_name     TEXT,
    current_state_id UUID FK workflow_states,
    context         JSONB,
    created_at      TIMESTAMPTZ
)

-- Append-only: immutable transition log
workflow_events (
    id              UUID PK DEFAULT gen_random_uuid(),
    instance_id     UUID FK workflow_instances,
    idempotency_key TEXT UNIQUE,        -- prevents duplicate transitions
    from_state      TEXT,
    to_state        TEXT,
    transition_name TEXT,
    actor_id        UUID FK actors,
    payload         JSONB,
    occurred_at     TIMESTAMPTZ DEFAULT now()
)

-- DB-enforced immutability
CREATE RULE no_update_wf_events AS ON UPDATE TO workflow_events DO INSTEAD NOTHING;
CREATE RULE no_delete_wf_events AS ON DELETE TO workflow_events DO INSTEAD NOTHING;
```

#### Validator Primitives (config-driven, not hardcoded)

Each transition's `validator_rules` is a list of these primitives:

```
[
  { "type": "requires_field", "field": "resume_url" },
  { "type": "min_value", "field": "years_experience", "min": 3 },
  { "type": "multi_approver", "min_count": 2, "distinct": true },
  { "type": "role_check", "roles": ["hiring_manager"] },
  { "type": "expiry_check", "field": "offer_expiry_date" },
  { "type": "lookup_approved", "entity": "vendor", "field": "vendor_id", "status": "itar_approved" }
]
```

The validator registry maps `type` string → evaluator function. Adding a new primitive = adding one evaluator + referencing it in config.

#### Action Handlers (config-driven)

Each transition's `actions` list:

```
[
  { "type": "send_notification", "template": "offer_sent", "to_roles": ["candidate"] },
  { "type": "update_field", "field": "status", "value": "offer_extended" },
  { "type": "create_audit_log", "event_type": "offer_sent" },
  { "type": "block_transition", "condition": "field:background_check_status != cleared" },
  { "type": "trigger_workflow", "workflow": "background_check", "entity": "candidate" }
]
```

#### Functions

`**transition(instance_id: UUID, transition_name: str, actor: Actor, payload: dict, idempotency_key: str) → TransitionResult**`

* Input: instance_id, transition name, actor, payload dict, idempotency_key
* Output: TransitionResult {ok: bool, new_state: str, errors: List\[str\]}
* Process:
  1. Check `workflow_events` for idempotency_key — if exists, return original result (safe replay)
  2. Load instance + definition from DB
  3. Find matching transition for current_state + transition_name
  4. Call `permission_engine.evaluate(actor, 'transition', ...)` → deny if DENY
  5. Run each validator primitive in `validator_rules`
  6. If all pass: update `workflow_instances.current_state_id`
  7. Append to `workflow_events` with idempotency_key (immutable)
  8. Execute action handlers sequentially
  9. Publish `workflow.transitioned` event to RabbitMQ
* Constraint: atomic — DB transaction wraps steps 6–8

`**get_available_transitions(instance_id: UUID, actor: Actor) → List\[Transition\]**`

* Input: instance_id, actor
* Output: list of transitions valid from current state that actor's roles permit
* Used by: Page Orchestrator to render action buttons

`**register_workflow_change(definition_id, changed_by, new_states, new_transitions, reason) → int**`

* Input: definition_id, actor, updated states + transitions, reason
* Output: new version number
* Constraint: writes SCD Type 2 snapshot to `workflow_definition_history`; old instances continue on old version until explicitly migrated

---

### 6.5 Audit Engine

#### Purpose

Append-only, immutable log of every significant event across all engines. Single source of truth for compliance and traceability.

#### DB Schema

```
audit_log (
    id          UUID PK DEFAULT gen_random_uuid(),
    entity_name TEXT NOT NULL,
    entity_id   UUID,
    actor_id    UUID,
    event_type  TEXT,          -- 'stage_transition', 'field_update', 'config_change', etc.
    old_value   JSONB,
    new_value   JSONB,
    metadata    JSONB,         -- arbitrary context (IP, session, etc.)
    occurred_at TIMESTAMPTZ DEFAULT now()
)

CREATE RULE no_update_audit AS ON UPDATE TO audit_log DO INSTEAD NOTHING;
CREATE RULE no_delete_audit AS ON DELETE TO audit_log DO INSTEAD NOTHING;
```

#### Event Types

|event_type|Triggered by|
|---|---|
|`stage_transition`|Workflow Engine on any transition|
|`field_update`|Form Engine on record save|
|`permission_change`|Permission Engine on role/policy change|
|`workflow_config_change`|Workflow Engine on definition update|
|`schema_change`|Entity Builder on field change|
|`login` / `logout`|Auth middleware|
|`document_upload`|File service on MinIO write|

#### Functions

`**log(entity_name, entity_id, actor_id, event_type, old_value, new_value, metadata) → UUID**`

* Input: all fields above
* Output: audit_log.id
* Constraint: INSERT only. No update/delete at DB level.

`**query(entity_name: str, entity_id: UUID, filters: AuditFilter) → List\[AuditEvent\]**`

* Input: entity_name, entity_id, optional filters {event_type, actor_id, from_date, to_date}
* Output: list of AuditEvent ordered by occurred_at DESC
* Access: PTC, CoS, Founder roles only

---

### 6.6 Notification Engine

#### Purpose

Dispatches notifications when instructed by the Workflow Engine (via `send_notification` action handler) or other triggers (SLA breach, system alerts, scheduled digests). Does not decide when to notify — only how. Runs async via Celery workers consuming from RabbitMQ.

Phase 1 channel: Zoho Email API. Architecture is channel-agnostic — Zoho Cliq, SMS, or webhook channels slot in as additional dispatchers without schema changes.

#### Triggers (all routed through RabbitMQ)

|Trigger Source|Example|
|---|---|
|Workflow Engine action handler|Candidate moved to offer stage|
|SLA breach (systemd + Celery)|Approval pending >48hrs|
|Scheduled digest (systemd)|Weekly pipeline summary|
|System alert (any engine)|MinIO storage threshold, failed job|
|Manual admin trigger|Bulk comms to candidates|

#### DB Schema

```
-- Template registry with SCD Type 2
notification_templates (
    id              UUID PK,
    name            TEXT UNIQUE,        -- e.g. 'offer_sent', 'stage_moved'
    channel         TEXT,               -- 'email', 'cliq', 'sms', 'webhook'
    subject         TEXT,               -- for email channel
    body_text       TEXT,               -- variable substitution: {{candidate_name}}
    version         INT DEFAULT 1,
    is_active       BOOL DEFAULT TRUE,
    created_by      UUID FK actors,
    created_at      TIMESTAMPTZ
)

notification_template_history (        -- SCD Type 2
    id              UUID PK,
    template_id     UUID FK notification_templates,
    snapshot        JSONB,             -- full template at that version
    version         INT,
    changed_by      UUID FK actors,
    changed_at      TIMESTAMPTZ,
    change_reason   TEXT
)

-- Delivery log: tracks only delivery outcome, not business context
-- Business context lives in workflow_events + audit_log
notification_log (
    id              UUID PK DEFAULT gen_random_uuid(),
    idempotency_key TEXT UNIQUE,        -- prevents duplicate dispatch
    template_name   TEXT,
    recipient_id    UUID FK actors,
    channel         TEXT,
    status          TEXT,               -- 'sent', 'failed', 'bounced'
    retry_count     INT DEFAULT 0,
    sent_at         TIMESTAMPTZ DEFAULT now()
)
```

#### Functions

`**dispatch(template_name: str, recipients: List\[Actor\], context: dict, idempotency_key: str) → None**`

* Input: template name, recipient list, context dict for variable substitution, idempotency_key
* Output: None (async, fire-and-forget via Celery)
* Process:
  1. Check `notification_log` for idempotency_key — if exists, skip (return early)
  2. Load active template from `notification_templates`
  3. Substitute variables in subject + body
  4. For each recipient: enqueue Celery task per channel
  5. Celery worker dispatches via channel handler (Zoho Email API in Phase 1)
  6. Write delivery outcome to `notification_log`
* Constraint: failures logged with retry_count increment — workflow is never blocked by notification failure
* Future: add channel handler for Cliq/SMS by registering new dispatcher — no schema change needed

---

### 6.7 Page Orchestrator

#### Purpose

Maps `{role} + {entity_state}` → `{page_component}` for the frontend. Config-driven JSON file in Phase 1. No UI builder.

#### Config Shape

```
{
  "module": "ats",
  "routes": [
    {
      "entity": "candidate",
      "state": "applied",
      "role": "hiring_manager",
      "page_component": "CandidateReviewForm",
      "available_actions": ["move_to_screening", "reject"]
    },
    {
      "entity": "candidate",
      "state": "offer",
      "role": "ptc",
      "page_component": "OfferLetterForm",
      "available_actions": ["send_offer", "withdraw_offer"]
    }
  ]
}
```

#### Functions

`**resolve_page(role: str, entity_name: str, entity_state: str) → PageConfig**`

* Input: role, entity name, current state
* Output: PageConfig {component, available_actions}
* Constraint: returns default read-only view if no match found

---

## 8\. Data Flow — End-to-End Example (ATS: Candidate Moves to Offer Stage)

```
1. Actor (PTC) clicks "Move to Offer" in React UI
        ↓
2. Frontend calls POST /workflow/transition
   {instance_id, transition: "move_to_offer", payload: {offer_amount: 80000}}
        ↓
3. Auth middleware validates Zoho SSO JWT → extracts actor + roles
        ↓
4. Permission Engine.evaluate(ptc, 'transition', 'candidate', record_id)
   → ALLOW
        ↓
5. Workflow Engine loads instance → finds transition "move_to_offer"
        ↓
6. Runs validator primitives:
   - requires_field: offer_amount ✅
   - role_check: ptc ✅
        ↓
7. Updates workflow_instances.current_state → 'offer'
8. Appends to workflow_events (immutable)
9. Executes action handlers:
   - create_audit_log → Audit Engine.log(...)
   - send_notification → enqueues Celery task
        ↓
10. Publishes workflow.transitioned to RabbitMQ
        ↓
11. Celery worker consumes → Notification Engine.dispatch(
    template='stage_moved_offer', recipients=[candidate], context={...})
        ↓
12. Zoho Email API sends email → notification_log written
        ↓
13. Frontend polls or receives WebSocket push → re-fetches PageConfig
14. Page Orchestrator resolves: ptc + candidate + offer → OfferLetterForm
```

---

## 9\. Phase 1 Build Scope — ATS Module (This Month)

### What Gets Built

|Engine|Phase 1 Deliverable|
|---|---|
|Entity Builder|Hard-coded DB migrations for: `candidate`, `job_requisition`, `interview`, `feedback`, `offer`, `referee` + custom_fields JSONB|
|Form Engine|JSON form schemas for each entity + field masking per role|
|Permission Engine|RBAC tables + 7 roles + evaluate() + get_field_permissions() + row-level scope|
|Workflow Engine|DB-driven state machine for candidate pipeline + validator primitives: requires_field, role_check, multi_approver|
|Audit Engine|audit_log table + log() + query() API|
|Notification Engine|Template registry + Celery + Zoho Email dispatch for: stage_moved, offer_sent, interview_scheduled|
|Page Orchestrator|JSON route config for ATS + resolve_page()|

### ATS Candidate Pipeline States

```
applied → screening → interview_scheduled → interviewed
→ shortlisted → offer → offer_accepted | offer_rejected
→ hired | withdrawn | rejected
```

### What is Deferred

|Item|Deferred to|
|---|---|
|Entity Builder UI|Post-ATS|
|Form Builder drag-drop UI|Post-ATS|
|Workflow node editor UI|Post-ATS|
|ABAC policy engine|Post-Procurement|
|Report Builder|Post-MVP|
|Integration Bus|Post-MVP|
|Visual Page Builder|Post-MVP|

---

## 10\. SCD Type 2 — Change Tracking Standard

All config tables (workflow_definitions, form_definitions, entity_definitions, permissions) follow this pattern:

```
On any config change:
1. Write new row to <table>_history with:
   - full snapshot of old config (JSONB)
   - changed_by (actor_id)
   - changed_at (timestamp)
   - change_reason (text)
   - version (incremented integer)
2. Update live table to new config
```

This answers: *"What was the workflow on date X, who changed it, and why?"*

---

## 11\. Caching Strategy

|Data|Cache Layer|Invalidation Trigger|
|---|---|---|
|RBAC permissions per role|Redis (TTL: 1hr)|On permission change event|
|Entity schema (latest)|In-process (FastAPI startup)|On schema_changed event → restart or cache bust|
|Workflow definition|Redis (TTL: 24hr)|On workflow_config_change event|
|User session / roles|Redis (TTL: session)|On logout or role change|
|Record data|Redis (TTL: 5min)|On record write|

---

## 12\. File Storage (MinIO)

|Use Case|Bucket|Access|
|---|---|---|
|Candidate resumes|`ats-documents`|PTC, HM, CoS, Founder|
|Offer letters|`ats-offers`|PTC, CoS, Founder only|
|Interview feedback attachments|`ats-feedback`|HM, PTC|

Files stored as objects. References stored in DB as `{bucket, object_key, uploaded_by, uploaded_at}`. Presigned URLs generated at request time — never stored.

---

## 13\. Future Phases

|Phase|Module|Engine Config Added|
|---|---|---|
|Phase 1|ATS (HRMS)|Core engine foundation, candidate pipeline|
|Phase 2|Inventory|Stock entity, stock movement workflows, reorder triggers|
|Phase 3|Data & Document Control|Versioned document workflows, digital signing, revision states|
|Phase 4|Sourcing|Vendor onboarding workflows, ITAR compliance validators|
|Phase 5|Requisition & Procurement|PR → PO workflows, multi-approver, budget validators|

**The engines built in Phase 1 are not rebuilt for subsequent phases. New modules = new config rows in the same DB tables. Same engines.**

GUI additions (node editor, form builder UI, entity builder UI) slot in as frontend layers writing to the same DB schema — no backend engine changes required.