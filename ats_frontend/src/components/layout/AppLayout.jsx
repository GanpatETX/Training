import { Sidebar } from './Sidebar';
import './AppLayout.css';

/**
 * Root layout wrapper that includes the sidebar + main content area.
 * Wrap all page content inside this.
 */
export function AppLayout({ children }) {
  return (
    <div className="app-layout">
      {/* Grid background decoration (from Figma) */}
      <div className="app-layout__bg" aria-hidden="true" />

      <Sidebar />

      <div className="app-layout__main">
        {children}
      </div>
    </div>
  );
}