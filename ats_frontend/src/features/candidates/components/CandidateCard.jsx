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