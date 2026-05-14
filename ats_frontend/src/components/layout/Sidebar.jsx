import { NavLink } from 'react-router-dom';
import {
  Home, Briefcase, Users, CalendarDays,
  Inbox, BarChart3, Settings, ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

const ICON_MAP = { Home, Briefcase, Users, CalendarDays, Inbox, BarChart3, Settings };

const NAV_ITEMS = [
  { path: '/',            label: 'Dashboard',  icon: 'Home' },
  { path: '/jobs',        label: 'Jobs',        icon: 'Briefcase' },
  { path: '/candidates',  label: 'Candidates',  icon: 'Users' },
  { path: '/interviews',  label: 'Interviews',  icon: 'CalendarDays' },
  { path: '/inbox',       label: 'Inbox',       icon: 'Inbox' },
  { path: '/analytics',   label: 'Analytics',   icon: 'BarChart3' },
  { path: '/settings',    label: 'Settings',    icon: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">G</div>
        <div>
          <div className="sidebar__logo-title">The Guild</div>
          <div className="sidebar__logo-subtitle">ATS Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const Icon = ICON_MAP[icon];
          return (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar">RO</div>
        <div className="sidebar__user-info">
          <div className="sidebar__user-name">Rohan Okafor</div>
          <div className="sidebar__user-role">HR Director</div>
        </div>
        <ChevronDown size={14} className="sidebar__chevron" />
      </div>
    </aside>
  );
}