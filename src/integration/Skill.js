
import { apiCAll } from './apiCall';
const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }
class Skill {
    static #instance = state.empty;
    #client           = JSON.parse(localStorage.getItem('Skill_client'))  || state.empty  ;
    #options          = JSON.parse(localStorage.getItem('Skill_options')) || state.empty ; 
    #syncCounter      = 15*60*1000;
    #lastSync         = JSON.parse(localStorage.getItem('Skill_lastSync')) || state.empty ; //update  after 15min
    #status           = JSON.parse(localStorage.getItem('Skill_status')) || state.empty ; 
    
    static getSkill(){
        if(this.#instance===null){
            this.#instance = new Skill();
        }
        return this.#instance;
    }

    constructor() {

        return new Promise((resolve,reject) => {

            this.UpdateOptions()
                .then((checked) => {
                    // console.log("option updattion status" + checked);
                    this.UpdateClient().then(
                        (checked) => {
                            if (checked) {
                                this.#lastSync = Date.now();
                                localStorage.setItem('Skill_lastSync', JSON.stringify(this.#lastSync));

                                this.#status = state.updated;
                                localStorage.setItem('Skill_status', JSON.stringify(this.#status));

                                resolve(this);
                            }
                            else{
                                resolve(this)
                            }
                        }
                    )
                });
        });
    }

    get options(){
        return this.UpdateOptions().then(()=>{
            return this.#options;
        });
    }

    get client(){
        
        return this.UpdateClient().then(()=>{
            return this.#client;
        });
        
    }

    setClient(newSkill){

        // if (JSON.stringify(this.#client) !== JSON.stringify(newSkill) ){
        return new Promise((resolve, reject) => {

            if (`${this.#client}` !== `${newSkill}`) {

                let skills = this.normalizeSkill(newSkill);

                apiCAll('/api/user/profile/stdSkills', 'post', { skills }).then(
                    (skillsUpdation) => {
                        if (skillsUpdation.data.isUpdated) {
                            let omitedSkill = [];
                            skills.forEach((value) => { omitedSkill = (value.status !== state.deleted) ? [{ ...value }, ...omitedSkill] : omitedSkill });
                            this.#client = omitedSkill;
                            localStorage.setItem('Skill_client', JSON.stringify(this.#client));

                            this.#status = state.modified;
                            localStorage.setItem('Skill_status', JSON.stringify(this.#status));
                            
                            resolve(true)
                        }
                        else{
                            resolve(false)
                        }
                        // console.log(skillOptions, this.#options);
                        // this.#status = state.updated;
                        // this.#lastSync = this.#lastSync + this.#syncCounter;
                    }
                )
            }
        });
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

            
            /**
            * Api Call
            * for getting client skill
            * and update the client Data
            * send skill options that browser have
            */
            return  apiCAll('/api/user/profile/stdSkills', 'get').then(
                (skillOptions) => {
                    this.#lastSync = this.#lastSync + this.#syncCounter;
                    localStorage.setItem('Skill_lastSync', JSON.stringify(this.#lastSync));

                    this.#status = state.updated;
                    localStorage.setItem('Skill_status', JSON.stringify(this.#status));


                    this.#client = skillOptions.data || [{ tittle: null }];
                    localStorage.setItem('Skill_client', JSON.stringify(this.#client));
                    

                    // console.log(this.#client);
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
                    localStorage.setItem('Skill_options', JSON.stringify(this.#options));

                    // console.log(skillOptions,this.#options);
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

}


export { Skill};
