import { useState, useMemo } from 'react';
import { useApplications } from '../contexts/ApplicationsContext';
import './Applications.css';

const Applications = () => {
  const { applications, deleteApplication, updateApplication } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJobType, setFilterJobType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const itemsPerPage = 5;

  // Get unique job types and statuses for filters
  const jobTypes = useMemo(() => {
    const types = [...new Set(applications.map((app) => app.jobType))];
    return types.filter(Boolean);
  }, [applications]);

  const statuses = useMemo(() => {
    const statusList = [...new Set(applications.map((app) => app.status))];
    return statusList.filter(Boolean);
  }, [applications]);

  // Filter and search applications
  const filteredApplications = useMemo(() => {
    let filtered = applications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Job type filter
    if (filterJobType !== 'All') {
      filtered = filtered.filter((app) => app.jobType === filterJobType);
    }

    // Status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    // Sorting
    if (sortBy === 'company') {
      filtered = [...filtered].sort((a, b) =>
        a.companyName.localeCompare(b.companyName)
      );
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
      );
    }

    return filtered;
  }, [applications, searchTerm, filterJobType, filterStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEdit = (application) => {
    setEditingId(application.id);
    setEditFormData({
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      jobType: application.jobType,
      status: application.status,
      location: application.location,
      appliedDate: application.appliedDate,
      notes: application.notes || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = (id) => {
    updateApplication(id, editFormData);
    setEditingId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      // Reset to first page if current page becomes empty
      if (paginatedApplications.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortBy(null);
    } else {
      setSortBy(type);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="applications-page">
      <div className="container">
        <h1>Job Applications</h1>

        {/* Search and Filters */}
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search by company name or job title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <select
            value={filterJobType}
            onChange={(e) => {
              setFilterJobType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Buttons */}
        <div className="sort-buttons">
          <button
            className={`btn ${sortBy === 'company' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('company')}
          >
            Sort by Company (A–Z)
          </button>
          <button
            className={`btn ${sortBy === 'date' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSort('date')}
          >
            Sort by Applied Date (Newest → Oldest)
          </button>
          {sortBy && (
            <button
              className="btn btn-secondary"
              onClick={() => handleSort(null)}
            >
              Reset Sorting
            </button>
          )}
        </div>

        {/* Applications Table */}
        {paginatedApplications.length === 0 ? (
          <div className="card">
            <p>No applications found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Job Type</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplications.map((application) => (
                    <tr key={application.id}>
                      {editingId === application.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="companyName"
                              value={editFormData.companyName}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="jobTitle"
                              value={editFormData.jobTitle}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <select
                              name="jobType"
                              value={editFormData.jobType}
                              onChange={handleEditChange}
                              className="edit-input"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Internship">Internship</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                            </select>
                          </td>
                          <td>
                            <select
                              name="status"
                              value={editFormData.status}
                              onChange={handleEditChange}
                              className="edit-input"
                            >
                              <option value="Applied">Applied</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Selected">Selected</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="location"
                              value={editFormData.location}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="appliedDate"
                              value={editFormData.appliedDate}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleSaveEdit(application.id)}
                              style={{ marginRight: '5px', padding: '5px 10px', fontSize: '14px' }}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={handleCancelEdit}
                              style={{ padding: '5px 10px', fontSize: '14px' }}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{application.companyName}</td>
                          <td>{application.jobTitle}</td>
                          <td>{application.jobType}</td>
                          <td>
                            <span className={`status-badge status-${application.status.toLowerCase().replace(' ', '-')}`}>
                              {application.status}
                            </span>
                          </td>
                          <td>{application.location}</td>
                          <td>
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleEdit(application)}
                              style={{ marginRight: '5px', padding: '5px 10px', fontSize: '14px' }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(application.id)}
                              style={{ padding: '5px 10px', fontSize: '14px' }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

            <div className="results-info">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;

