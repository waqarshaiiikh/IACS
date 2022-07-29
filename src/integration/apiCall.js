// import { TimerSharp } from '@material-ui/icons';
// import { ThreeSixty } from '@material-ui/icons';

import axios from 'axios';

// import { ProfileData } from '../Components/ProfileData';
// import { ExperienceData } from '../Components/ProfileData';



// const skillOptions = [
//     { status: state.Add, title: "HTML" },
//     { status: state.Add, title: "CSS" },
//     { status: state.Add, title: "JavaScript" },
//     { status: state.Add, title: "React Js" },
//     { status: state.Add, title: "Python" },
//     { status: state.Add, title: "C / C++" },
//     { status: state.Add, title: "Java" },
//     { status: state.Add, title: "Web Developer" },
//     { status: state.Add, title: "React Native" },      
//     { status: state.Add, title: "MongoDB" },
//     { status: state.Add, title: "Node Js" },
//     { status: state.Add, title: "Express Js" },
//     { status: state.Add, title: "Oracle" }
// ];

// const skill = [
//     { sid: 121 , status: state.available , title: "HTML" },
//     { sid: 122 , status: state.available , title: "CSS" },
//     { sid: 123 , status: state.available , title: "JavaScript" }
// ];
// const department  = {
//     SE      :"Software Engineering                  ", 
//     CT      :"Computer Science                      ", 
//     CS      :"Computer Systems Engineering          ", 
//     CF      :"Computational Finance                 ", 
//     TC      :"Telecommunications Engineering        ", 
//     EC      :"Economics & Finance                   ", 
//     EL      :"Electronic Engineering                ", 
//     CE      :"Civil Engineering                     ", 
//     PE      :"Petroleum Engineering                 ", 
//     ME      :"Mechanical Engineering                ", 
//     TE      :"Textile Engineering                   ", 
//     IM      :"Industrial & Manufacturing Engineering", 
//     AU      :"Automotive Engineering                ", 
//     EE      :"Electrical Engineering                ", 
//     MM      :"Materials Engineering                 ", 
//     CH      :"Chemical Engineering                  ", 
//     MY      :"Metallurgical Engineering             ", 
//     PP      :"Polymer & Petrochemical Engineering   ", 
//     BM      :"Biomedical Engineering                ", 
//     FD      :"Food Engineering                      ", 
//     BArch   :"Architecture                          ", 
//     TS      :"Textile Sciences                      ", 
//     DS      :"Development Studies                   ", 
//     MG      :"Management Sciences                   ", 
//     IC      :"Industrial Chemistry                  ", 
//     AP      :"Applied Physics                       ", 
//     EG      :"English Linguistics                   ", 
// };

// const experience =[
//     { eid : 1231 , companyName : "abcd0" , jobRole : "Software Engineer", startDate : '2021-01-27T16:46:46.000Z' , endDate : '2022-06-27T16:46:46.000Z' , Description : "Description lpl Data" },
//     { eid : 1232 , companyName : "ab123" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
//     { eid : 1233 , companyName : "ab124" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
//     { eid : 1234 , companyName : "ab125" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
//     { eid : 1235 , companyName : "ab126" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" },
//     { eid : 1236 , companyName : "ab127" , jobRole : "Software Engineer", startDate : '11/10/2021' , endDate : '11/20/2021' , Description : "Description Data" }
// ];


const validator = require("validator");
const port = 8393;
axios.defaults.withCredentials = true;
const Domain = 'http://localhost:';

const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }

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

class picture {
    
    static #instance = state.empty;
    #name     = "image";
    #fd       = state.empty  ;
    #url      = state.empty  ;
    
    #syncCounter  = 900000;
    #lastSync     = state.empty   ; //update  after 15min
    #status       = state.empty;
    
    static getPicture(){
        if(this.#instance===null){
            this.#instance = new picture();
        }
        return this.#instance;
    }

    constructor(){
        return new Promise((resolve,reject) => {
            // if(this.UpdateClient()){
            //     this.#lastSync = Date.now();
            //     this.#status = state.updated;
            // }
            (this.UpdateClient()).then((check)=>{
                if(check){
                    this.#lastSync = Date.now();
                    this.#status = state.updated;
                }
                resolve(this);
            })
        });
    }

    get fd() {
        return this.#fd;
    }

    get url() {
        this.UpdateClient();
        // console.log(this.#url)
        return this.#url;
    }


