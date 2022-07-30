import axios from 'axios';
import { picture } from './picture';
import { Profile } from './Profile';
import { Skill } from './Skill';
const {Experience}  = require('./Experience');

const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }

const port = 8393;
axios.defaults.withCredentials = true;
const Domain = 'http://localhost:';

const apiCAll=async (apiAddress, reqMethod="post" , reqData = 'unknown')=>{

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
        );
    }
    else if(reqMethod === "get"){
        return await axios[reqMethod](`${Domain}${port}${apiAddress}`
        , { headers: {  'Content-Type': 'application/json' } }
        , {withCredentials: true })
    }
}


class Api{
    // #status = "synched";
    static #instance = null;

    #experience = state.empty;
    #skill      = state.empty; 
    #profile    = state.empty;
    #picture    = state.empty;
    

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
        // this.#Experience.client = experience;
        // this.#Skill.client = skill;    
    }
    
    get skill(){
        if(this.#skill===null){
            this.#skill = Skill.getSkill();
        }
        console.log("skill getted")
        return Promise.resolve(this.#skill)
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

    get picture(){
        if(this.#picture===null){
            this.#picture = picture.getPicture();
        }
        console.log("picture getted")
        return Promise.resolve(this.#picture);        
    }

}


export {apiCAll, Api, state}