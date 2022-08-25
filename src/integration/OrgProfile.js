import { apiCAll } from './apiCall';
const validator = require("validator");

const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }


class OrgProfile {
    static #instance = state.empty;
    #client          = JSON.parse(localStorage.getItem('OrgProfile_client'))    || state.empty ;
    #constData       = JSON.parse(localStorage.getItem('OrgProfile_constData')) || state.empty ;
    #instruction     = {
        phoneNumber: {
            clause1: "  Follow this pattern +923XXXXXXXXX "
        },
        address:{
            clause1: "  Special characters are not allowed. Excepts : , # . /"
        },
        linkedin: {
            clause1: "  e.g., 'https://www.linkedin.com/in/waqar-shaiiikh/' "
        },
        aboutUs:{
            clause1: "  Maximum limit is 200 " 
        },
        hrName:{
            clause1: "  Name should be Alphabetic & Limit is 30 Character " 
        },
        website:{
            clause1: "  e.g., 'https://www.****' " 
        }
    };

    #syncCounter        = 900000 ;
    #lastSync =         JSON.parse(localStorage.getItem('OrgProfile_lastSync')) || state.empty ; //update  after 15min
    #status   =         JSON.parse(localStorage.getItem('OrgProfile_status'))   || state.empty ;

    static getOrgProfile() {
        if (this.#instance === null) {
            this.#instance = new OrgProfile();
        }
        return this.#instance;
    }

    constructor() {
        return new Promise((resolve,reject) => {
            this.UpdateClient()
            .then((check) => {
                if(check) {

                    this.#lastSync = Date.now();
                    localStorage.setItem('OrgProfile_lastSync', JSON.stringify(this.#lastSync));
                    this.#status = state.updated;
                    localStorage.setItem('OrgProfile_status', JSON.stringify(this.#status));

                }
                
                resolve(this);
            })
        })
        
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
                return  apiCAll('/api/user/profile/industry/info', 'post', { basicInfo } ).then(
                    (response) => {
                        if (response.data.isInserted) {
                            this.#client = { ...basicInfo };
                            localStorage.setItem('OrgProfile_client', JSON.stringify(this.#client));
                            this.#status = state.modified;
                            localStorage.setItem('OrgProfile_status', JSON.stringify(this.#status));
                            
                            this.#lastSync = this.#lastSync + this.#syncCounter;
                            localStorage.setItem('OrgProfile_lastSync', JSON.stringify(this.#lastSync));

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
        const {phoneNumber, address, linkedin, aboutUs, hrName, website  } = Data; 
        let Error = null;
        try {
            if (validator.isMobilePhone(phoneNumber, ['en-PK'], { strictMode: true }) === false) {
                Error = { ...Error, phoneNumber: "Invalid Mobile Number, Please follow tips <br/>" }
            }
            if((validator.isAlphanumeric(address, ['en-US'], {ignore:'-s/:/,/#/.//'}) && validator.isLength(address , {min: '10', max:'120'}))===false){
                Error = { ...Error , address : "Invalid Address, Please follow tips  <br/>" }
            }
            if(( validator.isURL(linkedin) && validator.contains( linkedin , "linkedin.com/"))===false){
                Error = { ...Error , linkedin : "Invalid linkedin URL, please follow tips  <br/>" }
            }
            if((!validator.isEmpty(aboutUs) && validator.isLength(aboutUs,{min: '1', max:'400'}))===false){
                Error = { ...Error , aboutUs : "Invalid about us data, please follow tips  <br/>" }
            }
            if((validator.isURL(website))===false){
                Error = { ...Error , website : "Invalid website URL, please follow tips  <br/>" }
            }
            if(validator.isAlpha(hrName) && validator.isLength(hrName , {min:2, max: 30})===false){
                Error = { ...Error , hrName : "Invalid HR Name, please follow tips  <br/>" }
            }
                      
            return Error===null ? null : ((Error.phoneNumber || "")+(Error.address || "") + (Error.linkedin || "") 
            + (Error.aboutUs || "") + (Error.hrName || "")+ (Error.website || "")).replaceAll('<br/>', '*\n');
        }
        catch {
            return "Something Went Wrong" 
        }
    }

    UpdateClient() {
        if ((this.#status === state.empty && this.#lastSync === state.empty) ||
            (this.#status === state.modified && this.#lastSync + this.#syncCounter <= Date.now())) {

        
            // getting data in this sequenc
            // phoneNumber address linkedin aboutUs hrName website , ...this.#constData 
            // 

            return  apiCAll('/api/user/profile/industry/info', 'get').then(
                (basicData) => {
                    this.#status = state.updated;
                    localStorage.setItem('OrgProfile_status', JSON.stringify(this.#status));

                    this.#lastSync = this.#lastSync + this.#syncCounter;
                    localStorage.setItem('OrgProfile_lastSync', JSON.stringify(this.#lastSync));
                    

                    
                    basicData = basicData.data;


                    this.#constData = {
                        CompanyName: basicData.orgName || "",
                    };
                    localStorage.setItem('OrgProfile_constData', JSON.stringify(this.#constData));

                    const profile =  {
                        phoneNumber: basicData.phoneNumber || "",
                        address: basicData.address || "",
                        linkedin: basicData.linkedin || "",
                        aboutUs: basicData.aboutUs || "",
                        hrName: basicData.hrName || "",
                        website: basicData.website || "",
                        ...this.#constData
                    };

                    localStorage.setItem('OrgProfile_client', JSON.stringify(profile));
                    this.#client = profile;
                    
                    // this.#departmentName = Api.DEPARTMENT[basicData.department];
                    return true;
                }
            )
        }
        return Promise.resolve(false);
    }

}


export { OrgProfile};
