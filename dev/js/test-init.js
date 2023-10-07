import md from "../md/init.md";
import toMarkdown from "../../config/showdown";

export function testInit(root){
    root.insertAdjacentHTML('beforeend', toMarkdown(md));

    EasyPopup.init();
}