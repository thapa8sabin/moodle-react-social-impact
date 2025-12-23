# Moodle React social Impact App

## Overview

<p>
    This repository implements a full-stack application for tracking user progress in Moodle courses focused on social impact topics. It combines a custom Moodle local plugin with a React Native mobile app for seamless progress visualization.
</p>

## Key Features

- **Moodle Plugin** (`local_socialimpact`): Custom web services (`get_user_progress`, `set_user_progress`) to retrieve/set lesson completion (completed/total per course). DB table for course-specific tracking.
- **React Native App** (`socialimpact-app`): Expo-based mobile app with screens for:
  - **Login**: Moodle token-based auth.
  - **Course List**: Fetches enrolled courses.
  - **Progress Detail**: Course-specific progress with progress bar
- **Integration**: App uses Moodle REST APIs; handles errors (network/auth) with alerts.
- **Infrastructure**: Docker Compose for local stack (Moodle + MySQL + RN dev server).
- **CI/CD**: GitHub Actions for PHP/JS linting, PHPUnit/ESLint tests, Docker build/push to Docker Hub.
- **UI/UX**: Low-fidelity wireframes in `docs/wireframes/` (login, course list, progress detail); styled with Flexbox/StyleSheet.

The app supports mobile-first design, with mock data fallback and real API fetches via `.env` token.

## Prerequisites

- Docker & Docker Compose(V20+).
- Node.js v20+
- GitHub account (for CI secrets: Docker Hub token)
- Moodle admin basics (web services/tokens)
- Expo Go app (iOS/Android testing)

# Quick Start

## 1. Clone Repo:

```bash
git clone https://github.com/thapasabin/moodle-react-social-impact.git
cd moodle-react-social-impact
```

## 2. Start Moodle Stack:

```bash
docker-compose up -d --build
```

- Access: http://localhost:8080 > Complete wizard (Db: host=`db`, etc.)

## 3. Configure Moodle:

- Notification > Install Plugin
- Advanced features > Enable web services
- External service > Add: "Social impact Service" with functions (`local_socialimpact*`, `core_enrol_get_users_courses`, `core_webservice_get_site_info`)
- Manage Token > Generate token for admin > Copy

## 4. Run React Native App

Create `.env`

```text
MOODLE_BASE_URL=http://localhost:8080
MOODLE_TEST_TOKEN=your_token_here
```

```bash
cd socialimpact-app
npm install
npn run android
// for web
npm run web
```

## 5. Test API (Postman)

- GET `/webservice/rest/server.php?wstoken=TOKEN&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json`

- GET `/webservice/rest/server.php?wstoken=TOKEN&wsfunction=local_socialimpact_get_user_progress&moodlewsrestformat=json&courseid=2`

## 6. Test Data

- Add course

## 7. CI/CD

Push to main triggers lint (PHP/JS), tests, Docker build/push. Secrets: `DOCKERHUB_USERNAME`/`DOCKERHUB_TOKEN` in Settings > Secrets/Actions.

## Troubleshooting

- Fetches fail: Add CORS to Moodle .htaccess (`Header set Access-Control-Allow-Origin "*"`).
- Plugin issues: Notifications.
- Lint/tests: Run locally, commit fixes.
- Docker: docker-compose logs <service>; rebuild --build.

## Badges

[![CI](https://github.com/thapa8sabin/moodle-react-social-impact/actions/workflows/ci.yml/badge.svg)](https://github.com/thapa8sabin/moodle-react-social-impact/actions/workflows/ci.yml)
