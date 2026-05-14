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