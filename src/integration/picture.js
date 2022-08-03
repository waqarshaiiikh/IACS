import { apiCAll } from './apiCall';


const state = { updated: "updated", modified: "modified", empty: null, available: "available", deleted: "deleted", deletedAll: "deletedAll", Add: "added" }


class picture {
    
    static #instance = state.empty;
    #url              = JSON.parse(localStorage.getItem('picture_url')) || state.empty  ;
    #syncCounter      = 15*60*1000;
    #lastSync         = JSON.parse(localStorage.getItem('picture_lastSync')) || state.empty ; //update  after 15min
    #status           = JSON.parse(localStorage.getItem('picture_status')) || state.empty ; 

    
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


    get url() {
        return new Promise((resolve,reject)=>{
            this.UpdateClient().then(()=>{
                console.log(this.#url)
                resolve(this.#url);
            });
        });
    }


    setUrl(file) {

        return new Promise((resolve, reject) => {

            const uploadImage = async (base64EncodedImage) => {
                try {
                    await apiCAll('/api/user/profile/pic', 'post', { data: base64EncodedImage } ).then(
                        (res) => {

                            this.#status = state.modified;
                            localStorage.setItem('picture_status', JSON.stringify(this.#status));
        
        
                            this.#url = res.data.url || [{ tittle: null }];
                            console.log(res.data)
                            localStorage.setItem('picture_url', JSON.stringify(this.#url));
                            
                            console.log('Image uploaded successfully');
                            resolve(true);
                        }
                    )
                    
                } catch (err) {
                    console.log('Something went wrong!');
                    resolve(false);
                }
            };


            if (!file) return;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                uploadImage(reader.result);
            };
            reader.onerror = () => {
                console.error('AHHHHHHHH!!');
                // setErrMsg('something went wrong!');
            };
        })
    }

    UpdateClient() {
        if ((this.#status === state.empty && this.#lastSync === state.empty) ||
            (this.#status === state.modified && this.#lastSync + this.#syncCounter <= Date.now())) {

            // return axios({
            //     method: 'get',
            //     url: `${Domain}${port}/`,
            //     responseType: 'blob'
            //     // headers: { 'Content-Type': `multipart/form-data; boundary=${this.#fd._boundary}`},
            //     // data: this.#fd.get(this.#name)
            // }).then(res => {
            //     this.#url = res.data.url;
            //     console.log(this.#url)
            //     this.#lastSync = this.#lastSync + this.#syncCounter;
            //     this.#status = state.updated;
            //     return true;

            //     // setSrc(imageUrl);
            //     // return (
            //     //     <img src={src} alt="trial" />
            //     // )
            // })


            return  apiCAll('/api/user/profile/pic', 'get').then(
                (res) => {
                    this.#lastSync = this.#lastSync + this.#syncCounter;
                    localStorage.setItem('picture_lastSync', JSON.stringify(this.#lastSync));

                    this.#status = state.updated;
                    localStorage.setItem('picture_status', JSON.stringify(this.#status));


                    this.#url = res.data.url || [{ tittle: null }];
                    localStorage.setItem('picture_url', JSON.stringify(this.#url));
                    
                    return true;
                }
            )
        }
        return Promise.resolve(false);
    }
}

export { picture};
