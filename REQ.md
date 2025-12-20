# Project Requirements Analysis: Social-Enterprise Learning Experience

## 1. Project Brief
**Goal:** Design, develop, and deploy a comprehensive learning solution consisting of a custom Moodle plugin (`mod_socialproject`) and a cross-platform React Native mobile application.

**Key Aspects:** Moodle customization, Secure RESTful API, React Native UI, CI/CD, Accessibility, Performance.

## 2. Functional Requirements

### A. Moodle Plugin (Backend & Custom Activity)
1.  **Custom Activity Module (`mod_socialproject`)**:
    *   Allow instructors to set up social impact projects with milestones and impact goals.
    *   Dashboard for instructors to grade and review evidence.
2.  **RESTful API (Moodle External Services)**:
    *   **Auth**: Secure token generation and validation.
    *   **GET /socialimpact/user/{id}/progress**: Retrieve list of assigned social projects.
    *   **GET /socialimpact/projects**: Retrieve details, milestones, and feedback.
    *   **POST /socialimpact/progress**: Submit progress (text, images) and update milestone status.
3.  **Security & Performance**:
    *   Capability checks (RBAC) ensuring only enrolled users access data.
    *   Efficient database queries for API responses.

### B. React Native App (Mobile Client)
1.  **User Authentication**:
    *   Login screen with Moodle site URL and credentials.
    *   Secure storage of user tokens.
2.  **Project Dashboard**:
    *   List of enrolled social projects.

## 3. Requirements Matrix

| Feature | Moodle Plugin | React Native App | API | Priority |
| :--- | :---: | :---: | :---: | :---: |
| **User Authentication** | ✅ (Token Service) | ✅ (Login UI) | ✅ (Token Endpoint) | **High** |
| **Project Configuration** | ✅ (Activity Settings) | | | **High** |
| **View User progress** | | ✅ (List View) | ✅ (Get Projects) | **High** |

## 4. High-Level Timeline (3 Months)

### Month 1: Moodle Backend & API Core
*   **Week 1-2**: Requirement refinement & Database schema design for `mod_socialproject`.
*   **Week 3**: Develop basic Moodle Activity plugin (Settings, View, Install).
*   **Week 4**: Implement RESTful API endpoints (Auth, Get Projects) & Unit Testing (PHPUnit).

### Month 2: React Native App Foundation
*   **Week 1**: App setup (Expo/CLI), CI/CD pipeline setup, and Authentication flow.
*   **Week 2**: Courses List and Detail screens UI dev (Mock data).
*   **Week 3**: Integrate real API (Axios/React Query) & State Management.

### Month 3: Integration, Polish & Deployment
*   **Week 1**: Advanced API features (Grading view synchronization).
*   **Week 2**: UI Polishing, and Performance optimization.
*   **Week 3**: End-to-End Testing & Bug Fixes.
*   **Week 4**: Deployment (Moodle Plugin ZIP / App Store submission prep) & Documentation.
