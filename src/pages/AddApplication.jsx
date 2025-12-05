import { useState } from 'react';
import { useApplications } from '../contexts/ApplicationsContext';
import './AddApplication.css';

const AddApplication = () => {
  const { addApplication } = useApplications();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobType: '',
    status: '',
    location: '',
    appliedDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job Title is required';
    }
    if (!formData.jobType) {
      newErrors.jobType = 'Job Type is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = 'Applied Date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add application
    addApplication(formData);
    
    // Show success message
    setSuccessMessage('Application added successfully!');
    
    // Clear form
    setFormData({
      companyName: '',
      jobTitle: '',
      jobType: '',
      status: '',
      location: '',
      appliedDate: '',
      notes: '',
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="add-application-page">
      <div className="container">
        <h1>Add Job Application</h1>
        <div className="card">
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">
                Company Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={errors.companyName ? 'error' : ''}
              />
              {errors.companyName && (
                <div className="error-message">{errors.companyName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">
                Job Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={errors.jobTitle ? 'error' : ''}
              />
              {errors.jobTitle && (
                <div className="error-message">{errors.jobTitle}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobType">
                  Job Type <span className="required">*</span>
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className={errors.jobType ? 'error' : ''}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.jobType && (
                  <div className="error-message">{errors.jobType}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Status <span className="required">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={errors.status ? 'error' : ''}
                >
                  <option value="">Select Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Selected">Selected</option>
                </select>
                {errors.status && (
                  <div className="error-message">{errors.status}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">
                  Location <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && (
                  <div className="error-message">{errors.location}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="appliedDate">
                  Applied Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="appliedDate"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className={errors.appliedDate ? 'error' : ''}
                />
                {errors.appliedDate && (
                  <div className="error-message">{errors.appliedDate}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApplication;

