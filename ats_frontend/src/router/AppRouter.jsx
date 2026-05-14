import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage }  from '../pages/DashboardPage';
import { JobsPage }        from '../pages/JobsPage';
import { CandidatesPage }  from '../pages/CandidatesPage';
import { InterviewsPage }  from '../pages/InterviewsPage';
import { SettingsPage }    from '../pages/SettingsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/"            element={<DashboardPage />} />
          <Route path="/jobs"        element={<JobsPage />} />
          <Route path="/candidates"  element={<CandidatesPage />} />
          <Route path="/interviews"  element={<InterviewsPage />} />
          <Route path="/settings"    element={<SettingsPage />} />
          {/* Catch-all → redirect home */}
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}