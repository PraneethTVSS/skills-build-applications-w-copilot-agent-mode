/**
 * API utility for fetching data from the Octofit backend
 * 
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local
 * If not set, falls back to localhost:8000 for local development
 */

/**
 * Build the API base URL based on environment
 * @returns {string} The API base URL
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000';
}

/**
 * Fetch data from the API
 * @param {string} endpoint - The API endpoint (e.g., '/api/users')
 * @returns {Promise<any>} The response data
 */
export async function fetchFromApi(endpoint) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
}

/**
 * Extract data from API response (handles both array and paginated responses)
 * @param {any} response - The API response
 * @returns {Array} The data array
 */
export function extractDataFromResponse(response) {
  // If response.data is an array, use it
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  }
  
  // If response is already an array, use it
  if (Array.isArray(response)) {
    return response;
  }
  
  // Fallback to empty array
  return [];
}
