import { useDrag } from 'react-dnd';
import { MapPin, Calendar } from 'lucide-react';
import type { Candidate } from '../App';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

export function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANDIDATE',
    item: { id: candidate.id, status: candidate.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`bg-card/90 border border-border/60 rounded-xl p-4 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.015] hover:border-border/80 hover:-translate-y-1 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } backdrop-blur-sm will-change-transform`}
      style={{
        boxShadow: isDragging
          ? 'none'
          : '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-out',
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.boxShadow = document.documentElement.classList.contains('dark')
            ? '0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15)'
            : '0 8px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)';
        }
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-[11px] text-muted-foreground mb-1 font-medium tracking-wide">{candidate.id}</p>
          <h3 className="text-sm font-semibold mb-1">{candidate.name}</h3>
          <p className="text-xs text-muted-foreground">{candidate.role}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{candidate.score}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-muted/40 rounded-md text-[10px] font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{candidate.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{candidate.appliedDate}</span>
        </div>
      </div>
    </div>
  );
}
