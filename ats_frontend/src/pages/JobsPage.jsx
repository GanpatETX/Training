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