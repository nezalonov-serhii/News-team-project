import axios from "axios";

const KEY = 'api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO';
const BASE_URL = 'https://api.nytimes.com/svc';

export async function newsSearch() { 
    const response = axios.get(`${BASE_URL}?key=${KEY}`);
    return await response;
      
  }