    set url(pic) {

        this.#fd = new FormData();
        // const blob = new Blob([pic], { type: `${pic.type}`});
        // this.#fd.append(this.#name, pic,pic.name);
        // console.log(pic.type)
        // console.log(pic.name)
        // console.log(this.#fd.get(this.#name))
        this.#fd.append(this.#name, pic, pic.name);
        this.#url = URL.createObjectURL(this.#fd.get(this.#name))

        // if (`${this.#client}` !== `${newSkill}`) {

        //     /**
        //      * 
        //      * update Database
        //      * 
        //      */
        // }
        // const reqData = ;

        // console.log(typeof(this.#fd))
        // 'a'.repeat(50000000) ||
       

       
        

        // const response =  fetch(`${Domain}${port}/`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     body: reqData,
        //   })
        //   console.log( response)
    }

    UpdateClient() {
        if ((this.#status === state.empty && this.#lastSync === state.empty) ||
            (this.#status === state.modified && this.#lastSync + this.#syncCounter <= Date.now())) {

            this.#lastSync = this.#lastSync + this.#syncCounter;
            this.#status = state.updated;

            return axios({
                method: 'get',
                url: `${Domain}${port}/`,
                responseType: 'blob'
                // headers: { 'Content-Type': `multipart/form-data; boundary=${this.#fd._boundary}`},
                // data: this.#fd.get(this.#name)
            }).then(res => {
                // console.log(res.data)
                this.#url = URL.createObjectURL(res.data);
                return true;

                // setSrc(imageUrl);
                // return (
                //     <img src={src} alt="trial" />
                // )
            })

            /**
            * Api Call
            * for getting client skill
            * and update the client Data
            * send skill options that browser have
            */

            // this.#client    = skill;
            // const reqData =  ;
            // console.log( axios( {
            //     method: 'get',
            //     url: `${Domain}${port}/` ,
            //     responseType: 'stream'
            //   })
            //     .then(function (response) {
            //       console.log(response)
            //     } ));
        }
        return false;
    }
}

class Profile {
    static #instance = state.empty;
    #client          = state.empty || "random";
    #constData       = state.empty;
    #username        = state.empty;
    #departmentName  = state.empty;
    #instruction     = state.empty;

    #syncCounter = 900000;
    #lastSync = state.empty; //update  after 15min
    #status = state.empty;

    static getProfile() {
        if (this.#instance === null) {
            this.#instance = new Profile();
        }
        return this.#instance;
    }

    constructor() {
        // if (this.UpdateClient()) {
        //     this.#lastSync = Date.now();
        //     this.#status = state.updated;
        // }
        return new Promise((resolve,reject) => {

            this.UpdateClient()
            .then((check) => {
                if(check) {
                    this.#lastSync = Date.now();
                    this.#status = state.updated;
                }
                this.#instruction = {
                    enrollment: {
                        clause1: "  Follow this pattern 'NED/XXXX/XXXX' "
                    },
                    phoneNumber: {
                        clause1: "  Follow this pattern +923XXXXXXXXX "
                    },
                    cgpa: {
                        clause1: "  In Between 1 to 4"
                    },
                    address:{
                        clause1: "  Special characters are not allowed. Excepts : , # . /"
                    },
                    github: {
                        clause1: "  e.g., 'https://github.com/waqarshaiiikh' "
                    },
                    linkedin: {
                        clause1: "  e.g., 'https://www.linkedin.com/in/waqar-shaiiikh/' "
                    },
                    aboutUs:{
                        clause1: "  Maximum limit is 400 " 
                    }
                };
                resolve(this);
            })
        })
        
    }

    get username(){

        return this.#username;
    }

    get departmentName(){
        return this.#departmentName;
    }

    get instruction(){
        return  this.#instruction;
    }

    get client() {
    //    console.log(this.UpdateClient(), this.#client)
        this.UpdateClient()
        return this.#client;

    }

    setclient(basicInfo) {
        
        basicInfo = {
            ...basicInfo,
            ...this.#constData
        };
      
        if(this.checkChanges(basicInfo)){

            const error = this.DataVaidation(basicInfo);

            if(error === null){


                return  apiCAll('/api/user/profile/info', 'post', { basicInfo } ).then(
                    (response) => {
                        if (response.data.isInserted) {

                            console.log(response);
                            this.#client = { ...basicInfo };
                            this.#status = state.modified;
                            this.#lastSync = this.#lastSync + this.#syncCounter;
                            return null;
                        }    
                    }
                ).catch((e)=>{
                    console.log(e)
                })
            }    

            return new Promise((resolve, reject) => {
                resolve( error);
            })

        } else {
            return new Promise((resolve, reject) => {
                resolve( null);
            })
        }

        // if (`${this.#client}` !== `${basicInfo}`) {
            
            //     let skills = this.checkChanges(basicInfo);
            //     /**
            //      * 
            //      * update Database
        //      * 
        //      */
        //     let omitedSkill = [];
        //     skills.forEach((value) => { omitedSkill = (value.status !== state.deleted) ? [{ ...value }, ...omitedSkill] : omitedSkill });
        //     this.#client = omitedSkill;
        //     this.#status = state.modified;
        // }
        
    }

    checkChanges(basicInfo) {
        if (JSON.stringify(this.#client) !== JSON.stringify(basicInfo) ){
            return true
        }
        else{
            return false
        }
    }



    DataVaidation(Data) {
        const {phoneNumber, enrollment, department, year, semester, CGPA, DOB, gender, address, linkedin, github, aboutUs } = Data; 
        let Error = null;
        try {
            if (validator.isMobilePhone(phoneNumber, ['en-PK'], { strictMode: true }) === false) {
                Error = { ...Error, phoneNumber: "Invalid Mobile Number, Please follow tips <br/>" }
            }
            if ((validator.contains(enrollment, '/', { ignoreCase: false, minOccurrences: 2 })
                && validator.contains(enrollment, 'NED/', { ignoreCase: true, minOccurrences: 1 })
                && validator.isLength(enrollment, { min: 13, max: undefined })) === false) {
                Error = { ...Error, enrollment: "Invalid Enrollnment No: <br/>" }
            }
            if(validator.isEmpty(department)){
                Error = { ...Error, department: "Please select Department <br/>" }   
            }
            if(validator.isEmpty(year)){
                Error = { ...Error, year: "Please select Year <br/>" }   
                
            }
            if(validator.isEmpty(semester)){
                Error = { ...Error, semester: "Please select Semester <br/>" }   
            }
            if ((validator.isFloat(CGPA, { min: '1.0', max: '4.0' })) === false) {
                Error = { ...Error, CGPA: "Invalid CGPA <br/>" }
            }
            if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(DOB))
            {
                Error = {...Error, DOB: "Invalid Date of Birth <br/>" }
            }                 
            if (validator.isEmpty(gender)) {
                Error = { ...Error, gender: "Please select Gender <br/>" }
            }
            if((validator.isAlphanumeric(address, ['en-US'], {ignore:'-s/:/,/#/.//'}) && validator.isLength(address , {min: '10', max:'120'}))===false){
                Error = { ...Error , address : "Invalid Address, Please follow tips  <br/>" }
            }
            if(( validator.isURL(linkedin) && validator.contains( linkedin , "https://www.linkedin.com/"))===false){
                Error = { ...Error , linkedin : "Invalid linkedin URL, please follow tips  <br/>" }
            }
            if((validator.isURL(github) && validator.contains(github , "https://github.com/"))===false){
                Error = { ...Error , github : "Invalid github URL, please follow tips  <br/>" }
            }
            if((!validator.isEmpty(aboutUs) && validator.isLength(aboutUs,{min: '1', max:'400'}))===false){
                Error = { ...Error , aboutUs : "Invalid about us data, It's not optional  please follow tips  <br/>" }
            }

            
            return Error===null ? null : ((Error.phoneNumber || "") + (Error.enrollment || "") + (Error.department || "") + (Error.year || "") + (Error.semester || "") 
                + (Error.CGPA || "") + (Error.gender || "") + (Error.DOB || "") + (Error.address || "") + (Error.linkedin || "") + (Error.github || "")
                + (Error.aboutUs || "")).replaceAll('<br/>', '*\n');
        }
        catch {
            return "Something Went Wrong" 
        }
    }

    UpdateClient() {
        if ((this.#status === state.empty && this.#lastSync === state.empty) ||
            (this.#status === state.modified && this.#lastSync + this.#syncCounter <= Date.now())) {

                
                this.#status = state.updated;
                this.#lastSync = this.#lastSync + this.#syncCounter;

            /**
            * Api Call
            * for getting client info
            * and update the client Data
            */

            //  basicData = {
            //     email: "waqar4106080@cloud.neduet.edu.pk",
            //     clientName : 'student',
            //     fname: 'Muhammad',
            //     lname:'Waqar',
            //     phoneNumber : '+923423446805',
            //     enrollment: 'NED/1481/2018',
            //     university: "NED University",
            //     department: 'SE', 
            //     CGPA: "2.78",
            //     semester: '2',
            //     // address:  'HJJJJJJJJJ'   , //GFF
            //     // github:      'https://github.com/waqarshaiiikh',//GFF
            //     // linkedin:    'https://www.linkedin.com/in/waqar-shaiiikh/' ,//GFF
            //     year:"4",
            //     // aboutUs :` , ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellat autem voluptate error aspernatur quasi laborum est minus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellat autem voluptate error aspernatur quasi laborum est minus. `
            // }

            return  apiCAll('/api/user/profile/info', 'get').then(
                (basicData) => {
                    basicData = basicData.data;

                    this.#constData = {
                        fname: basicData.fname || "",
                        lname: basicData.lname || "",
                        email: basicData.email || "",
                        university: basicData.university || "",
                    };
                    
                    this.#client = {
                        phoneNumber: basicData.phoneNumber || "",
                        enrollment: basicData.enrollment || "",
                        department: basicData.department || "",
                        year: basicData.year || "",
                        semester: basicData.semester || "",
                        CGPA: basicData.CGPA || "",
                        DOB: basicData.DOB || "null",
                        gender: basicData.gender || "",
                        address: basicData.address || "",
                        github: basicData.github || "",
                        linkedin: basicData.linkedin || "",
                        aboutUs: basicData.aboutUs || "",
                        ...this.#constData
                    };

                    
                    this.#username = `${basicData.fname} ${basicData.lname}`;
                    this.#departmentName = Api.DEPARTMENT[basicData.department];
                    
                    // console.log(this.#client)
                    
                    // this.#status = state.updated;
                    // this.#lastSync = this.#lastSync + this.#syncCounter;
                    return true;

                    /***
                     *
                     * getting data in this sequence
                     phoneNumber  
                     enrollment   
                     department   
                     year         
                     semester     
                     CGPA         
                     DOB
                     gender       
                     address      
                     github       
                     linkedin     
                     aboutUs      
                     ...this.#constData
                     */

                }
            )
        }
        return false
    }

}

class Skill {
    
