class LenisEasyPopup {
    root: HTMLElement;

    constructor(context: { root: HTMLElement }) {
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