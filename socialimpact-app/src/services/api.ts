import { Alert } from 'react-native';
import { MOODLE_BASE_URL } from '@env';

const BASE_URL = MOODLE_BASE_URL;

// Helper for error handling
// Enhanced error handler with user-friendly messages
const handleError = (error: any, defaultMessage: string = 'Something went wrong') => {
  console.error(`${defaultMessage}:`, error);

  let title = 'Error';
  let message = defaultMessage;

  if (error.message?.includes('Network request failed')) {
    // Network/CORS/offline
    title = 'Network Error';
    message = 'Unable to connect to the server. Check your internet, Moodle URL, or restart the app.';
  } else if (error.message?.includes('401') || error.message?.includes('Invalid token')) {
    // Auth failure
    title = 'Authentication Failed';
    message = 'Your session has expired or token is invalid. Please log in again.';
  } else if (error.message?.includes('403')) {
    // Permissions
    title = 'Access Denied';
    message = 'Insufficient permissions for this action. Contact your admin.';
  } else if (error.message?.includes('HTTP')) {
    // HTTP errors
    const status = error.message.match(/HTTP (\d+)/)?.[1] || 'Unknown';
    message = `${defaultMessage}. Server responded with status ${status}.`;
  } else {
    message = `${defaultMessage}: ${error.message || 'Unknown error occurred.'}`;
  }

  Alert.alert(title, message, [
    { text: 'OK', style: 'default' },
    ...(title === 'Authentication Failed' ? [{ text: 'Log In', onPress: () => {/* Navigate to login via context */} }] : []),
  ]);
};

// Login: POST to Moodle's token endpoint
export const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/login/token.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password, service: 'simple' }).toString(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.token) {
      return data.token;
    } else {
      throw new Error('No token returned from server');
    }
  } catch (error) {
    handleError(error, 'Login failed');
    throw error;
  }
};

// Get User Details: Core Moodle WS
export const getUserDetails = async (token: string): Promise<any> => {
  try {
    const params = new URLSearchParams({
      wstoken: token,
      wsfunction: 'core_webservice_get_site_info',
      moodlewsrestformat: 'json',
    });

    const response = await fetch(`${BASE_URL}/webservice/rest/server.php?${params.toString()}`);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid token - please log in again');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    handleError(error, 'Failed to fetch user details');
    return null;
  }
};

// Get Courses: Core Moodle WS
export const getCourses = async (token: string): Promise<any[]> => {
  try {
    const params = new URLSearchParams({
      wstoken: token,
      wsfunction: 'core_course_get_courses',
      moodlewsrestformat: 'json',
    });

    const response = await fetch(`${BASE_URL}/webservice/rest/server.php?${params.toString()}`);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid token - please log in again');
      }
      if (response.status === 403) {
        throw new Error('Access denied');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    handleError(error, 'Failed to fetch courses');
    throw error;
  }
};

// Get User Progress: Custom WS (from local_socialimpact plugin)
export const getUserProgress = async (token: string, userid: number, courseid: number) => {
  try {
    const params = new URLSearchParams({
      wstoken: token,
      wsfunction: 'local_socialimpact_get_user_progress',
      moodlewsrestformat: 'json',
      userid: userid.toString(),
      courseid: courseid.toString(),
    });

    const response = await fetch(`${BASE_URL}/webservice/rest/server.php?${params.toString()}`);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Session expired - please log in again');
      }
      if (response.status === 403) {
        throw new Error('Access denied - check permissions');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, 'Failed to fetch progress');
    throw error;
  }
};