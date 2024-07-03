import {PopupInstance} from "./types/PopupInstance";

declare const lenis: any;

class LenisEasyPopup {
    root: HTMLElement;

    constructor(context: PopupInstance) {
        this.root = context.root;
    }

    enabled(): boolean {
        return typeof lenis !== 'undefined' && lenis !== 'undefined';
    }

    stop(): void {
        if (!this.enabled()) return;

        lenis.stop();
    }

    start(): void {
        if (!this.enabled()) return;

        lenis.start();
    }
}

export default LenisEasyPopup;