import { http } from './config'

export const api = {
    get:(endpoint) => {   
        return http.get(endpoint);           
    },

    post:(endpoint, body) => { 
        return http.post(endpoint, body);        
    }
  }