import {EventsManager} from "@phucbm/events-manager";
import PiaEasyPopup from "./pia-easy-popup";
import LenisEasyPopup from "./lenis-easy-popup";

export interface PopupOptions {
    el?: HTMLElement;
    autoShow?: boolean | number;
    showingTimes?: number;
    id?: string;
    activeHtmlClass?: string;
    preventScroll?: boolean;
    cookie?: boolean;

    [key: string]: any;
}

export interface Popup {
    root: HTMLElement;
    el: HTMLElement;
    selector: string;
    innerHTML: string;
    isOpen: boolean;
    id: string;
    idType: string;
    options: PopupOptions;
    events: EventsManager;
    cookie: PiaEasyPopup | null;
    masterContainer: HTMLElement | null;
    outer: HTMLElement | undefined;
    lenis: LenisEasyPopup;

    open(): void;

    close(): void;

    toggle(): void;
}

export interface PopupControllerInterface {
    active: string;
    popups: Popup[];

    add(popup: Popup): void;

    get(id: string): Popup | undefined;
}
