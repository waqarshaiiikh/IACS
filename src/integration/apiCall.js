import axios from 'axios';
import { picture } from './picture';
import { Profile } from './Profile';
import { Skill } from './Skill';
import { Services } from './Services';
import { Experience } from './Experience';
const  { OrgProfile }  = require('./OrgProfile');

const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }

const port = process.env.REACT_APP_PORT
axios.defaults.withCredentials = true;
const Domain = `${process.env.REACT_APP_IP}:`;


const apiJson =async (apiAddress)=>{

    const port = 3001;
    
        return await axios.get(`${Domain}${port}${apiAddress}`
            // , { headers: { 'Content-Type': 'application/json' } }
            // , { withCredentials: true }
        ).catch(e => {
            console.log({authentication: e?.response?.data?.authentication});
            if(e?.response?.data?.authentication ===false && e?.response?.status === 401){
                localStorage.clear();
                // navigate("/")
                // window.location.href = "/";
                // window.location.href = "/";
            }
            throw e;
        });
}



const apiCAll=async (apiAddress, reqMethod="post" , reqData = 'unknown')=>{

    // console.log(process.env.REACT_APP_IP +':'+port)
    if(reqMethod === "post"){
        return axios[reqMethod](`${Domain}${port}${apiAddress}`
        ,{ ...reqData }
        ,{
            headers: {  'Content-Type': 'application/json' }
        }
        ,{
                withCredentials: true,
        },{
            requestType: 'stream'
        }
        ).catch(e => {
            // console.log({authentication: e?.response?.data?.authentication});
            if(e?.response?.data?.authentication ===false && e?.response?.status === 401){
                localStorage.clear();
                // navigate("/")
                // window.location.href = "/";
                // window.location.href = "/";
            }
            throw e;
        });
        
    }
    else if(reqMethod === "get"){
        return await axios[reqMethod](`${Domain}${port}${apiAddress}`
            , { headers: { 'Content-Type': 'application/json' } }
            , { withCredentials: true }
        ).catch(e => {
            console.log({authentication: e?.response?.data?.authentication});
            if(e?.response?.data?.authentication ===false && e?.response?.status === 401){
                localStorage.clear();
                // navigate("/")
                window.location.href = "/";
                window.location.href = "/";
            }
            throw e;
        });
    }
}


class Api{
    // #status = "synched";
    static #instance = null;

    #experience = state.empty;
    #skill      = state.empty; 
    #profile    = state.empty;
    #orgProfile = state.empty;
    #picture    = state.empty;
    #service    = state.empty;

    static DEPARTMENT = {
        SE      :"Software Engineering                  ", 
        CT      :"Computer Science                      ", 
        CS      :"Computer Systems Engineering          ", 
        CF      :"Computational Finance                 ", 
        TC      :"Telecommunications Engineering        ", 
        EC      :"Economics & Finance                   ", 
        EL      :"Electronic Engineering                ", 
        CE      :"Civil Engineering                     ", 
        PE      :"Petroleum Engineering                 ", 
        ME      :"Mechanical Engineering                ", 
        TE      :"Textile Engineering                   ", 
        IM      :"Industrial & Manufacturing Engineering", 
        AU      :"Automotive Engineering                ", 
        EE      :"Electrical Engineering                ", 
        MM      :"Materials Engineering                 ", 
        CH      :"Chemical Engineering                  ", 
        MY      :"Metallurgical Engineering             ", 
        PP      :"Polymer & Petrochemical Engineering   ", 
        BM      :"Biomedical Engineering                ", 
        FD      :"Food Engineering                      ", 
        BArch   :"Architecture                          ", 
        TS      :"Textile Sciences                      ", 
        DS      :"Development Studies                   ", 
        MG      :"Management Sciences                   ", 
        IC      :"Industrial Chemistry                  ", 
        AP      :"Applied Physics                       ", 
        EG      :"English Linguistics                   ", 
    };
    
    static getApi(){
        
        if(this.#instance===null){
            this.#instance = new Api();
        }
        return this.#instance;
    }
    
    constructor(){
        return(this);
    }
    
    get skill(){
        if(this.#skill===null){
            this.#skill = Skill.getSkill();
        }
        console.log("skill getted")
        return Promise.resolve(this.#skill)
    }

    get service(){
        if(this.#service===null){
            this.#service = Services.getService();
        }
        console.log("Services getted")
        return Promise.resolve(this.#service)
    }

    get experience(){
        if(this.#experience===null){
            this.#experience = Experience.getExperience();
        }
        console.log("experience getted")
        return Promise.resolve(this.#experience);        
    }
    
    get profile(){
        if(this.#profile===null){
            this.#profile = Profile.getProfile();
        }
        console.log("profile getted")

        return this.#profile;
    }
    
    get orgProfile(){
        if(this.#orgProfile===null){
            this.#orgProfile = OrgProfile.getOrgProfile();
        }
        console.log("profile getted")

        return this.#orgProfile;
    }

     

    get picture(){
        if(this.#picture===null){
            this.#picture = picture.getPicture();
        }
        console.log("picture getted")
        return Promise.resolve(this.#picture);        
    }

}


export {apiCAll, apiJson , Api, state}