class Cookie{
    constructor(context){
        this.storage = typeof Pia !== 'undefined' ? Pia : undefined;

        // validate the storage (PiaJS)
        if(typeof this.storage === 'undefined' || !context.options.cookie){
            return false;
        }
        this.id = context.id;
        this.expires = context.options.cookie;

        // validate expires
        this.validateExpires();
    }

    validateExpires(){
        // string value
        if(typeof this.expires === 'string' && isNaN(this.expires)){
            const availableCookieTypes = ['session'];
            const result = availableCookieTypes.find(type => type === this.expires);

            if(result) this.expires = result;
            else this.expires = false;
        }

        // numeric value
        if(
            typeof this.expires === 'number' ||
            (typeof this.expires === 'string' && !isNaN(this.expires))
        ){
            const cookieValue = parseInt(this.expires);

            if(cookieValue < 0) this.expires = false;
            else this.expires = cookieValue;
        }
    }

    isCookieExist(){
        if(this.expires === false) return false;

        // get record
        const status = this.getStatus();

        // register new cookie
        if(!status){
            this.setStatus(true);
        }

        return !status;
    }

    getStatus(key = this.id){
        return this.storage.get(key);
    }

    setStatus(status){
        // save the new record
        this.storage.set(this.id, true, this.expires);
    }
}

export default Cookie;