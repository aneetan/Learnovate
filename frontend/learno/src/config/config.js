import { jwtDecode } from "jwt-decode";

export const API_URL = 'http://localhost:8080/api';

export function getUserId(token){
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    return userId;
}

export const formatTimeTo12Hour = (timeString) => {
  if (!timeString) return 'Not specified';
  
  try {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    const hours12 = hours % 12 || 12;
    
    // Format minutes with leading zero if needed
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${hours12}:${formattedMinutes} ${period}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString; // Return original if formatting fails
  }
};