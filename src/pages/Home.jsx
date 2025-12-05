import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Job Application Tracker</h1>
        <p>Keep track of all your job applications in one place</p>
        {user ? (
          <div className="home-actions">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/add-application" className="btn btn-secondary">
              Add Application
            </Link>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
        )}
      </div>
      <div className="home-features">
        <div className="feature-card">
          <h3>Track Applications</h3>
          <p>Add and manage all your job applications</p>
        </div>
        <div className="feature-card">
          <h3>Search & Filter</h3>
          <p>Easily find applications by company, status, or type</p>
        </div>
        <div className="feature-card">
          <h3>Stay Organized</h3>
          <p>Keep track of application status and important dates</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

