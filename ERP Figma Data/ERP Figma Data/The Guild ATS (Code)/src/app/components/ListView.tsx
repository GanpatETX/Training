import { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { CandidateDetailModal } from './CandidateDetailModal';
import type { Candidate, CandidateStatus } from '../App';

interface ListViewProps {
  candidates: Candidate[];
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
}

export function ListView({ candidates, onStatusChange }: ListViewProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const getStatusColor = (status: CandidateStatus) => {
    switch (status) {
      case 'Screening':
        return 'bg-muted/30 text-foreground border-border';
      case 'Fitment Evaluation':
        return 'bg-muted/40 text-foreground border-border';
      case 'Technical Interview':
        return 'bg-accent/30 text-foreground border-border';
      case 'PTC Interview':
        return 'bg-accent/40 text-foreground border-border';
      case "Founder's Interview":
        return 'bg-accent/50 text-foreground border-border';
      case 'Selected':
        return 'bg-soft-green dark:bg-soft-green text-foreground border-border';
      case 'Rejected':
        return 'bg-soft-red dark:bg-soft-red text-foreground border-border';
      default:
        return 'bg-muted/20 text-foreground border-border';
    }
  };

  return (
    <>
      <div className="bg-card rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Candidate</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Role</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Skills</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Applied</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Score</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {candidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className="hover:bg-muted/10 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-xs text-muted-foreground">{candidate.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">{candidate.name}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{candidate.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 bg-muted/50 rounded text-[10px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-2.5 h-2.5" />
                      {candidate.location}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {candidate.appliedDate}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold">{candidate.score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
