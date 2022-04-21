import axios from 'axios';

const port = 8393;
axios.defaults.withCredentials = true;
const Domain = 'http://localhost:';


const apiCAll=(apiAddress, reqMethod="post" , reqData = 'unknown')=>{

    if(reqMethod === "post"){
        return axios[reqMethod](`${Domain}${port}${apiAddress}`
        ,{ ...reqData }
        ,{
            headers: {  'Content-Type': 'application/json' }
        }
        ,{
                withCredentials: true,
        }
        );
    }
    else if(reqMethod === "get"){
        return axios[reqMethod](`${Domain}${port}${apiAddress}`
        , { headers: {  'Content-Type': 'application/json' } }
        , {withCredentials: true })
    }

}



export default apiCAll;