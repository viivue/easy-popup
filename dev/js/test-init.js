import md from "../md/init.md";
import {highlightCodeSyntax} from "@phucbm/gfm";

export function testInit(root){
    root.insertAdjacentHTML('beforeend', md);

    // code highlight
    highlightCodeSyntax().then();

    EasyPopup.init();
}