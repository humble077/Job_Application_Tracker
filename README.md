# Job Application Tracker

A comprehensive React application for tracking job applications with authentication, form management, search, filter, sort, and pagination features.

## Project Description

The Job Application Tracker is a full-featured web application that helps users manage their job applications efficiently. It provides a secure login system, intuitive forms for adding applications, and powerful tools for viewing and managing applications through a table interface with advanced filtering and sorting capabilities.

## Tech Stack

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Vite 5.0.8** - Build tool and development server
- **Context API** - State management for authentication and applications
- **CSS3** - Styling and responsive design

## Features Implemented

### 1. Authentication System
- Fake authentication using Context API
- Role-based access (Manager/User)
- Protected routes that redirect to login if not authenticated
- Login form with email and password validation
- Logout functionality

### 2. Routing
- `/` - Landing/Home page
- `/login` - Login page
- `/dashboard` - Summary dashboard (Protected)
- `/add-application` - Add job application form (Protected)
- `/applications` - Job applications table (Protected)
- `*` - 404 Page Not Found

### 3. Navigation
- Responsive navbar with conditional links
- Shows Login/Logout based on authentication state
- Quick access to all major sections

### 4. Add Job Application Form
- Comprehensive form with validation:
  - Company Name (required)
  - Job Title (required)
  - Job Type dropdown (Full-time, Internship, Part-time, Contract)
  - Status dropdown (Applied, Interview Scheduled, Rejected, Selected)
  - Location (required)
  - Applied Date (required)
  - Notes (optional textarea)
- Real-time validation with error messages
- Success message on submission
- Form reset after successful submission

### 5. Applications Table
- **Search**: Case-insensitive search by company name or job title
- **Filter**: 
  - Filter by Job Type (All/Full-time/Internship/Part-time/Contract)
  - Filter by Status (All/Applied/Interview Scheduled/Rejected/Selected)
- **Sorting**:
  - Sort by Company Name (A-Z)
  - Sort by Applied Date (Newest → Oldest)
  - Reset sorting option
- **Pagination**: 
  - 5 applications per page
  - Previous/Next navigation buttons
  - Page indicators
  - Disabled buttons at first/last page
- **Actions**:
  - Edit button for inline editing
  - Delete button with confirmation
  - Status badges with color coding

### 6. Dashboard Summary
- Summary cards displaying:
  - Total Applications
  - Applied count
  - Interview Scheduled count
  - Selected count (green highlight)
  - Rejected count (red highlight)
- Recent Applications section showing last 5 applications
- Real-time statistics based on current applications

### 7. Form Validation
- Email format validation
- Password minimum length validation (6 characters)
- Required field validation
- Error messages displayed under each field
- No alerts - all feedback through UI

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Job Application Tracker"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Login
- Use any email and password (minimum 6 characters) to login as a regular user
- Use `hrmanager@gmail.com` with any password to login as a manager
- Both roles have the same functionality in this implementation

### Adding Applications
1. Navigate to "Add Application" from the navbar
2. Fill in the required fields
3. Click "Add Application" to save
4. A success message will appear and the form will reset

### Managing Applications
1. Navigate to "Applications" from the navbar
2. Use the search bar to find specific applications
3. Use filters to narrow down by job type or status
4. Use sort buttons to organize applications
5. Navigate through pages using pagination controls
6. Click "Edit" to modify an application inline
7. Click "Delete" to remove an application (with confirmation)

### Dashboard
- View summary statistics of all applications
- See recent applications at the bottom
- All data updates in real-time

## Project Structure

```
Job Application Tracker/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   └── PrivateRoute.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ApplicationsContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── AddApplication.jsx
│   │   ├── AddApplication.css
│   │   ├── Applications.jsx
│   │   ├── Applications.css
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Key Implementation Details

### Authentication
- Uses React Context API for global state management
- Fake authentication - no backend required
- Protected routes using `PrivateRoute` component
- Automatic redirect to login for unauthenticated users

### State Management
- `AuthContext`: Manages user authentication state
- `ApplicationsContext`: Manages job applications CRUD operations
- Both contexts are provided at the app level

### Form Handling
- Controlled components using `useState`
- Real-time validation
- Error messages displayed inline
- Success feedback without page refresh

### Table Features
- Uses `useMemo` for optimized filtering and sorting
- Pagination calculated based on filtered results
- Inline editing with form state management
- Confirmation dialogs for destructive actions

## Screenshots

### Login Page
The login page features a clean, centered form with email and password inputs. It includes real-time validation with error messages displayed below each field. A helpful hint is provided for testing different user roles.

### Applications Table
The applications table displays all job applications with columns for company name, job title, job type, status, location, and applied date. It includes search functionality, filters for job type and status, sorting options, and pagination controls. Each row has Edit and Delete action buttons.

### Dashboard Summary
The dashboard shows summary cards with statistics including total applications, applied count, interview scheduled count, selected count, and rejected count. Below the cards, the last 5 applications are displayed in a list format with status badges and dates.

## Future Enhancements

- Backend integration with a real database
- User registration functionality
- Email notifications
- Export to CSV/PDF
- Advanced analytics and charts
- Reminder notifications for interviews
- Notes and attachments per application

## License

This project is created for educational purposes.

## Author

Created as part of a React course assignment covering React Router, Authentication, Forms, Tables, Search, Filter, Sort, and Pagination.

