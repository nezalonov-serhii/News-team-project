const KEY = 'api-key=Z00b2slf3ZsaEzZO55XflcVUrAbznmza';
const BASE_URL = 'https://api.nytimes.com/svc';
const POPULAR_NEWS = `${BASE_URL}/mostpopular/v2/viewed/1.json?${KEY}`;


// https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Z00b2slf3ZsaEzZO55XflcVUrAbznmza

async function getPopular(){
    const articleFetch = await fetch(
        `${BASE_URL}/mostpopular/v2/viewed/1.json?${KEY}`
          );

          if(articleFetch.ok){
            const popular = await articleFetch.json();
            return popular.results;
          }
          throw new Error(articleFetch.statusText);
        }

        
export default { getPopular };