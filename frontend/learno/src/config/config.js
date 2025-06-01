import { jwtDecode } from "jwt-decode";

export const API_URL = 'http://localhost:8080/api';

export function getUserId(token){
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    return userId;

}