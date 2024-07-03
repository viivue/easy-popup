import {PopupInstance} from "../types/PopupInstance";
import {stringToSlug} from "../helpers";

declare const Pia: any;

class PiaEasyPopup {
    key: string;
    popupId: string;
    piaOptions: { expires: any };

    constructor(context: PopupInstance) {
        // check if pia option is using
        const piaValue = context.options.cookie;
        if (!piaValue) return; // skip if not in use

        // check if Pia is exists
        if (typeof Pia === 'undefined') {
            console.warn(`PiaJs not found.`);
            return;
        }

        // use popup id as key for Pia
        let cookieName = context.options.cookieName;
        cookieName = typeof cookieName === 'string' && cookieName.length > 0 ? cookieName : context.id;
        this.key = 'easy-popup-' + stringToSlug(cookieName);
        this.popupId = context.id;

        // validate expires
        this.piaOptions = {expires: piaValue};

        // validate times
        const showingTimes = parseInt(context.options.showingTimes as string) ?? 1;

        // set cookie if is not exists and,
        // if cookie options are using
        if (this.getVal() === null && piaValue) {
            // when cookie is still exists, the popup will keep showing for n times
            // by default, popup will show once
            // save directly to Pia to avoid mismatched values
            this.setVal(showingTimes); // todo: allow to set n times
        }
        // otherwise, do nothing
    }

    isShow(): boolean {
        // get val from Pia
        const val = this.getVal();

        // true if remaining times is > 0
        return typeof val === 'number' && val > 0;
    }

    // run everytime the popup opens
    onPopupOpen(): void {
        const val = this.getVal();

        // decrease remaining showing times on open
        if (typeof val === 'number') {
            // update
            this.updateVal(val - 1);
        }
    }

    getVal(): any {
        return Pia.get(this.key);
    }

    setVal(val: any): void {
        // save the new record
        Pia.set(this.key, val, this.piaOptions);
    }

    updateVal(val: any): void {
        Pia.update(this.key, val);
    }

    remove(): void {
        Pia.remove(this.key);
    }
}

export default PiaEasyPopup;