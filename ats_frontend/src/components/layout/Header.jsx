import { Search, Filter, LayoutGrid, List, Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

export function Header({
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
  onNewJob,
  onFilterToggle,
  showFilter,
  statuses,
  statusCounts,
  activeStatus,
  onStatusChange,
  totalCount,
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__top">
        {/* Title */}
        <h1 className="header__title">The Guild ATS</h1>

        {/* Actions */}
        <div className="header__actions">
          {/* Search */}
          <div className="header__search-wrap">
            <Search size={14} className="header__search-icon" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="header__search"
            />
          </div>

          {/* Filter toggle */}
          <button
            className={`header__icon-btn ${showFilter ? 'header__icon-btn--active' : ''}`}
            onClick={onFilterToggle}
            title="Filter"
          >
            <Filter size={15} />
          </button>

          {/* View toggle */}
          <div className="header__view-toggle">
            <button
              className={`header__icon-btn ${view === 'kanban' ? 'header__icon-btn--selected' : ''}`}
              onClick={() => onViewChange('kanban')}
              title="Kanban view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              className={`header__icon-btn ${view === 'list' ? 'header__icon-btn--selected' : ''}`}
              onClick={() => onViewChange('list')}
              title="List view"
            >
              <List size={15} />
            </button>
          </div>

          {/* Theme toggle */}
          <button className="header__icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* New Job button */}
          <button className="header__new-btn" onClick={onNewJob}>
            <Plus size={15} />
            New Job
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="header__tabs">
        <button
          className={`header__tab ${activeStatus === 'All' ? 'header__tab--active' : ''}`}
          onClick={() => onStatusChange('All')}
        >
          All • {totalCount}
        </button>
        {statuses.map(status => (
          <button
            key={status}
            className={`header__tab ${activeStatus === status ? 'header__tab--active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {status} • {statusCounts[status] || 0}
          </button>
        ))}
      </div>
    </header>
  );
}