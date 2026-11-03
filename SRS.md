# Software Requirements Specification (SRS)
## CampusCare — Campus Maintenance Request Management System

**Version:** 1.0  
**Project type:** Web application / academic prototype

## 1. Introduction

### 1.1 Purpose
CampusCare is a web-based system for reporting, tracking, and managing maintenance issues within a college campus. It provides a shared request board for students, faculty, maintenance staff, and administrators.

### 1.2 Scope
The system supports issue reporting, request status tracking, searching/filtering, and basic administration. This version is a client-side prototype built with HTML, CSS, and JavaScript. Data is stored in browser local storage.

### 1.3 Definitions
- **Request / ticket:** A record describing a campus issue.
- **Stakeholder:** A user who interacts with the system in a particular role.
- **Status:** The current stage of a request: Open, In Progress, or Resolved.
- **Local storage:** Browser storage that saves data on the current browser and device.

## 2. Overall Description

### 2.1 Product perspective
CampusCare is a standalone front-end application. It requires a modern web browser and can be opened directly or served using VS Code Live Server. No external database is required.

### 2.2 User classes
1. **Student:** Reports an issue and checks its status.
2. **Faculty:** Reports and monitors campus issues.
3. **Maintenance Staff:** Reviews the request board and changes statuses.
4. **Administrator:** Oversees requests, changes statuses, and removes demo records.

### 2.3 Operating environment
- Windows, macOS, or Linux
- VS Code or another code editor
- Modern browser (Chrome, Edge, Firefox, or equivalent)
- Optional VS Code Live Server extension

### 2.4 Constraints and assumptions
- This prototype has no server, database, or real login system.
- The role selector demonstrates role-specific controls only; it is not an access-control security mechanism.
- Records are available only in the browser profile where they were created.
- Users have a working browser with JavaScript enabled.

## 3. Functional Requirements

- **FR-01 — Create request:** The system shall allow Student and Faculty views to submit a request.
- **FR-02 — Validate request:** The system shall require requester name, department/block, category, location, title, and description.
- **FR-03 — Generate identifier:** The system shall assign a unique-looking ticket identifier to each submitted request.
- **FR-04 — Initial status:** New requests shall be assigned the status `Open`.
- **FR-05 — View requests:** The system shall display request details on a shared request board.
- **FR-06 — Search requests:** The system shall let users search request text and key fields.
- **FR-07 — Filter requests:** The system shall filter records by status.
- **FR-08 — Update status:** Maintenance Staff and Administrator views shall be able to change a request's status.
- **FR-09 — Delete request:** Administrator view shall be able to delete a record after confirmation.
- **FR-10 — Summary counts:** The system shall display total, open, in-progress, and resolved request counts.
- **FR-11 — Persist data:** The system shall save records to browser local storage and reload them on subsequent visits.
- **FR-12 — Responsive interface:** The interface shall adapt to desktop and mobile screen sizes.

## 4. External Interface Requirements

### 4.1 User interface
The interface includes a stakeholder selector, request form, summary cards, status filter, search input, and request cards. Feedback is shown after important actions.

### 4.2 Software interface
The application uses standard HTML, CSS, JavaScript, browser DOM APIs, and `localStorage`. It has no external API integration.

## 5. Non-Functional Requirements

- **Usability:** Form labels and clear messages shall make the application easy to understand.
- **Performance:** The demo shall render a small set of records without a server request.
- **Compatibility:** The application shall work in current mainstream browsers.
- **Maintainability:** HTML, CSS, and JavaScript shall be separated into individual files.
- **Data persistence:** Records shall remain available after refresh in the same browser profile.
- **Security limitation:** This prototype is not suitable for real confidential data because it has no authentication, server-side authorization, or database security.

## 6. Data Requirements

Each request contains:
- Request ID
- Requester name
- Department or block
- Category
- Location
- Title
- Description
- Priority
- Optional contact
- Status
- Creation timestamp
- Optional update timestamp

## 7. Main Use Cases

### UC-01: Submit a maintenance request
**Actor:** Student or Faculty  
**Precondition:** The page is open.  
**Main flow:** Enter the required details, choose category and priority, submit the form, and receive a confirmation. The request appears on the board with status Open.  
**Alternative flow:** If a required field is missing, the browser prevents submission and asks the user to complete it.

### UC-02: Update request status
**Actor:** Maintenance Staff or Administrator  
**Main flow:** Select a status from a request card. The application saves the new status and updates the summary counts.

### UC-03: Remove a request
**Actor:** Administrator  
**Main flow:** Select Delete record and confirm. The request is removed from the local demo data.

### UC-04: Find a request
**Actor:** Any role  
**Main flow:** Enter a search term or choose a status filter. The board shows matching requests.

## 8. Acceptance Criteria

- A user can submit a complete request and see it on the board.
- A request with missing required fields is not submitted.
- The new request receives an ID and Open status.
- Search and status filtering change the visible list.
- Maintenance Staff and Administrator views can update status.
- Administrator view can delete a record after confirmation.
- Summary counts update when records change.
- Refreshing the browser preserves records in the same browser profile.

## 9. Future Enhancements

- Real authentication and authorization
- Backend API and relational database
- Email or in-app notifications
- Image attachments
- Assignment to individual technicians
- Audit history and analytics dashboard
- Deployment to a hosted server