    static #instance = state.empty;
    #client   = state.empty  ;
    #options  = state.empty  ;

    #syncCounter  = 15*60*1000;
    #lastSync = state.empty   ; //update  after 15min
    #status   = state.empty;
    
    static getSkill(){
        if(this.#instance===null){
            this.#instance = new Skill();
        }
        return this.#instance;
    }

    constructor() {

        this.UpdateOptions()
            .then((checked) => {
                // console.log("option updattion status" + checked);
                this.UpdateClient().then(
                    (checked) => {
                        if (checked) {
                            this.#lastSync = Date.now();
                            this.#status = state.updated;
                        }
                    }
                )

            });
    }

    get options(){
        this.UpdateOptions();
        return this.#options;
    }

    get client(){
        this.UpdateClient();
        return new Promise((resolve,reject)=>{
            resolve( this.#client);
        });
    }

    set client(newSkill){

        // if (JSON.stringify(this.#client) !== JSON.stringify(newSkill) ){
            
        if (`${this.#client}` !== `${newSkill}`) {
            
            let skills = this.normalizeSkill(newSkill);

            apiCAll('/api/user/profile/stdSkills', 'post',{skills}).then(
                (skillsUpdation) => {
                    if( skillsUpdation.isUpdated){
                        let omitedSkill = [];
                        skills.forEach((value)=> {omitedSkill = (value.status !== state.deleted) ? [ { ...value } , ...omitedSkill] : omitedSkill} );
                        this.#client = omitedSkill;
                        this.#status = state.modified;
                    }
                    // console.log(skillOptions, this.#options);
                    // this.#status = state.updated;
                    // this.#lastSync = this.#lastSync + this.#syncCounter;
                }
            )

            /**
             * 
             * update Database
             * 
             */
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
        if ((this.#status === state.empty && this.#lastSync === state.empty) ||
            (this.#status === state.modified && this.#lastSync + this.#syncCounter <= Date.now())) {

            this.#lastSync = this.#lastSync + this.#syncCounter;
            this.#status = state.updated;
            /**
            * Api Call
            * for getting client skill
            * and update the client Data
            * send skill options that browser have
            */
            return apiCAll('/api/user/profile/stdSkills', 'get').then(
                (skillOptions) => {
                    this.#client = skillOptions.data || [{ tittle: null }];
                    // console.log(skillOptions, this.#options);
                    // this.#status = state.updated;
                    // this.#lastSync = this.#lastSync + this.#syncCounter;
                    return true;
                }
            )
        }
        return new Promise((resolve,reject)=>{
            resolve( false);
        });
    }
    // console.log((this.#lastSync + this.#syncCounter), Date.now(), this.#lastSync + this.#syncCounter <= Date.now() )
    
    UpdateOptions(){
        
        // if( ( this.#status === state.empty && this.#lastSync === state.empty) || this.#lastSync + this.#syncCounter <= Date.now() )
        if( this.#options === state.empty )
        { 
            // this.#lastSync = this.#lastSync + this.#syncCounter;
            /**
            * sends current status of options  
            * initially {options: null}
            * second time is {options: "updated"}
            */
             return  apiCAll('/api/user/profile/skillOption', 'get').then(
                (skillOptions) => {
                    this.#options = skillOptions.data || [{ tittle: null }];   
                    // console.log(skillOptions,this.#options);
                    // this.#status = state.updated;
                    // this.#lastSync = this.#lastSync + this.#syncCounter;
                    return true;
                }
            )
        }
        return false;
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

        (this.UpdateClient()).then((check)=>
        {if (check) {
            this.#lastSync = Date.now();
            this.#status = state.updated;
        }})
    }

    set client(exp){// add experience


        //check already exist. 
        const already = this.#client.some((value) => {
            if(exp.companyName === value.companyName && exp.jobRole === value.jobRole && exp.startDate === value.startDate && exp.endDate === value.endDate){
                return true;
            }
        }); 

        if (!already) {
    
            // const eid = this.#client.length+1;
            let eid = 0;
            this.#client.forEach((exp)=>{
                if(exp.eid > eid ){
                    eid = exp.eid;
                }
            });
            const experience = {eid: eid+1, companyName: exp.companyName, jobRole: exp.jobRole, startDate: exp.startDate, endDate: exp.endDate, Description: exp.Description };

            apiCAll('/api/user/profile/stdExperience', 'post',{experience}).then(
                (check) => {
                    if(check.data.isInserted){
                        this.#client.push(exp)
                        this.#status = state.modified;
                    }
                }
            )

        }
    }

    remove(exp) {// remove experience

        // send removation query to backend 
        // if backend return ture (that means inserted)
        apiCAll('/api/user/profile/remove/stdExperience', 'post', { experience: exp }).then(
            (check) => {
                if (check.data.isDELETED) {
                    this.#status = state.modified;
                    let newExperience = [];
                    this.#client.forEach((value, index, array) => {
                        if (!(exp.eid === value.eid)) {
                            newExperience.push(array[index])
                        }
                    }
                    );
                    this.#client = newExperience;
                }
            }
        )

