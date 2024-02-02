/**
 * Prepare header options for our API calls
 */
var myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")

export default myHeaders

export const API_URL="http://127.0.0.1:8000/api/v1/"