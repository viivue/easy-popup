/**!
 * Easy Popup v1.2.0
 * @author phucbm
 * @homepage https://easy-popup.netlify.app/
 * @license MIT 2024
 */var e={147:e=>{e.exports=JSON.parse('{"name":"@viivue/easy-popup","outputFilename":"easy-popup","prettyName":"Easy Popup","codeName":"EasyPopup","version":"1.2.0","description":"Super light-weight JavaScript library to create a simple popup","homepage":"https://easy-popup.netlify.app/","repository":{"type":"git","url":"git@github.com:viivue/easy-popup"},"author":{"name":"phucbm","url":"https://github.com/phucbm"},"keywords":["phucbm","javascript","popup","viivue","es6"],"main":"./dist/easy-popup.module.js","files":["./dist/*"],"license":"MIT","scripts":{"dev":"webpack serve --config config/webpack.dev.js","build":"cross-env ENTRY=dev webpack --config config/webpack.build.js","sass:compressed":"sass src/_style.scss:dist/easy-popup.css --no-source-map","optimize":"csso dist/easy-popup.css --output dist/easy-popup.min.css --stat","output-css":"npm run sass:compressed && npm run optimize","prod-umd":"cross-env TARGET=umd webpack --config config/webpack.prod.js","prod-umd-min":"cross-env TARGET=umd MIN=yes webpack --config config/webpack.prod.js","prod-module":"cross-env TARGET=module MIN=yes webpack --config config/webpack.prod.js","prod":"npm run prod-umd && npm run prod-module && npm run prod-umd-min && npm run output-css","publish":"npm run prod & npm publish"},"devDependencies":{"@babel/core":"^7.15.8","@babel/plugin-proposal-class-properties":"^7.14.5","@babel/preset-env":"^7.15.8","@phucbm/gfm":"^0.0.1","babel-loader":"^8.2.2","babel-preset-es2015":"^6.24.1","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^9.1.0","cross-env":"^7.0.3","css-loader":"^6.4.0","css-minimizer-webpack-plugin":"^3.1.1","csso-cli":"^4.0.1","github-markdown-css":"^5.2.0","html-loader":"^3.1.0","html-webpack-plugin":"^5.3.2","markdown-loader":"^8.0.0","mini-css-extract-plugin":"^2.4.2","piajs":"^0.0.3","postcss-loader":"^6.2.0","postcss-preset-env":"^6.7.0","sass":"^1.43.5","sass-loader":"^12.2.0","style-loader":"^3.3.0","terser-webpack-plugin":"^5.3.1","webpack":"^5.58.2","webpack-cli":"^4.9.0","webpack-dev-server":"^4.3.1","webpack-merge":"^5.8.0"},"dependencies":{"@phucbm/os-util":"0.0.5","match-media-screen":"^0.0.3"}}')}},t={};function o(s){var i=t[s];if(void 0!==i)return i.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,o),n.exports}(()=>{const e=class{constructor(e){const t=e.options.cookie;if(!t)return null;if("undefined"==typeof Pia)return console.warn("PiaJs not found."),null;let o=e.options.cookieName;o="string"==typeof o&&o.length>0?o:e.id,this.key="easy-popup-"+o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-"),this.popupId=e.id,this.piaOptions={expires:t};const s=parseInt(e.options.showingTimes)??1;null===this.getVal()&&t&&this.setVal(s)}isShow(){const e=this.getVal();return"number"==typeof e&&e>0}onPopupOpen(){const e=this.getVal();"number"==typeof e&&this.updateVal(e-1)}getVal(){return Pia.get(this.key)}setVal(e){Pia.set(this.key,e,this.piaOptions)}updateVal(e){Pia.update(this.key,e)}remove(){Pia.remove(this.key)}},t=o(147),s={master:"easy-popup-master",processed:"easy-popup-enabled",triggerEnabled:"ep-trigger-enabled",content:"easy-popup-content",outer:"easy-popup",inner:"easy-popup-inner",center:"easy-popup-center",overflow:"easy-popup-overflow",container:"easy-popup-container",open:"open",rootOpen:"easy-popup-open",closeButton:"ep-close-button",hasCustomClose:"ep-has-custom-close-button",preventScroll:"ep-prevent-scroll",preventScrollLenis:"ep-prevent-scroll-lenis"},i={id:"data-easy-popup-id",toggle:"data-ep-toggle",theme:"data-ep-theme",init:"data-easy-popup"},n={dev:!1,version:t.version,outerClass:"",activeHtmlClass:"",closeButtonInnerText:"",triggerSelector:"",hasMobileLayout:!1,mobileBreakpoint:768,theme:"default",keyboard:!0,clickOutsideToClose:!0,autoShow:!1,cookie:void 0,showingTimes:1,cookieName:"",preventScroll:!0,scrollbarWidth:void 0},r='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';class a{constructor(e,t){e&&(this.context=e,this.options={names:[],...t},this.eventNames=this.options.names,this.eventsList=[])}fire(e,t={}){if(!this.eventNames.includes(e))return void console.warn(`Cannot fire unrecognized event "${e}"`,this,t);const o={instance:this.context,eventName:e,...t},s=this.context.config?this.context.config:this.context.options;if(s){const t=s[e];"function"==typeof t&&t(o)}const i=this.eventsList[e];i?.length&&i.forEach((e=>{"function"==typeof e&&e(o)}))}add(e,t){e=function(e){let t=e;"on"!==e.slice(0,2)&&(t=t.charAt(0).toUpperCase()+t.slice(1),t="on"+t);return t}(e);this.eventNames.includes(e)?(void 0===this.eventsList[e]&&(this.eventsList[e]=[]),this.eventsList[e].push(t)):console.warn(`Cannot add unrecognized event "${e}"`)}}function p({target:e,attributeName:t="",defaultOptions:o={},numericValues:s=[],onIsString:i,dev:n=!1}){if(!e)return n&&console.warn("Target not found!",e),o;if(!e.hasAttribute(t))return n&&console.warn("Attribute not found from target",t),o;const r=e.getAttribute(t);if(!r.length)return o;if(!function(e){try{return JSON.parse(e)&&!!e}catch(e){return!1}}(r))return"function"==typeof i?i(r):console.warn("Not a JSON string",r),o;let a=JSON.parse(r);for(const[e,t]of Object.entries(a))"false"===t?a[e]=!1:"true"===t?a[e]=!0:s.includes(e)&&"string"==typeof t&&t.length>0?a[e]=parseFloat(t):a[e]=t;return{...o,...a}}const c=class{constructor(e){this.root=e.root}enabled(){return"undefined"!=typeof lenis&&"undefined"!==lenis}stop(){this.enabled()&&lenis.stop()}start(){this.enabled()&&lenis.start()}};function l(e,t){t.forEach((t=>{t.classList.contains(s.triggerEnabled)||(t.addEventListener("click",(t=>{t.preventDefault(),e.toggle()})),t.classList.add(s.triggerEnabled))}))}function d(e,t=document.createElement("div")){return e.parentNode.insertBefore(t,e),t.appendChild(e),t}
/**!
 * Match Media Screen v0.0.3
 * @author phucbm
 * @homepage https://github.com/phucbm/match-media-screen
 * @license MIT 2022
 */
var u={d:(e,t)=>{for(var o in t)u.o(t,o)&&!u.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},h={};function m(e,t=!0){const o=[...e];return t?o.sort(((e,t)=>e.breakpoint<t.breakpoint?1:-1)):o.sort(((e,t)=>e.breakpoint>t.breakpoint?1:-1)),o}function b(e,t=150){let o;return(...s)=>{clearTimeout(o),o=setTimeout((()=>{e.apply(this,s)}),t)}}u.d(h,{o:()=>v});class v{constructor(e){if(this.dev=!0===e.dev,this.object=e.object||void 0,this.object){if(this.onMatched=e.onMatched,this.onUpdate=e.onUpdate,window.addEventListener("resize",b((()=>{"function"==typeof this.onUpdate&&this.onUpdate(this.currentObject)}),this.debounce)),!this.object.responsive)return this.currentObject={type:"no-responsive",lastBreakpoint:void 0,breakpoint:-1,object:this.mergeObject(-1,this.object)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject),this.dev&&console.warn("Property object must have responsive array."),!1;this.isInherit=void 0===e.isInherit||e.isInherit,this.debounce=e.debounce||100,this.currentObject={breakpoint:void 0,object:{}},this.object.responsive=m(this.object.responsive),this.match(),window.addEventListener("resize",b((()=>this.match()),this.debounce))}else console.error("Property object:{} must be provided.")}match(){let e=!1;for(let t=0;t<this.object.responsive.length;t++){const o=this.object.responsive[t];if(e=matchMedia(this.getQuery(t)).matches,e){this.currentObject.breakpoint!==o.breakpoint&&(this.currentObject={type:"responsive",lastBreakpoint:this.currentObject.breakpoint,breakpoint:o.breakpoint,object:this.mergeObject(o.breakpoint,o.settings)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject));break}}e||-1===this.currentObject.breakpoint||(this.currentObject={type:"default",lastBreakpoint:this.currentObject.breakpoint,breakpoint:-1,object:this.mergeObject(-1,this.object)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject))}getQuery(e){let t=`screen and (max-width:${this.object.responsive[e].breakpoint}px)`;const o=this.object.responsive[e+1];return o&&(t+=` and (min-width:${o.breakpoint+1}px)`),t}mergeObject(e,t){let o={...t};if(this.isInherit&&-1!==e){const t=m(this.object.responsive,!1);for(let s=0;s<t.length;s++)t[s].breakpoint>e&&(o={...t[s].settings,...o})}return o={...this.object,...o},delete o.responsive,o}}var g=h.o;function f(e,t=!1){t?e.outer.removeAttribute(i.theme):e.outer.setAttribute(i.theme,e.options.theme)}function y(e){if(!e.el.classList.contains(s.processed)){if(e.masterContainer||(e.masterContainer=document.createElement("div"),e.masterContainer.classList.add(s.master)),document.querySelector("body").appendChild(e.masterContainer),e.masterContainer.appendChild(e.el),e.inner=d(e.el),e.inner.classList.add(s.inner),e.container=d(e.inner),e.container.classList.add(s.container),e.overflow=d(e.container),e.overflow.classList.add(s.overflow),e.outer=d(e.overflow),e.outer.classList.add(s.outer),e.options.outerClass){const t=e.options.outerClass.trim().split(" ");for(let o=0;o<t.length;o++)e.outer.classList.add(t[o])}e.outer.setAttribute(i.id,e.id),function(e){e.outer.addEventListener("click",(t=>{(function(e,t){return!e.inner.contains(t.target)})(e,t)&&e.options.clickOutsideToClose&&e.close()}))}(e),function(e){e.options.keyboard&&document.addEventListener("keyup",(t=>{e.isOpen&&"Escape"===t.key&&e.close()}))}(e),function(e){e.options.theme.length&&"default"!==e.options.theme&&f(e)}(e),function(e){e.options.hasMobileLayout&&(e.outer.classList.add("will-have-mobile-layout"),new g({object:{isMobile:!1,responsive:[{breakpoint:e.options.mobileBreakpoint,settings:{isMobile:!0}}]},debounce:100,onMatched:t=>{t.object.isMobile?(e.outer.classList.add("ep-mobile-layout"),f(e,!0)):(e.outer.classList.remove("ep-mobile-layout"),f(e))}}))}(e),function(e){let t=r;e.options.closeButtonInnerText&&(e.outer.classList.add(s.hasCustomClose),t=e.options.closeButtonInnerText);const o=(e=s.closeButton,o=i.toggle)=>`<button class="${e}" ${o} aria-label='Close popup'>\n                    ${t}\n                </button>`;e.inner.insertAdjacentHTML("beforeend",o()),e.options.hasMobileLayout&&e.container.insertAdjacentHTML("beforebegin",o(s.closeButton+" for-mobile-layout"))}(e),function(e){let t=`a[href="#${e.id}"], [${i.toggle}="${e.id}"]`;e.options.triggerSelector&&e.options.triggerSelector.length&&(t+=`, ${e.options.triggerSelector}`),l(e,document.querySelectorAll(t)),l(e,e.outer.querySelectorAll(`[${i.toggle}]`))}(e),e.el.classList.add(s.processed,s.content)}}function w(e){if(function(){let e=!1;var t;return t=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0),e}())return 0;const{scrollbarWidth:t}=e.options;return void 0===t?k():"number"==typeof t?t:(console.warn("EasyPopup: `scrollbarWidth` must be a number, fallback to auto-detect"),k())}function k(e=document.body){const t=e||document.createElement("div"),o={visibility:t.style.visibility,overflow:t.style.overflow,msOverflowStyle:t.style.msOverflowStyle};t.style.visibility="hidden",t.style.overflow="scroll",t.style.msOverflowStyle="scrollbar",e||document.body.appendChild(t);const s=document.createElement("div");t.appendChild(s);const i=t.offsetWidth-s.offsetWidth;return t.removeChild(s),e?(t.style.visibility=o.visibility,t.style.overflow=o.overflow,t.style.msOverflowStyle=o.msOverflowStyle):t.parentNode.removeChild(t),i}class j{constructor(t,o){if(!t)return void console.warn("Init popup fail due to empty input!");if(this.root=document.querySelector(":root"),this.el=t,this.selector=i.init,this.innerHTML=this.el.innerHTML,this.isOpen=!1,this.id=function(e=""){return e+(+new Date).toString(16)+(1e8*Math.random()|0).toString(16)}("easy-popup-"),this.idType="auto-id",this.el.classList.contains(s.processed))return;this.events=new a(this,{names:["onClose","onOpen"]}),this.options=p({target:this.el,attributeName:i.init,defaultOptions:{...n,...o},numericValues:["autoShow","showingTimes"],onIsString:e=>{this.idType="attr-id",this.id=e}}),this.options.id&&(this.id=this.options.id,this.idType="attr-id"!==this.idType?"json-id":this.idType);const r=this.el.getAttribute(i.init);if(null===r||isNaN(r)||(this.id=`${r}`,this.idType="attr-id",console.warn("Popup ID should be a string, consider adding a prefix to your ID to avoid unexpected issue, your ID:",this.id)),this.cookie=this.options.cookie?new e(this):null,this.masterContainer=document.querySelector(`.${s.master}`),this.outer=void 0,y(this),!1!==this.options.autoShow){if(!this.cookie||this.cookie.isShow()){const e=!0===this.options.autoShow?1e3:this.options.autoShow;setTimeout((()=>this.open()),e)}}this.lenis=new c(this)}on(e,t){this.events.add(e,t)}open(){this.isOpen||(window.EasyPopupData.active&&EasyPopup.get(window.EasyPopupData.active).close(),window.EasyPopupData.active=this.id,this.outer.classList.add(s.open),this.isOpen=!0,this.root.classList.add(s.rootOpen),this.options.activeHtmlClass&&this.root.classList.add(this.options.activeHtmlClass),this.options.preventScroll&&(this.lenis.enabled()?(this.root.classList.add(s.preventScrollLenis),this.lenis.stop()):(this.root.classList.add(s.preventScroll),this.root.style.setProperty("--ep-scroll-bar-w",`${w(this)}px`))),this.cookie?.onPopupOpen(),this.events.fire("onOpen"))}close(){this.isOpen&&(window.EasyPopupData.active="",this.outer.classList.remove(s.open),this.isOpen=!1,this.root.classList.remove(s.rootOpen),this.options.activeHtmlClass&&this.root.classList.remove(this.options.activeHtmlClass),setTimeout((()=>{window.EasyPopupData.active||this.options.preventScroll&&(this.lenis.enabled()?(this.root.classList.remove(s.preventScrollLenis),this.lenis.start()):this.root.classList.remove(s.preventScroll)),this.events.fire("onClose")}),300))}toggle(){this.isOpen?this.close():this.open()}}window.EasyPopupData=new class{constructor(){this.active="",this.popups=[]}add(e){this.popups.push(e)}get(e){return this.popups.filter((t=>t.id===e))[0]}},window.EasyPopup={init:(e=`[${i.init}]`,t={})=>{document.querySelectorAll(e).forEach((e=>window.EasyPopupData.add(new j(e,t))))},get:e=>window.EasyPopupData.get(e)},window.EasyPopup.init()})();