import {PopupOptions} from "./PopupOptions";
import {EventsManager} from "@phucbm/events-manager";
import PiaEasyPopup from "../plugins/PiaEasyPopup";
import LenisEasyPopup from "../plugins/LenisEasyPopup";

export interface PopupInstance {
    root: HTMLElement | null;
    el: HTMLElement | null;
    selector: string | '';
    innerHTML: string;
    isOpen: boolean;
    id: string;
    idType: string;
    options: PopupOptions;
    events: EventsManager;
    cookie: PiaEasyPopup | null;
    masterContainer: HTMLElement | null;
    container: HTMLElement | null;
    overflow: HTMLElement | null;
    outer: HTMLElement | null;
    inner: HTMLElement | null;
    lenis: LenisEasyPopup;

    open(): void;

    close(): void;

    toggle(): void;
}