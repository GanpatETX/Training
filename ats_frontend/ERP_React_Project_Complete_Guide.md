# 🏢 The Guild ATS — ERP React Project: Complete Industry-Level Guide

> **Audience:** Complete beginners to React. This guide walks you from zero to a full production-grade ERP application.

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites — What You Need Before Starting](#1-prerequisites)
2. [Creating the React Project](#2-creating-the-react-project)
3. [Industry-Standard Folder Structure](#3-folder-structure)
4. [Installing Dependencies](#4-installing-dependencies)
5. [Environment & Configuration Files](#5-configuration-files)
6. [CSS Theme & Global Styles](#6-css-theme)
7. [Types & Interfaces](#7-types)
8. [API Layer (Services)](#8-api-layer)
9. [Custom Hooks](#9-custom-hooks)
10. [Context (Global State)](#10-context)
11. [Components — UI Base](#11-ui-components)
12. [Components — Feature Modules](#12-feature-components)
13. [Pages / Views](#13-pages)
14. [Routing Setup](#14-routing)
15. [Main App Entry](#15-main-app)
16. [Running the Project](#16-running)

---

## 1. Prerequisites

You need these installed on your computer **before** you start.

### Step 1 — Install Node.js

Node.js lets you run JavaScript on your computer (not just in a browser).

1. Go to: https://nodejs.org
2. Download the **LTS** version (the green button)
3. Install it by following the installer
4. Verify by opening your **Terminal** (Mac) or **Command Prompt** (Windows) and typing:

```bash
node --version
# Should print something like: v20.11.0

npm --version
# Should print something like: 10.2.4
```

### Step 2 — Install a Code Editor

Download **VS Code** (free): https://code.visualstudio.com

Recommended VS Code extensions:
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **Auto Rename Tag**

---

## 2. Creating the React Project

Open your Terminal / Command Prompt and run these commands one by one:

```bash
# Step 1: Create a new React + Vite project
npm create vite@latest guild-ats-erp -- --template react

# Step 2: Go into your new project folder
cd guild-ats-erp

# Step 3: Open the project in VS Code
code .
```

> **What is Vite?** Vite is a tool that helps you build React apps very fast. It's the modern standard used by companies in 2024–2025.

---

## 3. Industry-Standard Folder Structure

After creating the project, delete the default `src` folder contents and create the following structure. This is the structure used by large IT companies (Infosys, TCS, Wipro, product startups, etc.).

```
guild-ats-erp/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                        ← All API calls live here
│   │   ├── apiClient.js            ← Base axios/fetch configuration
│   │   ├── candidateApi.js         ← Candidate-related API calls
│   │   ├── jobApi.js               ← Job-related API calls
│   │   └── departmentApi.js        ← Department API calls
│   │
│   ├── assets/                     ← Images, icons, fonts
│   │   ├── images/
│   │   │   └── logo.png
│   │   └── fonts/
│   │
│   ├── components/                 ← Reusable UI components
│   │   ├── ui/                     ← Very basic building blocks (buttons, inputs, etc.)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   └── layout/                 ← Layout-level components
│   │       ├── Sidebar.jsx
│   │       ├── Header.jsx
│   │       └── AppLayout.jsx
│   │
│   ├── context/                    ← Global state management
│   │   ├── ThemeContext.jsx
│   │   └── CandidateContext.jsx
│   │
│   ├── features/                   ← Feature modules (core business logic)
│   │   ├── candidates/
│   │   │   ├── components/
│   │   │   │   ├── CandidateCard.jsx
│   │   │   │   ├── CandidateDetailModal.jsx
│   │   │   │   └── CandidateListView.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useCandidates.js
│   │   │   └── index.js
│   │   │
│   │   ├── jobs/
│   │   │   ├── components/
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   ├── NewJobModal.jsx
│   │   │   │   └── FilterPanel.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useJobs.js
│   │   │   └── index.js
│   │   │
│   │   └── dashboard/
│   │       ├── components/
│   │       │   └── StatCard.jsx
│   │       └── index.js
│   │
│   ├── hooks/                      ← Shared custom hooks
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   │
│   ├── pages/                      ← One file per "page/screen"
│   │   ├── DashboardPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── CandidatesPage.jsx
│   │   ├── InterviewsPage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── router/                     ← Routing configuration
│   │   └── AppRouter.jsx
│   │
│   ├── styles/                     ← All CSS files
│   │   ├── globals.css             ← Reset + CSS variables
│   │   └── theme.css               ← Color tokens / theme
│   │
│   ├── utils/                      ← Helper/utility functions
│   │   ├── formatters.js           ← Date, number formatters
│   │   └── constants.js            ← App-wide constants
│   │
│   ├── App.jsx                     ← Root component
│   └── main.jsx                    ← Entry point (DO NOT EDIT)
│
├── .env                            ← Environment variables (API URLs)
├── .env.example                    ← Template for .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 4. Installing Dependencies

In your terminal (inside the project folder), run:

```bash
npm install react-router-dom lucide-react
```

> **Note:** Your instruction says "only React, no extra libraries except React itself." So we use:
> - `react-router-dom` — for page navigation (made by the React team, considered core)
> - `lucide-react` — for icons only
> - No Redux, no Axios, no Radix, no Tailwind libraries
> - CSS is written from scratch using CSS variables (matching the Figma design)

---

## 5. Configuration Files

### `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### `.env`

```
VITE_API_BASE_URL=http://localhost:3001/api
```

### `.env.example`

```
VITE_API_BASE_URL=http://your-backend-url/api
```

### `.gitignore` (add these lines)

```
node_modules
dist
.env
```

---

## 6. CSS Theme & Global Styles

### `src/styles/globals.css`

This file resets browser styles and sets up CSS variables for light/dark mode — exactly matching the Figma design colors.

```css
/* ============================================
   RESET & BASE
   ============================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 15px;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  font-family: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

input, textarea, select {
  font-family: inherit;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

/* ============================================
   SCROLLBAR
   ============================================ */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}
```

### `src/styles/theme.css`

```css
/* ============================================
   LIGHT MODE (default)
   ============================================ */
:root {
  --font-size: 15px;
  --font-family-base: 'Space Grotesk', sans-serif;
  --font-family-title: 'Fauna One', serif;

  /* Backgrounds */
  --background: #ebebed;
  --foreground: #1c1c1e;
  --card: #f7f8f9;
  --card-foreground: #1c1c1e;
  --popover: #fafbfc;
  --popover-foreground: #1c1c1e;

  /* Brand colors */
  --primary: #2c2c2e;
  --primary-foreground: #f7f8f9;
  --secondary: #5c5c5e;
  --secondary-foreground: #f7f8f9;

  /* Muted & Accents */
  --muted: #d8d9db;
  --muted-foreground: #66666a;
  --accent: #3c3c3e;
  --accent-foreground: #f7f8f9;

  /* Status colors */
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --soft-green: #dce8da;
  --soft-red: #f4dcdc;
  --soft-yellow: #f5f0dc;
  --soft-blue: #dce4f4;

  /* Borders & Inputs */
  --border: rgba(0, 0, 0, 0.06);
  --input-background: #fafbfc;
  --switch-background: #8c8c8e;
  --ring: #3c3c3e;

  /* Sidebar */
  --sidebar-bg: #0a0a0a;
  --sidebar-foreground: rgba(255,255,255,0.85);
  --sidebar-border: rgba(255,255,255,0.05);
  --sidebar-active-bg: rgba(255,255,255,0.06);
  --sidebar-hover-bg: rgba(255,255,255,0.03);
  --sidebar-muted: rgba(255,255,255,0.45);

  /* Misc */
  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.12);
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============================================
   DARK MODE
   ============================================ */
.dark {
  --background: #0d0d0d;
  --foreground: #ececec;
  --card: #161618;
  --card-foreground: #ececec;
  --popover: #1a1a1c;
  --popover-foreground: #ececec;

  --primary: #ececec;
  --primary-foreground: #1c1c1e;
  --secondary: #3a3a3c;
  --secondary-foreground: #ececec;

  --muted: #2a2a2c;
  --muted-foreground: #8c8c8e;
  --accent: #2a2a2c;
  --accent-foreground: #ececec;

  --border: rgba(255, 255, 255, 0.06);
  --input-background: #1e1e20;
  --switch-background: #5c5c5e;
  --ring: #5c5c5e;

  --soft-green: rgba(134, 186, 128, 0.15);
  --soft-red: rgba(220, 80, 80, 0.15);
  --soft-yellow: rgba(220, 190, 80, 0.15);
  --soft-blue: rgba(80, 140, 220, 0.15);

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.5);
}
```

---

## 7. Types & Interfaces

> In pure React (JavaScript), we use JSDoc comments to document types instead of TypeScript.

### `src/utils/constants.js`

```javascript
// ============================================
// APPLICATION-WIDE CONSTANTS
// ============================================

export const APP_NAME = 'The Guild ATS';

export const CANDIDATE_STATUSES = [
  'Screening',
  'Fitment Evaluation',
  'Technical Interview',
  'PTC Interview',
  "Founder's Interview",
  'Selected',
  'Rejected',
];

export const STATUS_COLORS = {
  'Screening':            'status-screening',
  'Fitment Evaluation':   'status-fitment',
  'Technical Interview':  'status-technical',
  'PTC Interview':        'status-ptc',
  "Founder's Interview":  'status-founders',
  'Selected':             'status-selected',
  'Rejected':             'status-rejected',
};

export const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',  icon: 'Home' },
  { id: 'jobs',        label: 'Jobs',       icon: 'Briefcase' },
  { id: 'candidates',  label: 'Candidates', icon: 'Users' },
  { id: 'interviews',  label: 'Interviews', icon: 'CalendarDays' },
  { id: 'inbox',       label: 'Inbox',      icon: 'Inbox' },
  { id: 'analytics',   label: 'Analytics',  icon: 'BarChart3' },
  { id: 'settings',    label: 'Settings',   icon: 'Settings' },
];
```

### `src/utils/formatters.js`

```javascript
// ============================================
// UTILITY / HELPER FUNCTIONS
// ============================================

/**
 * Format a date string to readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} formatted date like "Apr 20"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get initials from a full name
 * @param {string} name
 * @returns {string} e.g. "Kiran Mehta" → "KM"
 */
export function getInitials(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate a string to N characters
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 40) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}

/**
 * Generate a score color class based on value
 * @param {number} score
 * @returns {string} CSS class name
 */
export function getScoreColor(score) {
  if (score >= 90) return 'score-excellent';
  if (score >= 75) return 'score-good';
  if (score >= 60) return 'score-average';
  return 'score-poor';
}
```

---

## 8. API Layer (Services)

The API layer is the part that communicates with the backend server. We use the built-in `fetch` function — no extra libraries needed.

### `src/api/apiClient.js`

```javascript
// ============================================
// BASE API CLIENT
// All API calls go through this file.
// ============================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Central fetch wrapper with error handling
 * @param {string} endpoint - e.g. "/candidates"
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>}
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    // If 204 No Content, return null
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// Convenience methods
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body) => apiRequest(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};
```

### `src/api/candidateApi.js`

```javascript
import { api } from './apiClient';

// ============================================
// MOCK DATA — Replace with real API calls
// when backend is ready
// ============================================

const MOCK_CANDIDATES = [
  {
    id: 'TG-2402', name: 'Kiran Mehta', role: 'Software Engineer',
    skills: ['React', 'TypeScript'], location: 'Bangalore, IN',
    appliedDate: '2024-04-20', score: 87, status: 'Screening',
    email: 'kiran.mehta@example.com', phone: '+91 98765 43210',
    experience: '4 years', education: 'B.Tech Computer Science',
    avatar: null,
  },
  {
    id: 'TG-2407', name: 'Yuki Tanaka', role: 'Product Manager',
    skills: ['Strategy', 'Roadmap'], location: 'Tokyo, JP',
    appliedDate: '2024-05-03', score: 79, status: 'Screening',
    email: 'yuki.tanaka@example.com', phone: '+81 90 1234 5678',
    experience: '6 years', education: 'MBA',
    avatar: null,
  },
  {
    id: 'TG-2408', name: 'Sofia Reyes', role: 'UX Researcher',
    skills: ['Research', 'Usability'], location: 'Madrid, ES',
    appliedDate: '2024-04-28', score: 84, status: 'Screening',
    email: 'sofia.reyes@example.com', phone: '+34 612 345 678',
    experience: '3 years', education: 'M.Sc HCI',
    avatar: null,
  },
  {
    id: 'TG-2404', name: 'Lucas Ferreira', role: 'Backend Engineer',
    skills: ['Go', 'AWS'], location: 'São Paulo, BR',
    appliedDate: '2024-05-01', score: 76, status: 'Fitment Evaluation',
    email: 'lucas.ferreira@example.com', phone: '+55 11 91234 5678',
    experience: '5 years', education: 'B.Tech Systems',
    avatar: null,
  },
  {
    id: 'TG-2410', name: 'Chen Wei', role: 'Data Scientist',
    skills: ['Python', 'ML'], location: 'Shanghai, CN',
    appliedDate: '2024-04-25', score: 91, status: 'Fitment Evaluation',
    email: 'chen.wei@example.com', phone: '+86 138 0013 8000',
    experience: '5 years', education: 'M.Sc Data Science',
    avatar: null,
  },
  {
    id: 'TG-2401', name: 'Amara Diallo', role: 'UI/UX Designer',
    skills: ['UI/UX', 'Figma'], location: 'Lagos, NG',
    appliedDate: '2024-04-29', score: 92, status: 'Technical Interview',
    email: 'amara.diallo@example.com', phone: '+234 812 345 6789',
    experience: '4 years', education: 'B.Des Visual Communication',
    avatar: null,
  },
  {
    id: 'TG-2416', name: 'Priya Shah', role: 'Security Engineer',
    skills: ['Pen Testing', 'SIEM'], location: 'Mumbai, IN',
    appliedDate: '2024-04-26', score: 91, status: 'Technical Interview',
    email: 'priya.shah@example.com', phone: '+91 98456 78901',
    experience: '6 years', education: 'B.Tech Computer Science',
    avatar: null,
  },
  {
    id: 'TG-2406', name: 'Emeka Obi', role: 'Product Designer',
    skills: ['UI/UX', 'UIPM'], location: 'Abuja, NG',
    appliedDate: '2024-05-02', score: 81, status: 'Technical Interview',
    email: 'emeka.obi@example.com', phone: '+234 809 876 5432',
    experience: '3 years', education: 'B.A Design',
    avatar: null,
  },
  {
    id: 'TG-2411', name: 'Nina Patel', role: 'Frontend Engineer',
    skills: ['Vue', 'CSS'], location: 'Delhi, IN',
    appliedDate: '2024-04-24', score: 85, status: 'PTC Interview',
    email: 'nina.patel@example.com', phone: '+91 97654 32109',
    experience: '3 years', education: 'B.Tech IT',
    avatar: null,
  },
  {
    id: 'TG-2412', name: 'James Chen', role: 'DevOps Engineer',
    skills: ['Docker', 'K8s'], location: 'Singapore, SG',
    appliedDate: '2024-04-30', score: 89, status: 'PTC Interview',
    email: 'james.chen@example.com', phone: '+65 9123 4567',
    experience: '7 years', education: 'B.Eng Computer Engineering',
    avatar: null,
  },
  {
    id: 'TG-2413', name: 'Sarah Williams', role: 'Product Manager',
    skills: ['Agile', 'Strategy'], location: 'Toronto, CA',
    appliedDate: '2024-05-01', score: 90, status: "Founder's Interview",
    email: 'sarah.williams@example.com', phone: '+1 416 555 0199',
    experience: '8 years', education: 'MBA',
    avatar: null,
  },
  {
    id: 'TG-2450', name: 'Marcus Webb', role: 'Staff Engineer',
    skills: ['Swift', 'Xcode'], location: 'London, UK',
    appliedDate: '2024-04-27', score: 88, status: 'Selected',
    email: 'marcus.webb@example.com', phone: '+44 7700 900123',
    experience: '10 years', education: 'M.Sc Software Engineering',
    avatar: null,
  },
  {
    id: 'TG-2453', name: 'Zara Osei', role: 'Engineering Manager',
    skills: ['Figma', 'React'], location: 'Accra, GH',
    appliedDate: '2024-05-05', score: 93, status: 'Selected',
    email: 'zara.osei@example.com', phone: '+233 24 123 4567',
    experience: '9 years', education: 'B.Sc CS + MBA',
    avatar: null,
  },
  {
    id: 'TG-2405', name: 'Nadia Kowalski', role: 'Engineering Manager',
    skills: ['Leadership', 'Agile'], location: 'Warsaw, PL',
    appliedDate: '2024-04-22', score: 72, status: 'Rejected',
    email: 'nadia.kowalski@example.com', phone: '+48 601 234 567',
    experience: '7 years', education: 'M.Sc Computer Science',
    avatar: null,
  },
];

// Simulates a network delay (like a real API)
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// CANDIDATE API FUNCTIONS
// ============================================

/**
 * Fetch all candidates (with optional search/filter)
 * @param {{ search?: string, status?: string }} params
 * @returns {Promise<Array>}
 */
export async function getCandidates(params = {}) {
  await delay();
  // TODO: Replace with → return api.get(`/candidates?search=${params.search}&status=${params.status}`);

  let results = [...MOCK_CANDIDATES];
  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q)
    );
  }
  if (params.status && params.status !== 'All') {
    results = results.filter(c => c.status === params.status);
  }
  return results;
}

/**
 * Fetch a single candidate by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getCandidateById(id) {
  await delay(300);
  // TODO: Replace with → return api.get(`/candidates/${id}`);
  const candidate = MOCK_CANDIDATES.find(c => c.id === id);
  if (!candidate) throw new Error('Candidate not found');
  return candidate;
}

/**
 * Update candidate status
 * @param {string} id
 * @param {string} newStatus
 * @returns {Promise<Object>}
 */
export async function updateCandidateStatus(id, newStatus) {
  await delay(400);
  // TODO: Replace with → return api.patch(`/candidates/${id}`, { status: newStatus });
  const candidate = MOCK_CANDIDATES.find(c => c.id === id);
  if (!candidate) throw new Error('Candidate not found');
  candidate.status = newStatus;
  return { ...candidate };
}

/**
 * Create a new candidate
 * @param {Object} candidateData
 * @returns {Promise<Object>}
 */
export async function createCandidate(candidateData) {
  await delay(500);
  // TODO: Replace with → return api.post('/candidates', candidateData);
  const newCandidate = {
    id: `TG-${Math.floor(2500 + Math.random() * 500)}`,
    ...candidateData,
    appliedDate: new Date().toISOString().split('T')[0],
    score: Math.floor(60 + Math.random() * 40),
    status: 'Screening',
  };
  MOCK_CANDIDATES.push(newCandidate);
  return newCandidate;
}
```

### `src/api/jobApi.js`

```javascript
import { api } from './apiClient';

const MOCK_JOBS = [
  { id: 'JOB-001', title: 'Senior React Developer', department: 'Engineering', location: 'Bangalore, IN', type: 'Full-time', openings: 3, applicants: 24, status: 'Active', postedDate: '2024-04-15' },
  { id: 'JOB-002', title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', openings: 1, applicants: 18, status: 'Active', postedDate: '2024-04-20' },
  { id: 'JOB-003', title: 'UI/UX Designer', department: 'Design', location: 'Mumbai, IN', type: 'Contract', openings: 2, applicants: 31, status: 'Active', postedDate: '2024-05-01' },
  { id: 'JOB-004', title: 'DevOps Engineer', department: 'Infrastructure', location: 'Hybrid', type: 'Full-time', openings: 2, applicants: 12, status: 'Active', postedDate: '2024-05-05' },
  { id: 'JOB-005', title: 'Data Scientist', department: 'Analytics', location: 'Hyderabad, IN', type: 'Full-time', openings: 1, applicants: 22, status: 'Closed', postedDate: '2024-03-10' },
];

const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

export async function getJobs() {
  await delay();
  // TODO: Replace with → return api.get('/jobs');
  return [...MOCK_JOBS];
}

export async function createJob(jobData) {
  await delay(500);
  // TODO: Replace with → return api.post('/jobs', jobData);
  const newJob = {
    id: `JOB-${String(MOCK_JOBS.length + 1).padStart(3, '0')}`,
    ...jobData,
    applicants: 0,
    status: 'Active',
    postedDate: new Date().toISOString().split('T')[0],
  };
  MOCK_JOBS.push(newJob);
  return newJob;
}
```

### `src/api/departmentApi.js`

```javascript
const MOCK_DEPARTMENTS = [
  { id: 'ENG',   name: 'Engineering',     code: 'ENG',   headCount: 45, openRoles: 5 },
  { id: 'PRD',   name: 'Product',         code: 'PRD',   headCount: 12, openRoles: 2 },
  { id: 'DSN',   name: 'Design',          code: 'DSN',   headCount: 8,  openRoles: 3 },
  { id: 'MKT',   name: 'Marketing',       code: 'MKT',   headCount: 15, openRoles: 1 },
  { id: 'SAL',   name: 'Sales',           code: 'SAL',   headCount: 20, openRoles: 4 },
  { id: 'HR',    name: 'Human Resources', code: 'HR',    headCount: 6,  openRoles: 0 },
  { id: 'FIN',   name: 'Finance',         code: 'FIN',   headCount: 10, openRoles: 1 },
  { id: 'INF',   name: 'Infrastructure',  code: 'INF',   headCount: 18, openRoles: 3 },
  { id: 'ANA',   name: 'Analytics',       code: 'ANA',   headCount: 9,  openRoles: 2 },
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function getDepartments() {
  await delay();
  return [...MOCK_DEPARTMENTS];
}
```

---

## 9. Custom Hooks

Hooks are special functions in React that let you reuse logic.

### `src/hooks/useDebounce.js`

```javascript
import { useState, useEffect } from 'react';

/**
 * Delays updating a value until the user stops typing.
 * Used for search inputs so we don't call the API on every keystroke.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Milliseconds to wait (default 400)
 * @returns {any} debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchQuery, 400);
 * // Only fires API call 400ms after user stops typing
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### `src/hooks/useLocalStorage.js`

```javascript
import { useState } from 'react';

/**
 * Like useState but persists the value in localStorage.
 * Used for remembering theme preference, sidebar state, etc.
 *
 * @param {string} key - localStorage key name
 * @param {any} initialValue - default value if nothing stored yet
 * @returns {[any, Function]} [storedValue, setValue]
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('useLocalStorage read error:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('useLocalStorage write error:', error);
    }
  };

  return [storedValue, setValue];
}
```

### `src/features/candidates/hooks/useCandidates.js`

```javascript
import { useState, useEffect, useCallback } from 'react';
import { getCandidates, updateCandidateStatus } from '../../../api/candidateApi';
import { useDebounce } from '../../../hooks/useDebounce';

/**
 * Central hook for all candidate-related state and operations.
 * Used by CandidatesPage and JobsPage.
 */
export function useCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');

  const debouncedSearch = useDebounce(searchQuery, 400);

  // Fetch candidates whenever search or status filter changes
  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCandidates({
        search: debouncedSearch,
        status: activeStatus,
      });
      setCandidates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeStatus]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // Move a candidate from one status column to another (Kanban drag)
  const moveCandidate = useCallback(async (candidateId, newStatus) => {
    // Optimistic update: update UI immediately, then confirm with API
    setCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
    );

    try {
      await updateCandidateStatus(candidateId, newStatus);
    } catch (err) {
      // If API fails, refetch to restore correct state
      console.error('Status update failed, refreshing:', err);
      fetchCandidates();
    }
  }, [fetchCandidates]);

  return {
    candidates,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeStatus,
    setActiveStatus,
    moveCandidate,
    refetch: fetchCandidates,
  };
}
```

---

## 10. Context (Global State)

Context lets you share state across many components without "prop drilling."

### `src/context/ThemeContext.jsx`

```jsx
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create the context
const ThemeContext = createContext(null);

/**
 * ThemeProvider wraps the entire app and provides theme to all components.
 * Usage: wrap <App /> with <ThemeProvider>
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('ats-theme', 'dark');

  // Apply/remove the "dark" class on <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme anywhere in the app
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return context;
}
```

---

## 11. UI Base Components

### `src/components/ui/Spinner.jsx`

```jsx
import './Spinner.css';

/**
 * Loading spinner
 * @param {{ size?: 'sm' | 'md' | 'lg', color?: string }} props
 */
export function Spinner({ size = 'md' }) {
  return (
    <div className={`spinner spinner--${size}`} aria-label="Loading..." />
  );
}
```

```css
/* src/components/ui/Spinner.css */
.spinner {
  border-radius: 50%;
  border: 2px solid var(--muted);
  border-top-color: var(--primary);
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
.spinner--sm { width: 16px; height: 16px; }
.spinner--md { width: 24px; height: 24px; }
.spinner--lg { width: 40px; height: 40px; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### `src/components/ui/Badge.jsx`

```jsx
import './Badge.css';

/**
 * Status badge component
 * @param {{ status: string, children: React.ReactNode }} props
 */
export function Badge({ status, children }) {
  const statusClass = {
    'Screening':           'badge--screening',
    'Fitment Evaluation':  'badge--fitment',
    'Technical Interview': 'badge--technical',
    'PTC Interview':       'badge--ptc',
    "Founder's Interview": 'badge--founders',
    'Selected':            'badge--selected',
    'Rejected':            'badge--rejected',
    'Active':              'badge--selected',
    'Closed':              'badge--rejected',
  }[status] || 'badge--default';

  return (
    <span className={`badge ${statusClass}`}>
      {children || status}
    </span>
  );
}
```

```css
/* src/components/ui/Badge.css */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.badge--screening    { background: var(--muted); color: var(--foreground); }
.badge--fitment      { background: var(--soft-blue); color: var(--foreground); }
.badge--technical    { background: var(--soft-yellow); color: var(--foreground); }
.badge--ptc          { background: var(--soft-yellow); color: var(--foreground); opacity: 0.85; }
.badge--founders     { background: var(--soft-blue); color: var(--foreground); }
.badge--selected     { background: var(--soft-green); color: var(--foreground); }
.badge--rejected     { background: var(--soft-red); color: var(--foreground); }
.badge--default      { background: var(--muted); color: var(--muted-foreground); }
```

### `src/components/ui/Modal.jsx`

```jsx
import { useEffect } from 'react';
import './Modal.css';

/**
 * Reusable Modal dialog
 * @param {{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }} props
 */
export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal modal--${size}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

```css
/* src/components/ui/Modal.css */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.15s ease;
}
.modal {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.2s ease;
}
.modal--sm { max-width: 400px; }
.modal--md { max-width: 580px; }
.modal--lg { max-width: 800px; }

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.modal__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--foreground);
}
.modal__close {
  width: 28px; height: 28px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  color: var(--muted-foreground);
  transition: var(--transition);
}
.modal__close:hover {
  background: var(--muted);
  color: var(--foreground);
}
.modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
```

---

## 12. Feature Components

### `src/components/layout/Sidebar.jsx`

```jsx
import { NavLink } from 'react-router-dom';
import {
  Home, Briefcase, Users, CalendarDays,
  Inbox, BarChart3, Settings, ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

const ICON_MAP = { Home, Briefcase, Users, CalendarDays, Inbox, BarChart3, Settings };

const NAV_ITEMS = [
  { path: '/',            label: 'Dashboard',  icon: 'Home' },
  { path: '/jobs',        label: 'Jobs',        icon: 'Briefcase' },
  { path: '/candidates',  label: 'Candidates',  icon: 'Users' },
  { path: '/interviews',  label: 'Interviews',  icon: 'CalendarDays' },
  { path: '/inbox',       label: 'Inbox',       icon: 'Inbox' },
  { path: '/analytics',   label: 'Analytics',   icon: 'BarChart3' },
  { path: '/settings',    label: 'Settings',    icon: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">G</div>
        <div>
          <div className="sidebar__logo-title">The Guild</div>
          <div className="sidebar__logo-subtitle">ATS Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const Icon = ICON_MAP[icon];
          return (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar">RO</div>
        <div className="sidebar__user-info">
          <div className="sidebar__user-name">Rohan Okafor</div>
          <div className="sidebar__user-role">HR Director</div>
        </div>
        <ChevronDown size={14} className="sidebar__chevron" />
      </div>
    </aside>
  );
}
```

```css
/* src/components/layout/Sidebar.css */
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  flex-shrink: 0;
}

/* Logo */
.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.5rem;
  margin-bottom: 2.5rem;
}
.sidebar__logo-icon {
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  color: var(--sidebar-foreground);
  font-weight: 300;
}
.sidebar__logo-title {
  font-size: 15px;
  color: rgba(255,255,255,0.9);
  font-weight: 400;
  letter-spacing: 0.02em;
}
.sidebar__logo-subtitle {
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.04em;
  margin-top: 1px;
}

/* Navigation */
.sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius);
  font-size: 13.5px;
  color: var(--sidebar-muted);
  transition: var(--transition);
  letter-spacing: 0.01em;
}
.sidebar__nav-item:hover {
  background: var(--sidebar-hover-bg);
  color: rgba(255,255,255,0.85);
}
.sidebar__nav-item--active {
  background: var(--sidebar-active-bg);
  color: rgba(255,255,255,0.92);
}

/* Profile */
.sidebar__profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-top: 1px solid var(--sidebar-border);
  margin-top: auto;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
}
.sidebar__profile:hover {
  background: var(--sidebar-hover-bg);
}
.sidebar__avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  font-weight: 500;
  flex-shrink: 0;
}
.sidebar__user-info { flex: 1; min-width: 0; }
.sidebar__user-name {
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar__user-role {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  margin-top: 1px;
}
.sidebar__chevron { color: rgba(255,255,255,0.3); flex-shrink: 0; }
```

### `src/components/layout/Header.jsx`

```jsx
import { Search, Filter, LayoutGrid, List, Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

export function Header({
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
  onNewJob,
  onFilterToggle,
  showFilter,
  statuses,
  statusCounts,
  activeStatus,
  onStatusChange,
  totalCount,
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__top">
        {/* Title */}
        <h1 className="header__title">The Guild ATS</h1>

        {/* Actions */}
        <div className="header__actions">
          {/* Search */}
          <div className="header__search-wrap">
            <Search size={14} className="header__search-icon" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="header__search"
            />
          </div>

          {/* Filter toggle */}
          <button
            className={`header__icon-btn ${showFilter ? 'header__icon-btn--active' : ''}`}
            onClick={onFilterToggle}
            title="Filter"
          >
            <Filter size={15} />
          </button>

          {/* View toggle */}
          <div className="header__view-toggle">
            <button
              className={`header__icon-btn ${view === 'kanban' ? 'header__icon-btn--selected' : ''}`}
              onClick={() => onViewChange('kanban')}
              title="Kanban view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              className={`header__icon-btn ${view === 'list' ? 'header__icon-btn--selected' : ''}`}
              onClick={() => onViewChange('list')}
              title="List view"
            >
              <List size={15} />
            </button>
          </div>

          {/* Theme toggle */}
          <button className="header__icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* New Job button */}
          <button className="header__new-btn" onClick={onNewJob}>
            <Plus size={15} />
            New Job
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="header__tabs">
        <button
          className={`header__tab ${activeStatus === 'All' ? 'header__tab--active' : ''}`}
          onClick={() => onStatusChange('All')}
        >
          All • {totalCount}
        </button>
        {statuses.map(status => (
          <button
            key={status}
            className={`header__tab ${activeStatus === status ? 'header__tab--active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {status} • {statusCounts[status] || 0}
          </button>
        ))}
      </div>
    </header>
  );
}
```

```css
/* src/components/layout/Header.css */
.header {
  border-bottom: 1px solid var(--border);
  background: rgba(var(--card), 0.6);
  backdrop-filter: blur(12px);
  padding: 0.75rem 1.25rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
}
.header__title {
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--foreground);
  white-space: nowrap;
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Search */
.header__search-wrap {
  position: relative;
}
.header__search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted-foreground);
  pointer-events: none;
}
.header__search {
  padding: 0.45rem 0.75rem 0.45rem 2rem;
  font-size: 13px;
  background: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--foreground);
  width: 260px;
  outline: none;
  transition: var(--transition);
}
.header__search:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(128,128,128,0.12);
}

/* Icon buttons */
.header__icon-btn {
  width: 34px; height: 34px;
  border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  color: var(--muted-foreground);
  transition: var(--transition);
}
.header__icon-btn:hover {
  background: var(--muted);
  color: var(--foreground);
}
.header__icon-btn--active,
.header__icon-btn--selected {
  background: var(--card);
  color: var(--foreground);
  box-shadow: var(--shadow-sm);
}
.header__view-toggle {
  display: flex;
  gap: 2px;
  background: var(--muted);
  border-radius: var(--radius);
  padding: 3px;
}

/* New Job button */
.header__new-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 1rem;
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}
.header__new-btn:hover {
  opacity: 0.9;
  box-shadow: var(--shadow-md);
}

/* Status tabs */
.header__tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.header__tab {
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius);
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--muted-foreground);
  transition: var(--transition);
}
.header__tab:hover {
  background: rgba(128,128,128,0.08);
  color: var(--foreground);
}
.header__tab--active {
  background: rgba(128,128,128,0.12);
  color: var(--foreground);
  box-shadow: var(--shadow-sm);
}
```

### `src/components/layout/AppLayout.jsx`

```jsx
import { Sidebar } from './Sidebar';
import './AppLayout.css';

/**
 * Root layout wrapper that includes the sidebar + main content area.
 * Wrap all page content inside this.
 */
export function AppLayout({ children }) {
  return (
    <div className="app-layout">
      {/* Grid background decoration (from Figma) */}
      <div className="app-layout__bg" aria-hidden="true" />

      <Sidebar />

      <div className="app-layout__main">
        {children}
      </div>
    </div>
  );
}
```

```css
/* src/components/layout/AppLayout.css */
.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Engineering drawing grid background from Figma */
.app-layout__bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E");
  background-repeat: repeat;
}
.dark .app-layout__bg {
  opacity: 0.015;
}

.app-layout__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
```

### `src/features/candidates/components/CandidateCard.jsx`

```jsx
import { MapPin, Calendar } from 'lucide-react';
import { formatDate, getInitials, getScoreColor } from '../../../utils/formatters';
import './CandidateCard.css';

/**
 * Individual candidate card used in Kanban columns.
 * @param {{ candidate: Object, onClick: Function, onDragStart: Function, isDragging: boolean }} props
 */
export function CandidateCard({ candidate, onClick, onDragStart, isDragging }) {
  return (
    <div
      className={`candidate-card ${isDragging ? 'candidate-card--dragging' : ''}`}
      onClick={onClick}
      draggable
      onDragStart={() => onDragStart(candidate)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="candidate-card__top">
        <div className="candidate-card__info">
          <span className="candidate-card__id">{candidate.id}</span>
          <h3 className="candidate-card__name">{candidate.name}</h3>
          <p className="candidate-card__role">{candidate.role}</p>
        </div>
        <div className={`candidate-card__score ${getScoreColor(candidate.score)}`}>
          {candidate.score}
        </div>
      </div>

      <div className="candidate-card__skills">
        {candidate.skills.map(skill => (
          <span key={skill} className="candidate-card__skill">{skill}</span>
        ))}
      </div>

      <div className="candidate-card__footer">
        <span className="candidate-card__meta">
          <MapPin size={11} />
          {candidate.location}
        </span>
        <span className="candidate-card__meta">
          <Calendar size={11} />
          {formatDate(candidate.appliedDate)}
        </span>
      </div>
    </div>
  );
}
```

```css
/* src/features/candidates/components/CandidateCard.css */
.candidate-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.25s ease,
              border-color 0.2s ease;
  box-shadow: var(--shadow-sm);
  will-change: transform;
  outline: none;
}
.candidate-card:hover {
  transform: translateY(-2px) scale(1.008);
  box-shadow: var(--shadow-md);
  border-color: rgba(128,128,128,0.15);
}
.candidate-card:focus-visible {
  box-shadow: 0 0 0 2px var(--ring);
}
.candidate-card--dragging {
  opacity: 0.5;
  transform: rotate(2deg);
  box-shadow: var(--shadow-lg);
}

.candidate-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.candidate-card__info { flex: 1; }
.candidate-card__id {
  font-size: 10px;
  color: var(--muted-foreground);
  font-weight: 500;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 3px;
}
.candidate-card__name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 2px;
}
.candidate-card__role {
  font-size: 12px;
  color: var(--muted-foreground);
}
.candidate-card__score {
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-top: 2px;
}
.score-excellent { color: #22c55e; }
.score-good      { color: #84cc16; }
.score-average   { color: #f59e0b; }
.score-poor      { color: #ef4444; }

.candidate-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 0.75rem;
}
.candidate-card__skill {
  padding: 3px 8px;
  background: rgba(128,128,128,0.1);
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  color: var(--muted-foreground);
}

.candidate-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.candidate-card__meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--muted-foreground);
}
```

### `src/features/jobs/components/KanbanBoard.jsx`

This uses HTML5 native drag-and-drop — no library needed.

```jsx
import { useState, useRef } from 'react';
import { CandidateCard } from '../../candidates/components/CandidateCard';
import { CandidateDetailModal } from '../../candidates/components/CandidateDetailModal';
import { CANDIDATE_STATUSES } from '../../../utils/constants';
import './KanbanBoard.css';

/**
 * Kanban board with draggable candidate cards.
 * @param {{ candidates: Array, onStatusChange: Function }} props
 */
export function KanbanBoard({ candidates, onStatusChange }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const draggingRef = useRef(null);

  const handleDragStart = (candidate) => {
    draggingRef.current = candidate;
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    setDragOver(status);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggingRef.current && draggingRef.current.status !== status) {
      onStatusChange(draggingRef.current.id, status);
    }
    draggingRef.current = null;
    setDragOver(null);
  };

  const handleDragLeave = () => setDragOver(null);

  return (
    <>
      <div className="kanban-board">
        {CANDIDATE_STATUSES.map(status => {
          const columnCandidates = candidates.filter(c => c.status === status);
          return (
            <div
              key={status}
              className={`kanban-column ${dragOver === status ? 'kanban-column--over' : ''}`}
              onDragOver={e => handleDragOver(e, status)}
              onDrop={e => handleDrop(e, status)}
              onDragLeave={handleDragLeave}
            >
              <div className="kanban-column__header">
                <span className="kanban-column__title">{status}</span>
                <span className="kanban-column__count">{columnCandidates.length}</span>
              </div>

              <div className="kanban-column__cards">
                {columnCandidates.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => setSelectedCandidate(candidate)}
                    onDragStart={handleDragStart}
                    isDragging={false}
                  />
                ))}
                {columnCandidates.length === 0 && (
                  <div className="kanban-column__empty">Drop here</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onStatusChange={onStatusChange}
      />
    </>
  );
}
```

```css
/* src/features/jobs/components/KanbanBoard.css */
.kanban-board {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 1.25rem;
  height: calc(100vh - 140px);
  align-items: flex-start;
}

.kanban-column {
  flex: 1;
  min-width: 260px;
  max-width: 300px;
  background: rgba(128,128,128,0.05);
  border-radius: var(--radius-lg);
  padding: 1.1rem;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 160px);
}
.kanban-column--over {
  background: rgba(128,128,128,0.12);
  box-shadow: 0 0 0 2px rgba(128,128,128,0.3);
}

.kanban-column__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.kanban-column__title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
}
.kanban-column__count {
  padding: 2px 8px;
  background: rgba(128,128,128,0.1);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted-foreground);
}

.kanban-column__cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  flex: 1;
}
.kanban-column__empty {
  text-align: center;
  font-size: 12px;
  color: var(--muted-foreground);
  padding: 2rem 1rem;
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  opacity: 0.6;
}
```

### `src/features/candidates/components/CandidateDetailModal.jsx`

```jsx
import { Modal } from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import { CANDIDATE_STATUSES } from '../../../utils/constants';
import { formatDate, getInitials } from '../../../utils/formatters';
import { MapPin, Calendar, Mail, Phone, Briefcase, GraduationCap } from 'lucide-react';
import './CandidateDetailModal.css';

export function CandidateDetailModal({ candidate, onClose, onStatusChange }) {
  if (!candidate) return null;

  return (
    <Modal isOpen={!!candidate} onClose={onClose} title="Candidate Profile" size="lg">
      <div className="candidate-detail">
        {/* Header */}
        <div className="candidate-detail__header">
          <div className="candidate-detail__avatar">
            {getInitials(candidate.name)}
          </div>
          <div>
            <h2 className="candidate-detail__name">{candidate.name}</h2>
            <p className="candidate-detail__role">{candidate.role}</p>
            <p className="candidate-detail__id">{candidate.id}</p>
          </div>
          <div className="candidate-detail__score">
            <span className="candidate-detail__score-value">{candidate.score}</span>
            <span className="candidate-detail__score-label">Score</span>
          </div>
        </div>

        {/* Info grid */}
        <div className="candidate-detail__grid">
          {candidate.email && (
            <div className="candidate-detail__info-item">
              <Mail size={14} />
              <span>{candidate.email}</span>
            </div>
          )}
          {candidate.phone && (
            <div className="candidate-detail__info-item">
              <Phone size={14} />
              <span>{candidate.phone}</span>
            </div>
          )}
          <div className="candidate-detail__info-item">
            <MapPin size={14} />
            <span>{candidate.location}</span>
          </div>
          <div className="candidate-detail__info-item">
            <Calendar size={14} />
            <span>Applied {formatDate(candidate.appliedDate)}</span>
          </div>
          {candidate.experience && (
            <div className="candidate-detail__info-item">
              <Briefcase size={14} />
              <span>{candidate.experience}</span>
            </div>
          )}
          {candidate.education && (
            <div className="candidate-detail__info-item">
              <GraduationCap size={14} />
              <span>{candidate.education}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="candidate-detail__section">
          <h4 className="candidate-detail__section-title">Skills</h4>
          <div className="candidate-detail__skills">
            {candidate.skills.map(skill => (
              <span key={skill} className="candidate-detail__skill">{skill}</span>
            ))}
          </div>
        </div>

        {/* Status changer */}
        <div className="candidate-detail__section">
          <h4 className="candidate-detail__section-title">Pipeline Stage</h4>
          <div className="candidate-detail__statuses">
            {CANDIDATE_STATUSES.map(status => (
              <button
                key={status}
                className={`candidate-detail__status-btn ${candidate.status === status ? 'candidate-detail__status-btn--active' : ''}`}
                onClick={() => {
                  onStatusChange(candidate.id, status);
                  onClose();
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
```

```css
/* src/features/candidates/components/CandidateDetailModal.css */
.candidate-detail__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.candidate-detail__avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--muted);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--muted-foreground);
  flex-shrink: 0;
}
.candidate-detail__name { font-size: 1.1rem; font-weight: 600; margin-bottom: 3px; }
.candidate-detail__role { font-size: 13px; color: var(--muted-foreground); margin-bottom: 2px; }
.candidate-detail__id { font-size: 11px; color: var(--muted-foreground); font-family: monospace; }
.candidate-detail__score { margin-left: auto; text-align: center; }
.candidate-detail__score-value { display: block; font-size: 2rem; font-weight: 700; line-height: 1; }
.candidate-detail__score-label { font-size: 11px; color: var(--muted-foreground); letter-spacing: 0.04em; }

.candidate-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}
.candidate-detail__info-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--muted-foreground);
}
.candidate-detail__info-item svg { flex-shrink: 0; }

.candidate-detail__section { margin-bottom: 1.25rem; }
.candidate-detail__section-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted-foreground);
  margin-bottom: 0.6rem;
}

.candidate-detail__skills {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.candidate-detail__skill {
  padding: 4px 12px;
  background: var(--muted);
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted-foreground);
}

.candidate-detail__statuses {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.candidate-detail__status-btn {
  padding: 5px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 12px;
  color: var(--muted-foreground);
  background: transparent;
  transition: var(--transition);
  cursor: pointer;
}
.candidate-detail__status-btn:hover { background: var(--muted); color: var(--foreground); }
.candidate-detail__status-btn--active {
  background: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}
```

### `src/features/candidates/components/CandidateListView.jsx`

```jsx
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { CandidateDetailModal } from './CandidateDetailModal';
import { formatDate } from '../../../utils/formatters';
import './CandidateListView.css';

export function CandidateListView({ candidates, onStatusChange }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <>
      <div className="list-view">
        <div className="list-view__table-wrap">
          <table className="list-view__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Location</th>
                <th>Applied</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className="list-view__row"
                >
                  <td className="list-view__id">{candidate.id}</td>
                  <td>
                    <div className="list-view__name">{candidate.name}</div>
                  </td>
                  <td className="list-view__role">{candidate.role}</td>
                  <td>
                    <div className="list-view__skills">
                      {candidate.skills.map(s => (
                        <span key={s} className="list-view__skill">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="list-view__location">
                      <MapPin size={11} />
                      {candidate.location}
                    </div>
                  </td>
                  <td className="list-view__date">{formatDate(candidate.appliedDate)}</td>
                  <td className="list-view__score">{candidate.score}</td>
                  <td><Badge status={candidate.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {candidates.length === 0 && (
            <div className="list-view__empty">No candidates found.</div>
          )}
        </div>
      </div>

      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onStatusChange={onStatusChange}
      />
    </>
  );
}
```

```css
/* src/features/candidates/components/CandidateListView.css */
.list-view { overflow: hidden; }
.list-view__table-wrap { overflow-x: auto; }
.list-view__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.list-view__table thead tr {
  background: rgba(128,128,128,0.05);
  border-bottom: 1px solid var(--border);
}
.list-view__table th {
  text-align: left;
  padding: 0.6rem 1rem;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted-foreground);
  white-space: nowrap;
}
.list-view__row {
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.15s ease;
}
.list-view__row:hover { background: rgba(128,128,128,0.04); }
.list-view__table td { padding: 0.7rem 1rem; vertical-align: middle; }
.list-view__id { font-size: 11px; color: var(--muted-foreground); font-family: monospace; }
.list-view__name { font-weight: 500; }
.list-view__role { color: var(--muted-foreground); font-size: 12px; }
.list-view__skills { display: flex; flex-wrap: wrap; gap: 4px; }
.list-view__skill {
  padding: 2px 7px;
  background: var(--muted);
  border-radius: 4px;
  font-size: 10px;
  color: var(--muted-foreground);
}
.list-view__location {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; color: var(--muted-foreground);
}
.list-view__date { font-size: 12px; color: var(--muted-foreground); white-space: nowrap; }
.list-view__score { font-weight: 600; }
.list-view__empty {
  text-align: center;
  padding: 3rem;
  color: var(--muted-foreground);
  font-size: 14px;
}
```

### `src/features/jobs/components/NewJobModal.jsx`

```jsx
import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Spinner } from '../../../components/ui/Spinner';
import { createJob } from '../../../api/jobApi';
import './NewJobModal.css';

export function NewJobModal({ isOpen, onClose, onJobCreated }) {
  const [form, setForm] = useState({
    title: '', department: '', location: '', type: 'Full-time', openings: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.department) {
      setError('Title and department are required.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const newJob = await createJob(form);
      onJobCreated?.(newJob);
      onClose();
      setForm({ title: '', department: '', location: '', type: 'Full-time', openings: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post New Job" size="md">
      <div className="new-job-form">
        {error && <div className="new-job-form__error">{error}</div>}

        <div className="new-job-form__field">
          <label>Job Title *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior React Developer" />
        </div>
        <div className="new-job-form__field">
          <label>Department *</label>
          <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Engineering" />
        </div>
        <div className="new-job-form__field">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore, IN or Remote" />
        </div>
        <div className="new-job-form__row">
          <div className="new-job-form__field">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="new-job-form__field">
            <label>Openings</label>
            <input type="number" name="openings" value={form.openings} onChange={handleChange} min="1" />
          </div>
        </div>

        <div className="new-job-form__actions">
          <button className="new-job-form__cancel" onClick={onClose}>Cancel</button>
          <button className="new-job-form__submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Post Job'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
```

```css
/* src/features/jobs/components/NewJobModal.css */
.new-job-form { display: flex; flex-direction: column; gap: 1rem; }
.new-job-form__error {
  padding: 0.6rem 1rem;
  background: var(--soft-red);
  border-radius: var(--radius);
  font-size: 13px;
  color: var(--destructive);
}
.new-job-form__field { display: flex; flex-direction: column; gap: 5px; }
.new-job-form__field label { font-size: 12px; font-weight: 500; color: var(--muted-foreground); }
.new-job-form__field input,
.new-job-form__field select {
  padding: 0.5rem 0.75rem;
  background: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13.5px;
  color: var(--foreground);
  outline: none;
  transition: var(--transition);
}
.new-job-form__field input:focus,
.new-job-form__field select:focus {
  border-color: var(--ring);
  box-shadow: 0 0 0 2px rgba(128,128,128,0.12);
}
.new-job-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.new-job-form__actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
.new-job-form__cancel {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
  color: var(--muted-foreground);
  transition: var(--transition);
}
.new-job-form__cancel:hover { background: var(--muted); color: var(--foreground); }
.new-job-form__submit {
  padding: 0.5rem 1.25rem;
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  display: flex; align-items: center; gap: 8px;
  transition: var(--transition);
}
.new-job-form__submit:disabled { opacity: 0.6; cursor: not-allowed; }
.new-job-form__submit:not(:disabled):hover { opacity: 0.9; }
```

---

## 13. Pages

### `src/pages/DashboardPage.jsx`

```jsx
import { useEffect, useState } from 'react';
import { getCandidates } from '../api/candidateApi';
import { getJobs } from '../api/jobApi';
import { Spinner } from '../components/ui/Spinner';
import { CANDIDATE_STATUSES } from '../utils/constants';
import './DashboardPage.css';

export function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [candidates, jobs] = await Promise.all([getCandidates(), getJobs()]);
        setStats({
          totalCandidates: candidates.length,
          selected: candidates.filter(c => c.status === 'Selected').length,
          inProgress: candidates.filter(c => !['Selected','Rejected'].includes(c.status)).length,
          activeJobs: jobs.filter(j => j.status === 'Active').length,
          statusBreakdown: CANDIDATE_STATUSES.map(s => ({
            status: s,
            count: candidates.filter(c => c.status === s).length,
          })),
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return (
    <div className="dashboard__loading">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h2 className="dashboard__title">Dashboard</h2>
        <p className="dashboard__subtitle">Overview of your hiring pipeline</p>
      </div>

      {/* Stat Cards */}
      <div className="dashboard__stats">
        {[
          { label: 'Total Candidates', value: stats.totalCandidates, color: 'blue' },
          { label: 'In Progress',      value: stats.inProgress,      color: 'yellow' },
          { label: 'Selected',         value: stats.selected,        color: 'green' },
          { label: 'Active Jobs',      value: stats.activeJobs,      color: 'purple' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`stat-card stat-card--${color}`}>
            <div className="stat-card__value">{value}</div>
            <div className="stat-card__label">{label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Breakdown */}
      <div className="dashboard__pipeline">
        <h3 className="dashboard__section-title">Pipeline Breakdown</h3>
        <div className="dashboard__breakdown">
          {stats.statusBreakdown.map(({ status, count }) => (
            <div key={status} className="breakdown-item">
              <div className="breakdown-item__label">{status}</div>
              <div className="breakdown-item__bar-wrap">
                <div
                  className="breakdown-item__bar"
                  style={{ width: `${(count / stats.totalCandidates) * 100}%` }}
                />
              </div>
              <div className="breakdown-item__count">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

```css
/* src/pages/DashboardPage.css */
.dashboard { padding: 1.5rem; max-width: 1200px; }
.dashboard__loading { display: flex; align-items: center; justify-content: center; height: 50vh; }
.dashboard__header { margin-bottom: 1.75rem; }
.dashboard__title { font-size: 1.4rem; font-weight: 600; margin-bottom: 4px; }
.dashboard__subtitle { font-size: 13px; color: var(--muted-foreground); }

.dashboard__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
@media (max-width: 900px) { .dashboard__stats { grid-template-columns: repeat(2, 1fr); } }
.stat-card {
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--card);
}
.stat-card--blue  { border-left: 3px solid #60a5fa; }
.stat-card--yellow{ border-left: 3px solid #fbbf24; }
.stat-card--green { border-left: 3px solid #4ade80; }
.stat-card--purple{ border-left: 3px solid #a78bfa; }
.stat-card__value { font-size: 2rem; font-weight: 700; line-height: 1; margin-bottom: 6px; }
.stat-card__label { font-size: 12px; color: var(--muted-foreground); font-weight: 500; }

.dashboard__section-title { font-size: 14px; font-weight: 600; margin-bottom: 1rem; }
.dashboard__breakdown { display: flex; flex-direction: column; gap: 0.75rem; max-width: 700px; }
.breakdown-item { display: grid; grid-template-columns: 180px 1fr 40px; align-items: center; gap: 1rem; }
.breakdown-item__label { font-size: 13px; color: var(--muted-foreground); }
.breakdown-item__bar-wrap { height: 6px; background: var(--muted); border-radius: 999px; overflow: hidden; }
.breakdown-item__bar { height: 100%; background: var(--primary); border-radius: 999px; transition: width 0.4s ease; min-width: 4px; }
.breakdown-item__count { font-size: 13px; font-weight: 600; text-align: right; }
```

### `src/pages/JobsPage.jsx`

```jsx
import { useState, useEffect } from 'react';
import { KanbanBoard } from '../features/jobs/components/KanbanBoard';
import { CandidateListView } from '../features/candidates/components/CandidateListView';
import { NewJobModal } from '../features/jobs/components/NewJobModal';
import { Header } from '../components/layout/Header';
import { Spinner } from '../components/ui/Spinner';
import { useCandidates } from '../features/candidates/hooks/useCandidates';
import { CANDIDATE_STATUSES } from '../utils/constants';

export function JobsPage() {
  const [view, setView] = useState('kanban');
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const {
    candidates,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeStatus,
    setActiveStatus,
    moveCandidate,
  } = useCandidates();

  const statusCounts = CANDIDATE_STATUSES.reduce((acc, s) => {
    acc[s] = candidates.filter(c => c.status === s).length;
    return acc;
  }, {});

  if (error) return <div style={{ padding: '2rem', color: 'var(--destructive)' }}>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        view={view}
        onViewChange={setView}
        onNewJob={() => setShowNewJobModal(true)}
        onFilterToggle={() => setShowFilter(f => !f)}
        showFilter={showFilter}
        statuses={CANDIDATE_STATUSES}
        statusCounts={statusCounts}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        totalCount={candidates.length}
      />

      <main style={{ flex: 1, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Spinner size="lg" />
          </div>
        ) : view === 'kanban' ? (
          <KanbanBoard candidates={candidates} onStatusChange={moveCandidate} />
        ) : (
          <div style={{ padding: '1.25rem' }}>
            <CandidateListView candidates={candidates} onStatusChange={moveCandidate} />
          </div>
        )}
      </main>

      <NewJobModal
        isOpen={showNewJobModal}
        onClose={() => setShowNewJobModal(false)}
      />
    </div>
  );
}
```

### `src/pages/CandidatesPage.jsx`

```jsx
import { useCandidates } from '../features/candidates/hooks/useCandidates';
import { CandidateListView } from '../features/candidates/components/CandidateListView';
import { Spinner } from '../components/ui/Spinner';
import { Search } from 'lucide-react';
import './CandidatesPage.css';

export function CandidatesPage() {
  const { candidates, loading, error, searchQuery, setSearchQuery, moveCandidate } = useCandidates();

  return (
    <div className="candidates-page">
      <div className="candidates-page__header">
        <div>
          <h2 className="candidates-page__title">Candidates</h2>
          <p className="candidates-page__subtitle">{candidates.length} total candidates</p>
        </div>
        <div className="candidates-page__search-wrap">
          <Search size={14} className="candidates-page__search-icon" />
          <input
            className="candidates-page__search"
            placeholder="Search by name, role..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="candidates-page__loading"><Spinner size="lg" /></div>
      ) : error ? (
        <div className="candidates-page__error">Error: {error}</div>
      ) : (
        <CandidateListView candidates={candidates} onStatusChange={moveCandidate} />
      )}
    </div>
  );
}
```

```css
/* src/pages/CandidatesPage.css */
.candidates-page { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.candidates-page__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.candidates-page__title { font-size: 1.4rem; font-weight: 600; margin-bottom: 3px; }
.candidates-page__subtitle { font-size: 13px; color: var(--muted-foreground); }
.candidates-page__search-wrap { position: relative; }
.candidates-page__search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--muted-foreground); pointer-events: none; }
.candidates-page__search { padding: 0.45rem 0.75rem 0.45rem 2rem; font-size: 13px; background: var(--input-background); border: 1px solid var(--border); border-radius: var(--radius); color: var(--foreground); width: 250px; outline: none; transition: var(--transition); }
.candidates-page__search:focus { border-color: var(--ring); }
.candidates-page__loading { display: flex; justify-content: center; padding: 4rem; }
.candidates-page__error { color: var(--destructive); padding: 1rem; }
```

### Placeholder pages for other routes

```jsx
// src/pages/InterviewsPage.jsx
export function InterviewsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}>Interviews</h2>
      <p style={{ color: 'var(--muted-foreground)' }}>Interview scheduling coming soon.</p>
    </div>
  );
}

// src/pages/SettingsPage.jsx
export function SettingsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}>Settings</h2>
      <p style={{ color: 'var(--muted-foreground)' }}>Settings panel coming soon.</p>
    </div>
  );
}
```

---

## 14. Routing Setup

### `src/router/AppRouter.jsx`

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage }  from '../pages/DashboardPage';
import { JobsPage }        from '../pages/JobsPage';
import { CandidatesPage }  from '../pages/CandidatesPage';
import { InterviewsPage }  from '../pages/InterviewsPage';
import { SettingsPage }    from '../pages/SettingsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/"            element={<DashboardPage />} />
          <Route path="/jobs"        element={<JobsPage />} />
          <Route path="/candidates"  element={<CandidatesPage />} />
          <Route path="/interviews"  element={<InterviewsPage />} />
          <Route path="/settings"    element={<SettingsPage />} />
          {/* Catch-all → redirect home */}
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
```

---

## 15. Main App Entry

### `src/App.jsx`

```jsx
import { ThemeProvider } from './context/ThemeContext';
import { AppRouter } from './router/AppRouter';

/**
 * Root component.
 * - ThemeProvider gives theme access to all children
 * - AppRouter handles all navigation
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}
```

### `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import './styles/theme.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### `index.html` (in root folder, already created by Vite — just update the title)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Guild ATS</title>
    <!-- Google Fonts used in Figma design -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Fauna+One&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 16. Running the Project

Open your terminal inside the project folder and run:

```bash
# Install all dependencies (only run once)
npm install

# Start the development server
npm run dev
```

Then open your browser and go to: **http://localhost:5173**

You should see the ERP application running!

### Other useful commands

```bash
# Build for production (creates a dist/ folder)
npm run build

# Preview the production build
npm run preview
```

---

## 📁 Quick File Creation Checklist

Here is every file you need to create, in order:

```
✅ vite.config.js
✅ .env
✅ index.html  (update title + add Google Fonts link)

✅ src/styles/globals.css
✅ src/styles/theme.css

✅ src/utils/constants.js
✅ src/utils/formatters.js

✅ src/api/apiClient.js
✅ src/api/candidateApi.js
✅ src/api/jobApi.js
✅ src/api/departmentApi.js

✅ src/hooks/useDebounce.js
✅ src/hooks/useLocalStorage.js

✅ src/context/ThemeContext.jsx

✅ src/components/ui/Spinner.jsx + Spinner.css
✅ src/components/ui/Badge.jsx + Badge.css
✅ src/components/ui/Modal.jsx + Modal.css

✅ src/components/layout/Sidebar.jsx + Sidebar.css
✅ src/components/layout/Header.jsx + Header.css
✅ src/components/layout/AppLayout.jsx + AppLayout.css

✅ src/features/candidates/hooks/useCandidates.js
✅ src/features/candidates/components/CandidateCard.jsx + .css
✅ src/features/candidates/components/CandidateDetailModal.jsx + .css
✅ src/features/candidates/components/CandidateListView.jsx + .css

✅ src/features/jobs/components/KanbanBoard.jsx + .css
✅ src/features/jobs/components/NewJobModal.jsx + .css

✅ src/pages/DashboardPage.jsx + .css
✅ src/pages/JobsPage.jsx
✅ src/pages/CandidatesPage.jsx + .css
✅ src/pages/InterviewsPage.jsx
✅ src/pages/SettingsPage.jsx

✅ src/router/AppRouter.jsx
✅ src/App.jsx
✅ src/main.jsx
```

---

## 💡 How This Maps to Your Figma Design

| Figma Element | Code Location |
|---|---|
| Dark sidebar with "The Guild ATS" logo | `src/components/layout/Sidebar.jsx` |
| Engineering grid background | `src/components/layout/AppLayout.css` |
| Status tabs (Screening, Fitment…) | `src/components/layout/Header.jsx` |
| Kanban columns with drag-drop | `src/features/jobs/components/KanbanBoard.jsx` |
| Candidate cards with score | `src/features/candidates/components/CandidateCard.jsx` |
| List view table | `src/features/candidates/components/CandidateListView.jsx` |
| Dark/light theme toggle | `src/context/ThemeContext.jsx` |
| New Job modal | `src/features/jobs/components/NewJobModal.jsx` |
| Candidate detail modal | `src/features/candidates/components/CandidateDetailModal.jsx` |
| Color tokens (--soft-green, --soft-red, etc.) | `src/styles/theme.css` |

---

*End of Guide. Total files: ~35 files. All React, no external UI libraries.*
