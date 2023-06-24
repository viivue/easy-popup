class Cookie{
    constructor(context){
        // validate the storage (PiaJS)
        if(typeof typeof Pia === 'undefined'){
            console.warn(`Pia doesn't exist!!!`);
            return {};
        }
        this.id = context.id;

        // validate expires
        this.expires = this.validateExpires(context.options.cookie);
        if(!this.expires){
            console.warn(`Invalid expires object!`, context.options.cookie);
            return null;
        }
    }

    validateExpires(expires){
        // string value
        if(typeof expires === 'string' && isNaN(expires)){
            return expires === 'session' ? expires : undefined;
        }

        // numeric value
        if(
            typeof this.expires === 'number' ||
            (typeof this.expires === 'string' && !isNaN(expires))
        ){
            const cookieValue = parseInt(expires);

            if(cookieValue < 0) return undefined;
            return cookieValue;
        }
    }

    isCookieExist(){
        if(this.expires === false) return false;

        // get record
        return Boolean(this.getStatus());
    }

    getStatus(key = this.id){
        return Pia.get(key);
    }

    setStatus(status){
        // save the new record
        Pia.set(this.id, status, this.expires);
    }
}

export default Cookie;