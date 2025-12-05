import { useApplications } from '../contexts/ApplicationsContext';
import './Dashboard.css';

const Dashboard = () => {
  const { applications } = useApplications();

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === 'Applied').length,
    interviewScheduled: applications.filter(
      (app) => app.status === 'Interview Scheduled'
    ).length,
    selected: applications.filter((app) => app.status === 'Selected').length,
    rejected: applications.filter((app) => app.status === 'Rejected').length,
  };

  // Get last 5 applications (most recent)
  const lastApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Applications</h3>
            <div className="number">{stats.total}</div>
          </div>
          <div className="dashboard-card">
            <h3>Applied</h3>
            <div className="number">{stats.applied}</div>
          </div>
          <div className="dashboard-card">
            <h3>Interview Scheduled</h3>
            <div className="number">{stats.interviewScheduled}</div>
          </div>
          <div className="dashboard-card">
            <h3>Selected</h3>
            <div className="number" style={{ color: '#28a745' }}>
              {stats.selected}
            </div>
          </div>
          <div className="dashboard-card">
            <h3>Rejected</h3>
            <div className="number" style={{ color: '#dc3545' }}>
              {stats.rejected}
            </div>
          </div>
        </div>

        {/* Last 5 Applications */}
        {lastApplications.length > 0 && (
          <div className="last-applications card">
            <h2>Recent Applications</h2>
            <ul>
              {lastApplications.map((app) => (
                <li key={app.id}>
                  <div className="application-item">
                    <div>
                      <strong>{app.companyName}</strong> - {app.jobTitle}
                    </div>
                    <div className="application-meta">
                      <span className={`status-badge status-${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                      <span className="application-date">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {applications.length === 0 && (
          <div className="card">
            <p>No applications yet. Start by adding your first job application!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

