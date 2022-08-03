
import { apiCAll } from './apiCall';
const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }
class Services {
    static #instance = state.empty;
    #client           = JSON.parse(localStorage.getItem('Services_client'))  || state.empty  ;
    #options          = JSON.parse(localStorage.getItem('Services_options')) || state.empty ; 
    #syncCounter      = 15*60*1000;
    #lastSync         = JSON.parse(localStorage.getItem('Services_lastSync')) || state.empty ; //update  after 15min
    #status           = JSON.parse(localStorage.getItem('Services_status')) || state.empty ; 
    
    static getService(){
        if(this.#instance===null){
            this.#instance = new Services();
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
                                localStorage.setItem('Services_lastSync', JSON.stringify(this.#lastSync));

                                this.#status = state.updated;
                                localStorage.setItem('Services_status', JSON.stringify(this.#status));

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

    setClient(newService){

        // if (JSON.stringify(this.#client) !== JSON.stringify(newService) ){
        return new Promise((resolve, reject) => {

            if (`${this.#client}` !== `${newService}`) {

                let services = this.normalizeService(newService);

                apiCAll('/api/user/profile/indServices', 'post', { services }).then(
                    (serviceUpdation) => {
                        if (serviceUpdation.data.isUpdated) {
                            let omitedService = [];
                            services.forEach((value) => { omitedService = (value.status !== state.deleted) ? [{ ...value }, ...omitedService] : omitedService });
                            this.#client = omitedService;
                            localStorage.setItem('Services_client', JSON.stringify(this.#client));

                            this.#status = state.modified;
                            localStorage.setItem('Services_status', JSON.stringify(this.#status));
                            
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


    normalizeService(newService) {

        let oldService = this.#client;

        oldService.forEach((oService) => {
            let check =
                newService.some((nService, i) => {
                    if (oService.title === nService.title) {
                        if (nService.status === state.Add) 
                            newService[i].status = state.available;
                        return true
                    }
                });
            if (!check) {
                oService.status = state.deleted;
                newService = [{ ...oService }, ...newService];
            }
        })
        return newService;
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
            return  apiCAll('/api/user/profile/indServices', 'get').then(
                (services) => {
                    this.#lastSync = this.#lastSync + this.#syncCounter;
                    localStorage.setItem('Services_lastSync', JSON.stringify(this.#lastSync));

                    this.#status = state.updated;
                    localStorage.setItem('Services_status', JSON.stringify(this.#status));


                    this.#client = services.data || [{ tittle: null }];
                    localStorage.setItem('Services_client', JSON.stringify(this.#client));
                    

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
             return  apiCAll('/api/user/profile/serviceOption', 'get').then(
                (serviceOptions) => {
                    this.#options = serviceOptions.data || [{ tittle: null }];   
                    localStorage.setItem('Services_options', JSON.stringify(this.#options));

                    // console.log(serviceOptions,this.#options);
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


export { Services};
