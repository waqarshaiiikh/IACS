import axios from 'axios';

const port = 8393;
axios.defaults.withCredentials = true;
const Domain = 'http://localhost:';



const apiCAll=(apiAddress, reqData = 'unknown' )=>{

    if(apiAddress === '/api/login'||apiAddress ===  '/api/signup'){
        
        return axios.post(`${Domain}${port}${apiAddress}`
        ,{ ...reqData }
        ,{
            headers: {  'Content-Type': 'application/json' }
        }
        ,{
                withCredentials: true,
        }
        );
    }
    else if(apiAddress === '/api/logout'||'/api/logout/all'){
        return axios.get(`${Domain}${port}${apiAddress}`
        ,{
            headers: {  'Content-Type': 'application/json' }
        }
        ,{
                withCredentials: true,
        }
        )
    }
}



export default apiCAll;