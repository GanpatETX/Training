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
