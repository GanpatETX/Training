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