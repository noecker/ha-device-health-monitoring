function e(e,t,i,s){var o,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,i,n):o(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,v=g.trustedTypes,_=v?v.emptyScript:"",x=g.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let m=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);o?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=s;const r=o.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,o=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??b)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[y("elementProperties")]=new Map,m[y("finalized")]=new Map,x?.({ReactiveElement:m}),(g.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=w.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,M=`<${C}>`,U=document,P=()=>U.createComment(""),H=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,D="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,N=/>/g,R=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,F=U.createTreeWalker(U,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const q=(e,t)=>{const i=e.length-1,s=[];let o,r=2===t?"<svg>":3===t?"<math>":"",n=O;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,d=n.exec(i),null!==d);)c=n.lastIndex,n===O?"!--"===d[1]?n=z:void 0!==d[1]?n=N:void 0!==d[2]?(B.test(d[2])&&(o=RegExp("</"+d[2],"g")),n=R):void 0!==d[3]&&(n=R):n===R?">"===d[0]?(n=o??O,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?R:'"'===d[3]?j:I):n===j||n===I?n=R:n===z||n===N?n=O:(n=R,o=void 0);const h=n===R&&e[t+1].startsWith("/>")?" ":"";r+=n===O?i+M:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+S+h):i+S+(-2===l?t:h)}return[G(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const n=e.length-1,a=this.parts,[d,l]=q(e,t);if(this.el=Z.createElement(d,i),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=l[r++],i=s.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?ie:Y}),s.removeAttribute(e)}else e.startsWith(S)&&(a.push({type:6,index:o}),s.removeAttribute(e));if(B.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],P()),F.nextNode(),a.push({type:2,index:++o});s.append(e[t],P())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)a.push({type:7,index:o}),e+=S.length-1}o++}}static createElement(e,t){const i=U.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===Q)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=H(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=J(e,o._$AS(e,t.values),o,s)),t}let K=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??U).importNode(t,!0);F.currentNode=s;let o=F.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new X(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new se(o,this,e)),this._$AV.push(t),a=i[++n]}r!==a?.index&&(o=F.nextNode(),r++)}return F.currentNode=U,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),H(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==Q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new K(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new Z(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(void 0===o)e=J(this,e,t,0),r=!H(e)||e!==this._$AH&&e!==Q,r&&(this._$AH=e);else{const s=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=J(this,s[i+n],t,n),a===Q&&(a=this._$AH[n]),r||=!H(a)||a!==this._$AH[n],a===V?e=V:e!==V&&(e+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class te extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class ie extends Y{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??V)===Q)return;const i=this._$AH,s=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe={I:X},re=w.litHtmlPolyfillSupport;re?.(Z,X),(w.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ae=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new X(t.insertBefore(P(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};ae._$litElement$=!0,ae.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ae});const de=ne.litElementPolyfillSupport;de?.({LitElement:ae}),(ne.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},he=(e=ce,t,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return pe({...e,state:!0,attribute:!1})}const ge=n`
  :host {
    display: block;
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family);
    height: 100%;
  }

  /* App toolbar for mobile navigation */
  .app-toolbar {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 4px;
    background-color: var(--app-header-background-color, var(--primary-color));
    color: var(--app-header-text-color, var(--text-primary-color));
    box-sizing: border-box;
  }

  .menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    border-radius: 50%;
    -webkit-tap-highlight-color: transparent;
  }

  .menu-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .menu-button svg {
    display: block;
  }

  .app-title {
    font-size: 20px;
    font-weight: 400;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    padding: 16px;
    overflow-y: auto;
    height: calc(100% - 56px);
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }

  .toolbar {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
    padding: 12px;
    background: var(--card-background-color);
    border-radius: 8px;
  }

  .filter-buttons {
    display: flex;
    gap: 8px;
  }

  .filter-button {
    padding: 8px 16px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-button:hover {
    background: var(--secondary-background-color);
  }

  .filter-button.active {
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-color: var(--primary-color);
  }

  .search-box {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
  }

  .table-container {
    background: var(--card-background-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: var(--secondary-background-color);
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    color: var(--secondary-text-color);
    border-bottom: 2px solid var(--divider-color);
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  tbody tr:hover {
    background: var(--secondary-background-color);
  }

  .checkbox-cell {
    width: 40px;
  }

  .entity-name {
    font-weight: 500;
  }

  .entity-id {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-battery {
    background: var(--warning-color);
    color: white;
  }

  .status-unavailable {
    background: var(--error-color);
    color: white;
  }

  .status-excluded {
    background: var(--success-color);
    color: white;
  }

  .stats {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
  }

  .stat-card {
    flex: 1;
    padding: 16px;
    background: var(--card-background-color);
    border-radius: 8px;
    box-shadow: var(--ha-card-box-shadow);
  }

  .stat-value {
    font-size: 32px;
    font-weight: 300;
    color: var(--primary-color);
  }

  .stat-label {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 48px;
  }

  .empty-state {
    text-align: center;
    padding: 48px;
    color: var(--secondary-text-color);
  }

  .empty-state-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.3;
  }
`;async function ve(e,t){return(await e.callWS({type:"device_health_exclusions/get_problem_devices",battery_threshold:t})).devices}async function _e(e){return await e.callWS({type:"device_health_exclusions/get_exclusions"})}let xe=class extends ae{constructor(){super(...arguments),this.filterMode="all",this.searchQuery="",this.batteryThreshold=20,this.hideUnknown=!1}render(){return L`
      <div class="toolbar">
        <div class="filter-buttons">
          <button
            class="filter-button ${"all"===this.filterMode?"active":""}"
            @click=${()=>this._setFilter("all")}
          >
            All Devices
          </button>
          <button
            class="filter-button ${"not_excluded"===this.filterMode?"active":""}"
            @click=${()=>this._setFilter("not_excluded")}
          >
            Not Excluded
          </button>
          <button
            class="filter-button ${"excluded"===this.filterMode?"active":""}"
            @click=${()=>this._setFilter("excluded")}
          >
            Excluded
          </button>
        </div>

        <input
          type="text"
          class="search-box"
          placeholder="Search devices..."
          .value=${this.searchQuery}
          @input=${this._handleSearch}
        />

        <div class="threshold-input">
          <label>Battery %:</label>
          <input
            type="number"
            min="5"
            max="50"
            .value=${this.batteryThreshold.toString()}
            @change=${this._handleThresholdChange}
          />
        </div>

        <label class="hide-unknown-toggle">
          <input
            type="checkbox"
            .checked=${this.hideUnknown}
            @change=${this._handleHideUnknownChange}
          />
          Hide unknown
        </label>
      </div>
    `}_setFilter(e){this.filterMode=e,this.dispatchEvent(new CustomEvent("filter-changed",{detail:{filterMode:e}}))}_handleSearch(e){const t=e.target;this.searchQuery=t.value,this.dispatchEvent(new CustomEvent("search-changed",{detail:{searchQuery:this.searchQuery}}))}_handleThresholdChange(e){const t=e.target,i=parseInt(t.value,10);i>=5&&i<=50&&(this.batteryThreshold=i,this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{batteryThreshold:i}})))}_handleHideUnknownChange(e){const t=e.target;this.hideUnknown=t.checked,this.dispatchEvent(new CustomEvent("hide-unknown-changed",{detail:{hideUnknown:this.hideUnknown}}))}};xe.styles=n`
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 16px;
      align-items: center;
      padding: 12px;
      background: var(--card-background-color);
      border-radius: 8px;
    }

    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .filter-button {
      padding: 8px 16px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }

    .filter-button:hover {
      background: var(--secondary-background-color);
    }

    .filter-button.active {
      background: var(--primary-color);
      color: var(--text-primary-color);
      border-color: var(--primary-color);
    }

    .search-box {
      flex: 1;
      min-width: 150px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
    }

    .threshold-input {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .threshold-input label {
      font-size: 14px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .threshold-input input {
      width: 60px;
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
    }

    .hide-unknown-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .hide-unknown-toggle input {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-buttons {
        order: 1;
        justify-content: flex-start;
      }

      .search-box {
        order: 2;
        width: 100%;
        min-width: unset;
      }

      .threshold-input {
        order: 3;
        justify-content: space-between;
      }

      .hide-unknown-toggle {
        order: 4;
        justify-content: flex-start;
      }
    }
  `,e([pe({type:String})],xe.prototype,"filterMode",void 0),e([pe({type:String})],xe.prototype,"searchQuery",void 0),e([pe({type:Number})],xe.prototype,"batteryThreshold",void 0),e([pe({type:Boolean})],xe.prototype,"hideUnknown",void 0),xe=e([le("filter-toolbar")],xe);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye=2;class fe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:be}=oe,$e=()=>document.createComment(""),me=(e,t,i)=>{const s=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore($e(),o),r=s.insertBefore($e(),o);i=new be(t,r,e,e.options)}else{const t=i._$AB.nextSibling,r=i._$AM,n=r!==e;if(n){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==r._$AU&&i._$AP(t)}if(t!==o||n){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,o),e=t}}}return i},we=(e,t,i=e)=>(e._$AI(t,i),e),Ae={},ke=e=>{e._$AR(),e._$AA.remove()},Ee=(e,t,i)=>{const s=new Map;for(let o=t;o<=i;o++)s.set(e[o],o);return s},Se=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends fe{constructor(e){if(super(e),e.type!==ye)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let s;void 0===i?i=t:void 0!==t&&(s=t);const o=[],r=[];let n=0;for(const t of e)o[n]=s?s(t,n):n,r[n]=i(t,n),n++;return{values:r,keys:o}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,s]){const o=(e=>e._$AH)(e),{values:r,keys:n}=this.dt(t,i,s);if(!Array.isArray(o))return this.ut=n,r;const a=this.ut??=[],d=[];let l,c,h=0,p=o.length-1,u=0,g=r.length-1;for(;h<=p&&u<=g;)if(null===o[h])h++;else if(null===o[p])p--;else if(a[h]===n[u])d[u]=we(o[h],r[u]),h++,u++;else if(a[p]===n[g])d[g]=we(o[p],r[g]),p--,g--;else if(a[h]===n[g])d[g]=we(o[h],r[g]),me(e,d[g+1],o[h]),h++,g--;else if(a[p]===n[u])d[u]=we(o[p],r[u]),me(e,o[h],o[p]),p--,u++;else if(void 0===l&&(l=Ee(n,u,g),c=Ee(a,h,p)),l.has(a[h]))if(l.has(a[p])){const t=c.get(n[u]),i=void 0!==t?o[t]:null;if(null===i){const t=me(e,o[h]);we(t,r[u]),d[u]=t}else d[u]=we(i,r[u]),me(e,o[h],i),o[t]=null;u++}else ke(o[p]),p--;else ke(o[h]),h++;for(;u<=g;){const t=me(e,d[g+1]);we(t,r[u]),d[u++]=t}for(;h<=p;){const e=o[h++];null!==e&&ke(e)}return this.ut=n,((e,t=Ae)=>{e._$AH=t})(e,d),Q}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ce=class extends ae{constructor(){super(...arguments),this.devices=[],this.filterMode="all",this.searchQuery="",this.hideUnknown=!1,this._expandedIntegrations=new Set,this._expandedDevices=new Set,this._initialExpansionDone=!1}connectedCallback(){super.connectedCallback(),this._initialExpansionDone=!1}updated(e){e.has("devices")&&!this._initialExpansionDone&&this.devices.length>0&&(this._expandAllGroups(),this._initialExpansionDone=!0)}_expandAllGroups(){const e=this._getGroupedDevices();this._expandedIntegrations=new Set(e.map(e=>e.integration)),this._expandedDevices=new Set(e.flatMap(e=>e.devices.map(t=>t.device_id||`standalone-${e.integration}`)))}render(){const e=this._getGroupedDevices();return 0===e.length?L`
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div>No devices found matching your filters</div>
        </div>
      `:L`
      <div class="table-container">
        ${Se(e,e=>e.integration,e=>this._renderIntegrationGroup(e))}
      </div>
    `}_renderIntegrationGroup(e){const t=this._expandedIntegrations.has(e.integration),i=e.excluded_entity_count,s=e.total_entities;return L`
      <div class="integration-group">
        <div
          class="integration-header"
          @click=${()=>this._toggleIntegration(e.integration)}
        >
          <span class="expand-icon ${t?"expanded":""}">▶</span>
          <span>${this._formatIntegrationName(e.integration)}</span>
          <span class="stats">
            ${e.devices.length} device${1!==e.devices.length?"s":""},
            ${i}/${s} excluded
          </span>
        </div>
        ${t?L`
          <div class="integration-content">
            ${Se(e.devices,t=>t.device_id||`standalone-${e.integration}`,t=>this._renderDeviceGroup(t,e.integration))}
          </div>
        `:""}
      </div>
    `}_renderDeviceGroup(e,t){const i=e.device_id||`standalone-${t}`,s=this._expandedDevices.has(i),o=e.entities.length,r=e.excluded_entity_count;return L`
      <div class="device-group">
        <div
          class="device-header"
          @click=${e=>{"INPUT"!==e.target.tagName&&this._toggleDevice(i)}}
        >
          ${e.device_id?L`
            <input
              type="checkbox"
              class="device-checkbox"
              .checked=${e.is_excluded}
              @change=${t=>{t.stopPropagation(),this._toggleDeviceExclusion(e.device_id)}}
              title="Exclude entire device"
            />
          `:""}
          <span class="expand-icon ${s?"expanded":""}">▶</span>
          <div class="device-info">
            <span class="device-name">
              ${e.device_name}
              ${e.is_excluded?L`<span class="excluded-indicator" title="Device excluded"></span>`:""}
            </span>
            <span class="device-meta">
              ${[e.manufacturer,e.model].filter(Boolean).join(" · ")||"Unknown device"}
            </span>
          </div>
          <span class="entity-count">
            ${r}/${o} entities excluded
          </span>
        </div>
        ${s?L`
          <div class="device-content">
            ${Se(e.entities,e=>e.entity_id,t=>this._renderEntityRow(t,e.is_excluded))}
          </div>
        `:""}
      </div>
    `}_renderEntityRow(e,t){return L`
      <div class="entity-row">
        <input
          type="checkbox"
          class="entity-checkbox"
          .checked=${e.is_excluded}
          .disabled=${t&&!e.is_entity_excluded}
          @change=${()=>this._toggleEntity(e.entity_id)}
          title=${t&&!e.is_entity_excluded?"Excluded via device":"Toggle entity exclusion"}
        />
        <div class="entity-info">
          <span class="entity-name">${e.name}</span>
          <span class="entity-id">
            ${e.entity_id}
            ${e.is_device_excluded&&!e.is_entity_excluded?L`<span class="device-excluded-note">(via device)</span>`:""}
          </span>
        </div>
        <div class="entity-status">
          ${this._renderStatusBadge(e)}
        </div>
      </div>
    `}_renderStatusBadge(e){return"unavailable"===e.state?L`
        <span class="status-badge status-unavailable">
          unavailable
        </span>
      `:"unknown"===e.state?L`
        <span class="status-badge status-unknown">
          unknown
        </span>
      `:null!==e.battery_level?L`
        <span class="status-badge status-battery">
          ${e.battery_level}% battery
        </span>
      `:L`<span>-</span>`}_getGroupedDevices(){let e=this._getFilteredDevices();const t=new Map;for(const i of e){const e=i.integration||"Other",s=i.device_id;t.has(e)||t.set(e,new Map);const o=t.get(e);o.has(s)||o.set(s,[]),o.get(s).push(i)}const i=[];for(const[e,s]of t){const t=[];let o=0,r=0;for(const[i,n]of s){const s=n[0],a=n.some(e=>e.is_device_excluded),d=n.filter(e=>e.is_excluded).length;t.push({device_id:i,device_name:s.device_name||s.name||"Unknown Device",integration:e,manufacturer:s.manufacturer,model:s.model,entities:n,is_excluded:a,excluded_entity_count:d}),o+=n.length,r+=d}t.sort((e,t)=>e.is_excluded!==t.is_excluded?e.is_excluded?1:-1:e.device_name.localeCompare(t.device_name)),i.push({integration:e,devices:t,total_entities:o,excluded_entity_count:r})}return i.sort((e,t)=>"Other"===e.integration?1:"Other"===t.integration?-1:e.integration.localeCompare(t.integration)),i}_getFilteredDevices(){let e=this.devices;if("excluded"===this.filterMode?e=e.filter(e=>e.is_excluded):"not_excluded"===this.filterMode&&(e=e.filter(e=>!e.is_excluded)),this.hideUnknown&&(e=e.filter(e=>"unknown"!==e.state)),this.searchQuery){const t=this.searchQuery.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.entity_id.toLowerCase().includes(t)||e.device_name&&e.device_name.toLowerCase().includes(t)||e.integration&&e.integration.toLowerCase().includes(t))}return e}_formatIntegrationName(e){return e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}_toggleIntegration(e){const t=new Set(this._expandedIntegrations);t.has(e)?t.delete(e):t.add(e),this._expandedIntegrations=t}_toggleDevice(e){const t=new Set(this._expandedDevices);t.has(e)?t.delete(e):t.add(e),this._expandedDevices=t}_toggleEntity(e){this.dispatchEvent(new CustomEvent("toggle-exclusion",{detail:{entityId:e},bubbles:!0,composed:!0}))}_toggleDeviceExclusion(e){this.dispatchEvent(new CustomEvent("toggle-device-exclusion",{detail:{deviceId:e},bubbles:!0,composed:!0}))}};Ce.styles=n`
    :host {
      display: block;
    }

    .table-container {
      background: var(--card-background-color);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
    }

    /* Integration group header */
    .integration-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      cursor: pointer;
      user-select: none;
      font-weight: 500;
      font-size: 14px;
    }

    .integration-header:hover {
      background: var(--primary-color);
      filter: brightness(1.1);
    }

    .integration-header .expand-icon {
      margin-right: 8px;
      transition: transform 0.2s;
    }

    .integration-header .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .integration-header .stats {
      margin-left: auto;
      font-size: 12px;
      opacity: 0.9;
    }

    /* Device group header */
    .device-header {
      display: flex;
      align-items: center;
      padding: 10px 16px 10px 32px;
      background: var(--secondary-background-color);
      cursor: pointer;
      user-select: none;
      border-bottom: 1px solid var(--divider-color);
    }

    .device-header:hover {
      background: var(--primary-background-color);
    }

    .device-header .expand-icon {
      margin-right: 8px;
      transition: transform 0.2s;
      font-size: 12px;
    }

    .device-header .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .device-header .device-info {
      flex: 1;
      min-width: 0;
    }

    .device-header .device-name {
      font-weight: 500;
      display: block;
    }

    .device-header .device-meta {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .device-header .device-checkbox {
      margin-right: 12px;
    }

    .device-header .entity-count {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-left: 8px;
    }

    /* Entity rows */
    .entity-row {
      display: flex;
      align-items: center;
      padding: 10px 16px 10px 64px;
      border-bottom: 1px solid var(--divider-color);
    }

    .entity-row:hover {
      background: var(--secondary-background-color);
    }

    .entity-row .entity-checkbox {
      margin-right: 12px;
    }

    .entity-row .entity-info {
      flex: 1;
      min-width: 0;
    }

    .entity-row .entity-name {
      font-weight: 400;
      display: block;
    }

    .entity-row .entity-id {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .entity-row .entity-status {
      margin-left: 12px;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-battery {
      background: rgba(255, 152, 0, 0.2);
      color: var(--warning-color, #ff9800);
    }

    .status-unavailable {
      background: rgba(244, 67, 54, 0.2);
      color: var(--error-color, #f44336);
    }

    .status-unknown {
      background: rgba(158, 158, 158, 0.2);
      color: var(--secondary-text-color, #9e9e9e);
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--secondary-text-color);
    }

    .empty-state-icon {
      font-size: 64px;
      margin-bottom: 16px;
      opacity: 0.3;
    }

    /* Standalone entities (no device) */
    .standalone-section {
      border-top: 2px solid var(--divider-color);
    }

    .standalone-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: var(--secondary-background-color);
      font-weight: 500;
      font-size: 14px;
      color: var(--secondary-text-color);
      cursor: pointer;
    }

    .standalone-header .expand-icon {
      margin-right: 8px;
      transition: transform 0.2s;
    }

    .standalone-header .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .excluded-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary-color);
      margin-left: 8px;
    }

    .device-excluded-note {
      font-size: 11px;
      color: var(--secondary-text-color);
      font-style: italic;
      margin-left: 4px;
    }
  `,e([pe({type:Array})],Ce.prototype,"devices",void 0),e([pe({type:String})],Ce.prototype,"filterMode",void 0),e([pe({type:String})],Ce.prototype,"searchQuery",void 0),e([pe({type:Boolean})],Ce.prototype,"hideUnknown",void 0),e([ue()],Ce.prototype,"_expandedIntegrations",void 0),e([ue()],Ce.prototype,"_expandedDevices",void 0),Ce=e([le("exclusions-table")],Ce);let Me=class extends ae{constructor(){super(...arguments),this.narrow=!1,this._devices=[],this._settings={excluded_entities:[],excluded_devices:[],battery_threshold:20},this._filterMode="all",this._searchQuery="",this._hideUnknown=!1,this._loading=!0}connectedCallback(){super.connectedCallback(),this._loadData()}render(){if(this._loading)return L`
        <div class="app-toolbar">
          <button class="menu-button" @click=${this._toggleMenu} title="Menu">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
          </button>
          <div class="app-title">Device Health</div>
        </div>
        <div class="loading">
          <div>Loading devices...</div>
        </div>
      `;const e=this._calculateStats();return L`
      <div class="app-toolbar">
        <button class="menu-button" @click=${this._toggleMenu} title="Menu">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>
        <div class="app-title">Device Health</div>
      </div>

      <div class="content">
        <div class="stats">
        <div class="stat-card">
          <div class="stat-value">${e.total}</div>
          <div class="stat-label">Problem Devices</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${e.excluded}</div>
          <div class="stat-label">Excluded</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${e.reported}</div>
          <div class="stat-label">Will Be Reported</div>
        </div>
      </div>

        <filter-toolbar
          .filterMode=${this._filterMode}
          .searchQuery=${this._searchQuery}
          .batteryThreshold=${this._settings.battery_threshold}
          .hideUnknown=${this._hideUnknown}
          @filter-changed=${this._handleFilterChanged}
          @search-changed=${this._handleSearchChanged}
          @threshold-changed=${this._handleThresholdChanged}
          @hide-unknown-changed=${this._handleHideUnknownChanged}
        ></filter-toolbar>

        <exclusions-table
          .devices=${this._devices}
          .filterMode=${this._filterMode}
          .searchQuery=${this._searchQuery}
          .hideUnknown=${this._hideUnknown}
          @toggle-exclusion=${this._handleToggleExclusion}
          @toggle-device-exclusion=${this._handleToggleDeviceExclusion}
        ></exclusions-table>
      </div>
    `}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}async _loadData(){try{this._loading=!0;const[e,t]=await Promise.all([_e(this.hass),ve(this.hass,this._settings.battery_threshold)]);this._settings=e,this._devices=t}catch(e){console.error("Failed to load data:",e)}finally{this._loading=!1}}async _handleToggleExclusion(e){const{entityId:t}=e.detail;try{const e=await async function(e,t){return await e.callWS({type:"device_health_exclusions/toggle_exclusion",entity_id:t})}(this.hass,t);this._devices=this._devices.map(i=>i.entity_id===t?{...i,is_excluded:e.is_excluded,is_entity_excluded:e.is_excluded}:i),e.is_excluded?this._settings={...this._settings,excluded_entities:[...this._settings.excluded_entities,t]}:this._settings={...this._settings,excluded_entities:this._settings.excluded_entities.filter(e=>e!==t)}}catch(e){console.error("Failed to toggle exclusion:",e)}}async _handleToggleDeviceExclusion(e){const{deviceId:t}=e.detail;try{const e=await async function(e,t){return await e.callWS({type:"device_health_exclusions/toggle_device_exclusion",device_id:t})}(this.hass,t);this._devices=this._devices.map(i=>i.device_id===t?{...i,is_device_excluded:e.is_excluded,is_excluded:e.is_excluded||i.is_entity_excluded}:i),e.is_excluded?this._settings={...this._settings,excluded_devices:[...this._settings.excluded_devices,t]}:this._settings={...this._settings,excluded_devices:this._settings.excluded_devices.filter(e=>e!==t)}}catch(e){console.error("Failed to toggle device exclusion:",e)}}_handleFilterChanged(e){this._filterMode=e.detail.filterMode}_handleSearchChanged(e){this._searchQuery=e.detail.searchQuery}_handleHideUnknownChanged(e){this._hideUnknown=e.detail.hideUnknown}async _handleThresholdChanged(e){const t=e.detail.batteryThreshold;try{await async function(e,t,i){await e.callWS({type:"device_health_exclusions/update_exclusions",excluded_entities:t,...i&&{battery_threshold:i}})}(this.hass,this._settings.excluded_entities,t),this._settings={...this._settings,battery_threshold:t},await this._loadData()}catch(e){console.error("Failed to update threshold:",e)}}_calculateStats(){const e=this._devices.length,t=this._devices.filter(e=>e.is_excluded).length;return{total:e,excluded:t,reported:e-t}}};Me.styles=ge,e([pe({attribute:!1})],Me.prototype,"hass",void 0),e([pe({type:Boolean,reflect:!0})],Me.prototype,"narrow",void 0),e([ue()],Me.prototype,"_devices",void 0),e([ue()],Me.prototype,"_settings",void 0),e([ue()],Me.prototype,"_filterMode",void 0),e([ue()],Me.prototype,"_searchQuery",void 0),e([ue()],Me.prototype,"_hideUnknown",void 0),e([ue()],Me.prototype,"_loading",void 0),Me=e([le("device-health-panel")],Me);export{Me as DeviceHealthPanel};
//# sourceMappingURL=device-health-panel.js.map
