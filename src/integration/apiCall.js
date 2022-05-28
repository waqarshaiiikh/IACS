// import { TimerSharp } from '@material-ui/icons';
import axios from 'axios';
// import { ExperienceData } from '../Components/ProfileData';

const port = 8393;
axios.defaults.withCredentials = true;
const Domain = 'http://localhost:';

const state = {updated : "updated", modified : "modified", empty: null, available:"available", deleted:"deleted", deletedAll:"deletedAll", Add: "added"}

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

const experience =[
    { eid : 1231 , companyName : "abcd0" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
    { eid : 1232 , companyName : "ab123" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
    { eid : 1233 , companyName : "ab124" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
    { eid : 1234 , companyName : "ab125" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
    { eid : 1235 , companyName : "ab126" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
    { eid : 1236 , companyName : "ab127" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" }
];

const skillOptions = [
    { status: state.Add, title: "HTML" },
    { status: state.Add, title: "CSS" },
    { status: state.Add, title: "JavaScript" },
    { status: state.Add, title: "React Js" },
    { status: state.Add, title: "Python" },
    { status: state.Add, title: "C / C++" },
    { status: state.Add, title: "Java" },
    { status: state.Add, title: "Web Developer" },
    { status: state.Add, title: "React Native" },      
    { status: state.Add, title: "MongoDB" },
    { status: state.Add, title: "Node Js" },
    { status: state.Add, title: "Express Js" },
    { status: state.Add, title: "Oracle" }
];

const skill = [
    { sid: 121 , status: state.available , title: "HTML" },
    { sid: 122 , status: state.available , title: "CSS" },
    { sid: 123 , status: state.available , title: "JavaScript" }
];


class Skill {
    
    static #instance = state.empty;
    #client   = state.empty  ;
    #options  = state.empty  ;

    #syncCounter  = 900000;
    #lastSync = state.empty   ; //update  after 15min
    #status   = state.empty;
    
    static getSkill(){
        if(this.#instance===null){
            this.#instance = new Skill();
        }
        return this.#instance;
    }

    constructor(){
        if(this.UpdateClient() && this.UpdateOptions()){
            this.#lastSync = Date.now();
            this.#status = state.updated;
        }
    }

    get options(){
        this.UpdateOptions();
        return this.#options;
    }

    get client(){
        this.UpdateClient();
        return this.#client;
    }

    set client(newSkill){

        // if (JSON.stringify(this.#client) !== JSON.stringify(newSkill) ){
        if (`${this.#client}` !== `${newSkill}`) {
            
            let skills = this.normalizeSkill(newSkill);
            /**
             * 
             * update Database
             * 
             */
            let omitedSkill = [];
            skills.forEach((value)=> {omitedSkill = (value.status !== state.deleted) ? [ { ...value } , ...omitedSkill] : omitedSkill} );
            this.#client = omitedSkill;
            this.#status = state.modified;
        }
    }


    normalizeSkill(newSkill) {

        let oldSkill = this.#client;

        oldSkill.forEach((oSkill) => {
            let check =
                newSkill.some((nSklll, i) => {
                    if (oSkill.title === nSklll.title) {
                        if (nSklll.status === state.Add) 
                            newSkill[i].status = state.available;
                        return true
                    }
                });
            if (!check) {
                oSkill.status = state.deleted;
                newSkill = [{ ...oSkill }, ...newSkill];
            }
        })
        return newSkill;
    }

    UpdateClient(){
        if( ( this.#status === state.empty     &&    this.#lastSync === state.empty ) ||
            ( this.#status === state.modified  &&    this.#lastSync + this.#syncCounter <= Date.now()   )    )
        { 
            /**
            * Api Call
            * for getting client skill
            * and update the client Data
            * send skill options that browser have
            */
           
            this.#lastSync = this.#lastSync + this.#syncCounter;
            this.#client  = skill;
            this.#status   = state.updated;
        }
        return true;
    }
    // console.log((this.#lastSync + this.#syncCounter), Date.now(), this.#lastSync + this.#syncCounter <= Date.now() )
    
    UpdateOptions(){
        
        if( ( this.#status === state.empty && this.#lastSync === state.empty) || this.#lastSync + this.#syncCounter <= Date.now() )
        { 

            /**
            * sends current status of options  
            * initially {options: null}
            * second time is {options: "updated"}
            */
            this.#lastSync = this.#lastSync + this.#syncCounter;
            this.#options =  skillOptions || [{tittle:null}];   

        }
        return true;
    }

}


class Experience {
    
    static #instance = state.empty;
    #client   = state.empty ;

    #syncCounter  = 900000 ;
    #lastSync = state.empty; //update  after 15min
    #status   = state.empty;
    
    static getExperience(){
        if(this.#instance=== state.empty){
            this.#instance = new Experience();
        }
        return this.#instance;
    }

    constructor(){

            if(this.UpdateClient()){
                
                this.#lastSync = Date.now();
                this.#status   = state.updated;
            }
    }

    set client(exp){// add experience


        //check already exist. 
        const already = this.#client.some((value) => {
            if(exp.companyName === value.companyName && exp.jobRole === value.jobRole && exp.startDate === value.startDate && exp.endDate === value.endDate){
                return true;
            }
        });

        if (!already) {
            // send addition query to backend 
            // if backend return ture (that means inserted)

            if (true)
                this.#client.push(exp);

        }
    }

    remove(exp) {// remove experience

        // send removation query to backend 
        // if backend return ture (that means inserted)
        if (true) {
            let newExperience = [];
            this.#client.forEach((value, index, array) => {

                if (!(exp.companyName === value.companyName && exp.jobRole === value.jobRole && exp.startDate === value.startDate && exp.endDate === value.endDate)) {
                    newExperience.push(array[index])
                    
                }
            }
            );

            this.#client = newExperience;
        }

    }

    modify(exp){//modify
        /***
         * exp is a updated experience
         * call updated experience api from backend
         * that return true
         */

        if (true) { // if updated successfuly
            this.#client.some((value, i) => {
                if (value.eid === exp.eid) {
                    if (!(exp.companyName === value.companyName && exp.jobRole === value.jobRole && exp.startDate === value.startDate && exp.endDate === value.endDate && exp.Description === value.Description ) ) {
                        this.#client[i] = exp;
                    }
                    return true;
                }
            }
            )
        }


    }

    get client(){
        this.UpdateClient();
        return this.#client;
    }


    UpdateClient(){

        if(( this.#status === state.empty && this.#lastSync === state.empty) ||
           ( this.#status === state.modified  && this.#lastSync <= Date.now()))
        { 
            /**
             * Api Call
             * for getting client skill
             * and update the client Data
             * send skill options that browser have
             */
            this.#client   = experience;
            this.#status   = state.updated;
            this.#lastSync = this.#lastSync + this.#syncCounter;
        }
        return true;
    }
    
}


class Api{
    // #status = "synched";
    static #instance = null;

    #experience = Experience.getExperience();
    #skill      = Skill.getSkill(); 
    

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
        return this.#skill;
    }

    get experience(){
        return this.#experience;
    }
}




export {apiCAll, Api, state}