        if (true) {
            let newExperience = [];
            this.#client.forEach((value, index, array) => {

                if (!(exp.eid === value.eid)) {
                    newExperience.push(array[index])  
                }
            }
            );

            this.#client = newExperience;
        }

    }

    modify(exp) {//modify
        (this.#client).some((value, i) => {

            console.log(exp)
            if (value.eid === exp.eid) {
                if (!(exp.companyName === value.companyName && exp.jobRole === value.jobRole && exp.startDate === value.startDate && exp.endDate === value.endDate && exp.Description === value.Description)) {
                    /***
                     * exp is a updated experience
                     * call updated experience api from backend
                     * that return true
                     */
                    apiCAll('/api/user/profile/modify/stdExperience', 'post',{experience: exp}).then(
                        (check) => {
                            if(check.data.isUpdated){
                                this.#client[i] = exp;
                                this.#status = state.modified;
                            }
                        }
                        )
                    }
                    return true;
            }
        })

    }

    get client(){
        return new Promise((resolve,reject)=>{
            this.UpdateClient();
            resolve(this.#client)
        })
    }


    UpdateClient() {

        return new Promise((resolve, reject) => {


            if ((this.#status === state.empty && this.#lastSync === state.empty) ||
                (this.#status === state.modified && this.#lastSync <= Date.now())) {
                 apiCAll('/api/user/profile/stdExperience', 'get').then(
                    (experience) => {
                        console.log(experience.data)
                        this.#client = experience.data;
                         this.#status = state.updated;
                         this.#lastSync = this.#lastSync + this.#syncCounter;
                         resolve(true);
                    }
                )
            }
            resolve(false);
        });
    }
}

class Api{
    // #status = "synched";
    static #instance = null;

    #experience = Experience.getExperience();
    #skill      = Skill.getSkill(); 
    #profile    = Profile.getProfile();
    #picture    = picture.getPicture();
    

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
        return Promise.resolve(this.#skill)
    }

    get experience(){
        return Promise.resolve(this.#experience);        
    }
    
    get profile(){
        return this.#profile;
    }

    get picture(){

        return this.#picture;
    }

}


export {apiCAll, Api, state}