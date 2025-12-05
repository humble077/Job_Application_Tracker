import { createContext, useContext, useState } from 'react';

const ApplicationsContext = createContext(null);

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  const addApplication = (application) => {
    const newApplication = {
      id: Date.now().toString(),
      ...application,
    };
    setApplications((prev) => [...prev, newApplication]);
    return newApplication;
  };

  const updateApplication = (id, updatedApplication) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedApplication } : app))
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

