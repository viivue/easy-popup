import md from "../md/methods.md";

export function testMethods(root){
    root.insertAdjacentHTML('beforeend', md);
}