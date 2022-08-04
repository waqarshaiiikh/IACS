
import { Api, apiCAll } from './apiCall';
const validator = require("validator");

const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }


class Profile {
    static #instance = state.empty;
    #client          = JSON.parse(localStorage.getItem('Profile_client'))    || state.empty ;
    #constData       = JSON.parse(localStorage.getItem('Profile_constData')) || state.empty ;
    #instruction     = {
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
            clause1: "  Maximum limit is 200 " 
        }
    };

    #syncCounter        = 900000 ;
    #lastSync =         JSON.parse(localStorage.getItem('Profile_lastSync')) || state.empty ; //update  after 15min
    #status   =         JSON.parse(localStorage.getItem('Profile_status'))   || state.empty ;

    static getProfile() {
        if (this.#instance === null) {
            this.#instance = new Profile();
        }
        return this.#instance;
    }

    constructor() {
        return new Promise((resolve,reject) => {
            this.UpdateClient()
            .then((check) => {
                if(check) {

                    this.#lastSync = Date.now();
                    localStorage.setItem('Profile_lastSync', JSON.stringify(this.#lastSync));
                    this.#status = state.updated;
                    localStorage.setItem('Profile_status', JSON.stringify(this.#status));

                }
                
                resolve(this);
            })
        })
        
    }

    getUsername(basicData){
        return `${basicData.fname} ${basicData.lname}`;
    }

    getDepartmentName(DpN){
        // this.#departmentName = Api.DEPARTMENT[DpN];
        return  Api.DEPARTMENT[DpN];
    }

    get instruction(){
        return  this.#instruction;
    }

    get client() {
    //    console.log(this.UpdateClient(), this.#client)
        return this.UpdateClient().then(()=>{
            return this.#client;
        })

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
                            this.#client = { ...basicInfo };
                            localStorage.setItem('Profile_client', JSON.stringify(this.#client));
                            this.#status = state.modified;
                            localStorage.setItem('Profile_status', JSON.stringify(this.#status));
                            
                            this.#lastSync = this.#lastSync + this.#syncCounter;
                            localStorage.setItem('Profile_lastSync', JSON.stringify(this.#lastSync));

                            return null;
                        }    
                    }
                ).catch((e)=>{
                    console.log(e)
                })
            }    

            return Promise.resolve(error);

        } else {
            return Promise.resolve(null);
        }
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

        
            // getting data in this sequenc
            // phoneNumber  enrollment   department year   semester  CGPA   DOBgender  address github  linkedin aboutUs  ...this.#constData


            return  apiCAll('/api/user/profile/info', 'get').then(
                (basicData) => {
                    this.#status = state.updated;
                    localStorage.setItem('Profile_status', JSON.stringify(this.#status));

                    this.#lastSync = this.#lastSync + this.#syncCounter;
                    localStorage.setItem('Profile_lastSync', JSON.stringify(this.#lastSync));
                    

                    basicData = basicData.data;

                    this.#constData = {
                        fname: basicData.fname || "",
                        lname: basicData.lname || "",
                        email: basicData.email || "",
                        university: basicData.university || "",
                    };
                    localStorage.setItem('Profile_constData', JSON.stringify(this.#constData));

                    const profile =  {
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

                    localStorage.setItem('Profile_client', JSON.stringify(profile));
                    this.#client = profile;
                    
                    // this.#departmentName = Api.DEPARTMENT[basicData.department];
                    return true;
                }
            )
        }
        return Promise.resolve(false);
    }

}


export { Profile};
