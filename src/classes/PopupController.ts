import {PopupControllerInterface} from "../types/PopupControllerInterface";
import {EasyPopup} from "./EasyPopup";

/**
 * Private class PopupController
 * This class will hold instances of the library's objects
 */
export class PopupController implements PopupControllerInterface {
    active: string;
    popups: EasyPopup[];

    constructor() {
        this.active = '';
        this.popups = [];
    }

    add(popup: EasyPopup): void {
        this.popups.push(popup);
    }

    get(id: string): EasyPopup | undefined {
        return this.popups.find(popup => popup.id === id);
    }
}