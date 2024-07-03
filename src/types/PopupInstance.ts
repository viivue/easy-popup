import {PopupOptions} from "./PopupOptions";
import {EventsManager} from "@phucbm/events-manager";
import PiaEasyPopup from "../plugins/pia-easy-popup";
import LenisEasyPopup from "../plugins/lenis-easy-popup";

export interface PopupInstance {
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
    container: HTMLElement | undefined;
    overflow: HTMLElement | undefined;
    outer: HTMLElement | undefined;
    inner: HTMLElement | undefined;
    lenis: LenisEasyPopup;

    open(): void;

    close(): void;

    toggle(): void;
}