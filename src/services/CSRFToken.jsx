import { useEffect, useState } from "react";
import axios from 'axios';
import { webApi } from "../api";

function CSRFToken() {
    const [csrftoken, setCSRFToken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();      
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
 useEffect(() => {
      const fetchData = async () => {
      try {
        await axios.get(`${webApi}/api/csrf/`)
        console.log('http',webApi);
      } catch (error) {
        
      }
      };
      fetchData();
      setCSRFToken(getCookie('csrftoken'));
    }, []);

    return(
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
    )
}
export default CSRFToken;