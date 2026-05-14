import './Badge.css';

/**
 * Status badge component
 * @param {{ status: string, children: React.ReactNode }} props
 */
export function Badge({ status, children }) {
  const statusClass = {
    'Screening':           'badge--screening',
    'Fitment Evaluation':  'badge--fitment',
    'Technical Interview': 'badge--technical',
    'PTC Interview':       'badge--ptc',
    "Founder's Interview": 'badge--founders',
    'Selected':            'badge--selected',
    'Rejected':            'badge--rejected',
    'Active':              'badge--selected',
    'Closed':              'badge--rejected',
  }[status] || 'badge--default';

  return (
    <span className={`badge ${statusClass}`}>
      {children || status}
    </span>
  );
}