import {stringToSlug} from "./utils";

class PiaEasyPopup{
    constructor(context){
        // check if pia option is using
        const piaValue = context.options.cookie;
        if(!piaValue) return null; // skip if not in use

        // check if Pia is exists
        if(typeof Pia === 'undefined'){
            console.warn(`PiaJs not found.`);
            return null;
        }

        // use popup id as key for Pia
        let cookieName = context.options.cookieName;
        cookieName = typeof cookieName === 'string' && cookieName.length > 0 ? cookieName : context.id;
        this.key = 'easy-popup-' + stringToSlug(cookieName);

        // validate expires
        this.piaOptions = {expires: piaValue};

        // validate times
        const showingTimes = parseInt(context.options.showingTimes) ?? 1;

        // set cookie if is not exists and,
        // if cookie options are using
        if(this.getVal() === null && piaValue){
            // when cookie is still exists, the popup will keep showing for n times
            // by default, popup will show once
            // save directly to Pia to avoid mismatched values
            this.setVal(showingTimes); // todo: allow to set n times
        }
        // otherwise, do nothing
    }

    isShow(){
        // get val from Pia
        const val = this.getVal();

        // true if remaining times is > 0
        return typeof val === 'number' && val > 0;
    }

    // run everytime the popup opens
    onPopupOpen(){
        const val = this.getVal();

        // decrease remaining showing times on open
        if(typeof val === 'number'){
            // update
            this.updateVal(val - 1);
        }
    }

    getVal(){
        return Pia.get(this.key);
    }

    setVal(val){
        // save the new record
        Pia.set(this.key, val, this.piaOptions);
    }

    updateVal(val){
        Pia.update(this.key, val);
    }
}

export default PiaEasyPopup;