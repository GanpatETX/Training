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