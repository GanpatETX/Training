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