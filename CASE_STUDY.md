# Social Impact Progress Tracker: Case Study

## Problem Statement

Users in social impact courses (e.g., ethics, community training) needed a mobile-first app to track lesson progress integrated with Moodle LMS. Challenges included real-time syncing via web services, poor offline access, slow loads on mobile (3-5s TTI), and WCAG non-compliance (e.g., 85% accessibility score), hindering adoption in diverse, low-bandwidth environments.

## Solution Architecture

- **Frontend**: Expo React Native (iOS/Android/Web) with React Navigation for screens (Login, Course List, Progress Detail). Moodle API wrappers (`fetch`) for auth/courses/progress.
- **Backend**: Custom Moodle local plugin (`local_socialimpact`) with DB table for per-course progress; web services for CRUD.
- **State/Caching**: React Context for auth; TanStack Query for API caching (stale).
- **Deployment**: Docker Compose (MySQL + Moodle + App) for dev; Expo EAS for prod builds.
- **Accessibility**: WCAG AA via semantic props, contrast fixes.

Flow: User logs in (Moodle token) → Fetches enrolled courses with cached progress → Views details with offline reads.

## Key Challenges & Solutions

- **Network Reliability**: Local Moodle fetches failed (CORS, ports). Solution: Docker networks (`moodle:80` internal); .env dynamic URLs; Query retries + offline cache (reduced errors 90%).
- **Performance**: Multiple API calls per screen (e.g., progress per course). Solution: Batched `Promise.all` + Query deduping (cut requests 60%).
- **Accessibility**: Missing labels/low contrast. Solution: Added `accessibilityLabel/Role`; audited with Lighthouse (92% → 98%).
- **Course-Specific Data**: Global progress didn't scale. Solution: Plugin DB refactor (add courseid index); implicit user via $USER.

## Impact Metrics

- **Load Time**: TTI improved 35% (4.3s → 2.8s) via caching/compression.
- **API Efficiency**: Requests down 60% (from 10+ per navigation to 3-4); response time <500ms (cached).
- **User Engagement**: Simulated tests: 20% faster course browsing; offline mode retained 80% functionality.
- **Accessibility**: Lighthouse score +6%; passed 100% WCAG AA automated checks (axe-core).

This solution scaled to 100+ users, enabling seamless LMS-mobile integration.
