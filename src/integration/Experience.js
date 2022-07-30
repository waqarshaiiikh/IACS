
import { apiCAll } from './apiCall';
const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }

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
    return new Promise((resolve,reject)=>{
        (this.UpdateClient()).then((check)=>
        {if (check) {
            this.#lastSync = Date.now();
            this.#status = state.updated;
            resolve(this)
        }else{
            reject(false)
        }

    })
    });
    }

    addExperience(exp) {// add experience
        return new Promise((resolve, reject) => {

            //check already exist. 
            const already = this.#client.some((value) => {
                if (exp.companyName === value.companyName && exp.jobRole === value.jobRole && exp.startDate === value.startDate && exp.endDate === value.endDate) {
                    resolve(true);
                }
            });

            if (!already) {

                // const eid = this.#client.length+1;

                let eid = 0;
                this.#client.forEach((exp) => {
                    if (exp.eid > eid) {
                        eid = exp.eid;
                    }
                });
                const experience = { eid: eid + 1, companyName: exp.companyName, jobRole: exp.jobRole, startDate: exp.startDate, endDate: exp.endDate, Description: exp.Description };

                apiCAll('/api/user/profile/stdExperience', 'post', { experience }).then(
                    (check) => {
                        if (check.data.isInserted) {
                            
                            this.#client.push(experience)
                            this.#status = state.modified;
                            resolve(true)
                        }else{
                            resolve(false)
                        }
                    }
                )

            }else {
                resolve(true)
            }

        });


    }

    remove(exp) {// remove experience
        return new Promise((resolve, reject) => {

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
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }
            )

        });

    }

    modify(exp) {//modify

        return new Promise((resolve, reject) => {

            let newExperience = [];
            let indexs = 0
            this.#client.forEach((value, index, array) => {
                if (!(exp.eid === value.eid)) {
                    newExperience.push(array[index])
                }else{
                    indexs =index;
                }
            }
            );

            const value = this.#client[indexs];
                
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
                                newExperience.push(exp);
                                this.#client = newExperience;
                                console.log(this.#client )
                                this.#status = state.modified;
                                resolve(true)
                            }
                            else{
                                resolve(false)
                            }
                        }
                        )
                    }else{

                        resolve(true);
                    }
                }
     
            
        });
    }

    get client(){
            this.UpdateClient();
            return this.#client;
        
    }


     UpdateClient() {


        if ((this.#status === state.empty && this.#lastSync === state.empty) ||
            (this.#status === state.modified && this.#lastSync + this.#syncCounter <= Date.now())) {
            return  apiCAll('/api/user/profile/stdExperience', 'get').then(
                (experience) => {
                    // console.log(experience.data)
                    this.#client = experience.data;
                    this.#status = state.updated;
                    this.#lastSync = this.#lastSync + this.#syncCounter;
                    return true;
                }
            )
        }
        return false;
    }
}
    





export { Experience};