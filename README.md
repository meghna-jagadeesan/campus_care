# CampusCare — Campus Maintenance Request Management System

A beginner-friendly multi-stakeholder web project built with HTML, CSS, and JavaScript. It runs directly in VS Code and does not require a database or backend server.

## Run the project

1. Download and extract `CampusCare_Project.zip`.
2. Open the `campus_care_system` folder in VS Code.
3. Open `index.html` in a browser, or use the **Live Server** VS Code extension and click **Go Live**.
4. Choose a role from the **View as** dropdown to explore the different stakeholder views.

## Stakeholders and permissions

- **Student:** Submit maintenance requests and view/filter requests.
- **Faculty:** Submit requests and monitor reported issues.
- **Maintenance Staff:** View requests and update their status to Open, In Progress, or Resolved.
- **Administrator:** Update statuses and delete demo records.

This is a front-end academic demo, not a secure production application. The role selector is a simulation, not authentication. Data is stored in the current browser using `localStorage`; clearing browser storage removes the saved records. It does not sync between different devices or browsers.

## Features

- Request form with required-field validation
- Categories, location, priority, description, and optional contact
- Request IDs and submission timestamps
- Status summary cards
- Search and status filters
- Role-based interface controls for demonstration
- Persistent browser storage
- Responsive layout for desktop and mobile

## Files

- `index.html` — page structure and form
- `style.css` — styling and responsive layout
- `script.js` — validation, rendering, role views, filtering, status changes, and local storage
- `SRS.md` — Software Requirements Specification
