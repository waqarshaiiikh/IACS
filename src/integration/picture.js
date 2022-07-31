import axios from 'axios';
const port = 8393;
const Domain = 'http://localhost:';


const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }


class picture {
    
    static #instance = state.empty;
    #name     = "image";
    #fd       = state.empty  ;
    #url      = JSON.parse(localStorage.getItem('picture')) || state.empty  ;
    
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
        return new Promise((resolve,reject)=>{
            this.UpdateClient();
            console.log(this.#url)
            resolve(this.#url);
        });
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

            

            return axios({
                method: 'get',
                url: `${Domain}${port}/`,
                responseType: 'blob'
                // headers: { 'Content-Type': `multipart/form-data; boundary=${this.#fd._boundary}`},
                // data: this.#fd.get(this.#name)
            }).then(res => {
                this.#url = URL.createObjectURL(res.data);
                console.log(this.#url)
                this.#lastSync = this.#lastSync + this.#syncCounter;
                this.#status = state.updated;
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
        return new Promise((resolve,reject) => {
             resolve(false);
        });
    }
}

export { picture};
