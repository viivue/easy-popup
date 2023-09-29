class LenisEasyPopup{
    constructor(context){
        this.root = context.root;
    }

    enabled(){
        return typeof lenis !== 'undefined' && lenis !== 'undefined';
    }

    stop(){
        if(!this.enabled()) return;

        lenis.stop();
    }

    start(){
        if(!this.enabled()) return;

        lenis.start();
    }
}

export default LenisEasyPopup;