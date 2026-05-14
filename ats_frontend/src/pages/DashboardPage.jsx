import { useEffect, useState } from 'react';
import { getCandidates } from '../api/candidateApi';
import { getJobs } from '../api/jobApi';
import { Spinner } from '../components/ui/Spinner';
import { CANDIDATE_STATUSES } from '../utils/constants';
import './DashboardPage.css';

export function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [candidates, jobs] = await Promise.all([getCandidates(), getJobs()]);
        setStats({
          totalCandidates: candidates.length,
          selected: candidates.filter(c => c.status === 'Selected').length,
          inProgress: candidates.filter(c => !['Selected','Rejected'].includes(c.status)).length,
          activeJobs: jobs.filter(j => j.status === 'Active').length,
          statusBreakdown: CANDIDATE_STATUSES.map(s => ({
            status: s,
            count: candidates.filter(c => c.status === s).length,
          })),
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return (
    <div className="dashboard__loading">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h2 className="dashboard__title">Dashboard</h2>
        <p className="dashboard__subtitle">Overview of your hiring pipeline</p>
      </div>

      {/* Stat Cards */}
      <div className="dashboard__stats">
        {[
          { label: 'Total Candidates', value: stats.totalCandidates, color: 'blue' },
          { label: 'In Progress',      value: stats.inProgress,      color: 'yellow' },
          { label: 'Selected',         value: stats.selected,        color: 'green' },
          { label: 'Active Jobs',      value: stats.activeJobs,      color: 'purple' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`stat-card stat-card--${color}`}>
            <div className="stat-card__value">{value}</div>
            <div className="stat-card__label">{label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Breakdown */}
      <div className="dashboard__pipeline">
        <h3 className="dashboard__section-title">Pipeline Breakdown</h3>
        <div className="dashboard__breakdown">
          {stats.statusBreakdown.map(({ status, count }) => (
            <div key={status} className="breakdown-item">
              <div className="breakdown-item__label">{status}</div>
              <div className="breakdown-item__bar-wrap">
                <div
                  className="breakdown-item__bar"
                  style={{ width: `${(count / stats.totalCandidates) * 100}%` }}
                />
              </div>
              <div className="breakdown-item__count">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}