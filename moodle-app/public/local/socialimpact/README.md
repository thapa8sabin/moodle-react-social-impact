# Moodle Local Social Impact Plugin

A simple local plugin for tracking user lesson progress (completed vs. total) via web services in Moodle, based on the provided code snippet example.

## Installation

1. Place the `socialimpact` folder in your Moodle's `local/` directory (e.g., `/path/to/moodle/local/socialimpact`).
2. Log in as administrator and visit **Site administration > Notifications** to install (creates `mdl_local_socialimpact` table).
3. (Optional) Settings: **Site administration > Plugins > Local plugins > Social impact** (none defined yet).

## Enabling Web Services

1. Enable web services: **Site administration > Advanced features > Enable web services**.
2. Enable "Social Impact Progress Service": **Site administration > Server > Web services > External services**.
3. Create a token: **Site administration > Server > Web services > Manage tokens** for the service.

## Enabling Protocol (For development purpose only)

1. Enable Protocol: **Site administration > Server > Web services > Manage Protocol**.
2. Create HTTP protocol: **Site administration > Server > Web services > Manage Protocol > REST protocol** for the service.

## Testing with Postman

Base URL: `https://yourmoodle/webservice/rest/server.php`.

### Get User Progress

- **Method**: GET
- **Query Parameters**:
  - `wstoken`: Your token //d61a8e592bf66db78c291db3d6f01ab0
  - `wsfunction`: `local_socialimpact_get_user_progress`
  - `moodlewsrestformat`: `json`
  - `userid`: e.g., `2`
- **Expected Response** (JSON):
  ```json
  {
    "completed": 5,
    "total": 10
  }
  ```
