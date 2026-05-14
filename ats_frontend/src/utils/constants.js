// ============================================
// APPLICATION-WIDE CONSTANTS
// ============================================

export const APP_NAME = 'The Guild ATS';

export const CANDIDATE_STATUSES = [
  'Screening',
  'Fitment Evaluation',
  'Technical Interview',
  'PTC Interview',
  "Founder's Interview",
  'Selected',
  'Rejected',
];

export const STATUS_COLORS = {
  'Screening':            'status-screening',
  'Fitment Evaluation':   'status-fitment',
  'Technical Interview':  'status-technical',
  'PTC Interview':        'status-ptc',
  "Founder's Interview":  'status-founders',
  'Selected':             'status-selected',
  'Rejected':             'status-rejected',
};

export const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',  icon: 'Home' },
  { id: 'jobs',        label: 'Jobs',       icon: 'Briefcase' },
  { id: 'candidates',  label: 'Candidates', icon: 'Users' },
  { id: 'interviews',  label: 'Interviews', icon: 'CalendarDays' },
  { id: 'inbox',       label: 'Inbox',      icon: 'Inbox' },
  { id: 'analytics',   label: 'Analytics',  icon: 'BarChart3' },
  { id: 'settings',    label: 'Settings',   icon: 'Settings' },
];