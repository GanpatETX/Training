import { X, MapPin, Calendar, Mail, Phone, Briefcase, Award } from 'lucide-react';
import type { Candidate, CandidateStatus } from '../App';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
}

const statuses: CandidateStatus[] = ['Screening', 'Fitment Evaluation', 'Technical Interview', 'PTC Interview', "Founder's Interview", 'Selected', 'Rejected'];

export function CandidateDetailModal({ candidate, onClose, onStatusChange }: CandidateDetailModalProps) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div className="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Candidate ID: {candidate.id}</p>
              <h2 className="text-xl font-semibold">{candidate.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-accent/10 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="text-xs">Role</span>
                </div>
                <p className="text-sm font-medium">{candidate.role}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span className="text-xs">Score</span>
                </div>
                <p className="text-xl font-semibold">{candidate.score}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs">Location</span>
                </div>
                <p className="text-sm font-medium">{candidate.location}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">Applied Date</span>
                </div>
                <p className="text-sm font-medium">{candidate.appliedDate}</p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-xs text-muted-foreground mb-2.5">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-accent/20 rounded-md text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-xs text-muted-foreground mb-2.5">Contact Information</h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs">{candidate.name.toLowerCase().replace(' ', '.')}@email.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs">+1 (555) 000-{candidate.id.split('-')[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs text-muted-foreground mb-2.5">Update Status</h3>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onStatusChange(candidate.id, status);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                      candidate.status === status
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onStatusChange(candidate.id, 'Selected');
                    onClose();
                  }}
                  className="px-6 py-2 bg-soft-green dark:bg-soft-green text-foreground rounded-md hover:opacity-80 transition-all text-sm font-medium"
                >
                  Select
                </button>
                <button
                  onClick={() => {
                    onStatusChange(candidate.id, 'Rejected');
                    onClose();
                  }}
                  className="px-6 py-2 bg-soft-red dark:bg-soft-red text-foreground rounded-md hover:opacity-80 transition-all text-sm font-medium"
                >
                  Reject
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
