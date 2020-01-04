export async function handleResponse(response) {
  if (response.ok) return response.json();
  else {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
