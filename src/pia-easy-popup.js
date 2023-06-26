class PiaEasyPopup{
    constructor(context){
        // validate the storage (PiaJS)
        if(typeof typeof Pia === 'undefined'){
            console.warn(`PiaJs not found.`);
            return null;
        }

        // use popup id as key for Pia
        this.key = context.id;

        // validate expires
        this.piaOptions = context.options.pia;

        // set cookie if is not exists and,
        // if cookie options are using
        if(!this.getVal() && this.piaOptions){
            // when cookie is still exists, the popup will keep showing for n times
            // by default, popup will show once
            // save directly to Pia to avoid mismatched values
            this.setVal(1);
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

    // run everytime the popup closes
    onPopupClose(){

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