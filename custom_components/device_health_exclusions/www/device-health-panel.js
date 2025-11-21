function e(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,v=g?g.emptyScript:"",x=_.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!d(e,t),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let m=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=s;const o=r.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,r=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??$)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[y("elementProperties")]=new Map,m[y("finalized")]=new Map,x?.({ReactiveElement:m}),(_.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=A.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,M=`<${C}>`,P=document,T=()=>P.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,z=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,G=P.createTreeWalker(P,129);function q(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,s=[];let r,o=2===t?"<svg>":3===t?"<math>":"",n=N;for(let t=0;t<i;t++){const i=e[t];let a,d,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,d=n.exec(i),null!==d);)l=n.lastIndex,n===N?"!--"===d[1]?n=H:void 0!==d[1]?n=z:void 0!==d[2]?(B.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=R):void 0!==d[3]&&(n=R):n===R?">"===d[0]?(n=r??N,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?R:'"'===d[3]?j:I):n===j||n===I?n=R:n===H||n===z?n=N:(n=R,r=void 0);const h=n===R&&e[t+1].startsWith("/>")?" ":"";o+=n===N?i+M:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+k+h):i+k+(-2===c?t:h)}return[q(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const n=e.length-1,a=this.parts,[d,c]=V(e,t);if(this.el=J.createElement(d,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=G.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(S)){const t=c[o++],i=s.getAttribute(e).split(k),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?ee:"?"===n[1]?te:"@"===n[1]?ie:Y}),s.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(e));if(B.test(s.tagName)){const e=s.textContent.split(k),t=e.length-1;if(t>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],T()),G.nextNode(),a.push({type:2,index:++r});s.append(e[t],T())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(k,e+1));)a.push({type:7,index:r}),e+=k.length-1}r++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,s){if(t===Q)return t;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(t=K(e,r._$AS(e,t.values),r,s)),t}let Z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);G.currentNode=s;let r=G.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new X(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new se(r,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(r=G.nextNode(),o++)}return G.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),U(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==Q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Z(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new J(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(void 0===r)e=K(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==Q,o&&(this._$AH=e);else{const s=e;let n,a;for(e=r[0],n=0;n<r.length-1;n++)a=K(this,s[i+n],t,n),a===Q&&(a=this._$AH[n]),o||=!U(a)||a!==this._$AH[n],a===W?e=W:e!==W&&(e+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class te extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends Y{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??W)===Q)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const re={I:X},oe=A.litHtmlPolyfillSupport;oe?.(J,X),(A.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ae=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(void 0===r){const e=i?.renderBefore??null;s._$litPart$=r=new X(t.insertBefore(T(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};ae._$litElement$=!0,ae.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ae});const de=ne.litElementPolyfillSupport;de?.({LitElement:ae}),(ne.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:$},he=(e=le,t,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,r,e)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];t.call(this,i),this.requestUpdate(s,r,e)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return pe({...e,state:!0,attribute:!1})}const _e=n`
  :host {
    display: block;
    padding: 16px;
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family);
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
`;async function ge(e,t){return(await e.callWS({type:"device_health_exclusions/get_problem_devices",battery_threshold:t})).devices}async function ve(e){return await e.callWS({type:"device_health_exclusions/get_exclusions"})}let xe=class extends ae{constructor(){super(...arguments),this.filterMode="all",this.searchQuery="",this.batteryThreshold=20}render(){return L`
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
      </div>
    `}_setFilter(e){this.filterMode=e,this.dispatchEvent(new CustomEvent("filter-changed",{detail:{filterMode:e}}))}_handleSearch(e){const t=e.target;this.searchQuery=t.value,this.dispatchEvent(new CustomEvent("search-changed",{detail:{searchQuery:this.searchQuery}}))}_handleThresholdChange(e){const t=e.target,i=parseInt(t.value,10);i>=5&&i<=50&&(this.batteryThreshold=i,this.dispatchEvent(new CustomEvent("threshold-changed",{detail:{batteryThreshold:i}})))}};xe.styles=n`
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      gap: 16px;
      align-items: center;
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
  `,e([pe({type:String})],xe.prototype,"filterMode",void 0),e([pe({type:String})],xe.prototype,"searchQuery",void 0),e([pe({type:Number})],xe.prototype,"batteryThreshold",void 0),xe=e([ce("filter-toolbar")],xe);
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
 */const{I:$e}=re,be=()=>document.createComment(""),me=(e,t,i)=>{const s=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore(be(),r),o=s.insertBefore(be(),r);i=new $e(t,o,e,e.options)}else{const t=i._$AB.nextSibling,o=i._$AM,n=o!==e;if(n){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==o._$AU&&i._$AP(t)}if(t!==r||n){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,r),e=t}}}return i},Ae=(e,t,i=e)=>(e._$AI(t,i),e),we={},Ee=e=>{e._$AR(),e._$AA.remove()},Se=(e,t,i)=>{const s=new Map;for(let r=t;r<=i;r++)s.set(e[r],r);return s},ke=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends fe{constructor(e){if(super(e),e.type!==ye)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let s;void 0===i?i=t:void 0!==t&&(s=t);const r=[],o=[];let n=0;for(const t of e)r[n]=s?s(t,n):n,o[n]=i(t,n),n++;return{values:o,keys:r}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,s]){const r=(e=>e._$AH)(e),{values:o,keys:n}=this.dt(t,i,s);if(!Array.isArray(r))return this.ut=n,o;const a=this.ut??=[],d=[];let c,l,h=0,p=r.length-1,u=0,_=o.length-1;for(;h<=p&&u<=_;)if(null===r[h])h++;else if(null===r[p])p--;else if(a[h]===n[u])d[u]=Ae(r[h],o[u]),h++,u++;else if(a[p]===n[_])d[_]=Ae(r[p],o[_]),p--,_--;else if(a[h]===n[_])d[_]=Ae(r[h],o[_]),me(e,d[_+1],r[h]),h++,_--;else if(a[p]===n[u])d[u]=Ae(r[p],o[u]),me(e,r[h],r[p]),p--,u++;else if(void 0===c&&(c=Se(n,u,_),l=Se(a,h,p)),c.has(a[h]))if(c.has(a[p])){const t=l.get(n[u]),i=void 0!==t?r[t]:null;if(null===i){const t=me(e,r[h]);Ae(t,o[u]),d[u]=t}else d[u]=Ae(i,o[u]),me(e,r[h],i),r[t]=null;u++}else Ee(r[p]),p--;else Ee(r[h]),h++;for(;u<=_;){const t=me(e,d[_+1]);Ae(t,o[u]),d[u++]=t}for(;h<=p;){const e=r[h++];null!==e&&Ee(e)}return this.ut=n,((e,t=we)=>{e._$AH=t})(e,d),Q}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ce=class extends ae{constructor(){super(...arguments),this.devices=[],this.filterMode="all",this.searchQuery="",this._expandedIntegrations=new Set,this._expandedDevices=new Set,this._initialExpansionDone=!1}connectedCallback(){super.connectedCallback(),this._initialExpansionDone=!1}updated(e){e.has("devices")&&!this._initialExpansionDone&&this.devices.length>0&&(this._expandAllGroups(),this._initialExpansionDone=!0)}_expandAllGroups(){const e=this._getGroupedDevices();this._expandedIntegrations=new Set(e.map(e=>e.integration)),this._expandedDevices=new Set(e.flatMap(e=>e.devices.map(t=>t.device_id||`standalone-${e.integration}`)))}render(){const e=this._getGroupedDevices();return 0===e.length?L`
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div>No devices found matching your filters</div>
        </div>
      `:L`
      <div class="table-container">
        ${ke(e,e=>e.integration,e=>this._renderIntegrationGroup(e))}
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
            ${ke(e.devices,t=>t.device_id||`standalone-${e.integration}`,t=>this._renderDeviceGroup(t,e.integration))}
          </div>
        `:""}
      </div>
    `}_renderDeviceGroup(e,t){const i=e.device_id||`standalone-${t}`,s=this._expandedDevices.has(i),r=e.entities.length,o=e.excluded_entity_count;return L`
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
            ${o}/${r} entities excluded
          </span>
        </div>
        ${s?L`
          <div class="device-content">
            ${ke(e.entities,e=>e.entity_id,t=>this._renderEntityRow(t,e.is_excluded))}
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
    `}_renderStatusBadge(e){return"unavailable"===e.state||"unknown"===e.state?L`
        <span class="status-badge status-unavailable">
          ${e.state}
        </span>
      `:null!==e.battery_level?L`
        <span class="status-badge status-battery">
          ${e.battery_level}% battery
        </span>
      `:L`<span>-</span>`}_getGroupedDevices(){let e=this._getFilteredDevices();const t=new Map;for(const i of e){const e=i.integration||"Other",s=i.device_id;t.has(e)||t.set(e,new Map);const r=t.get(e);r.has(s)||r.set(s,[]),r.get(s).push(i)}const i=[];for(const[e,s]of t){const t=[];let r=0,o=0;for(const[i,n]of s){const s=n[0],a=n.some(e=>e.is_device_excluded),d=n.filter(e=>e.is_excluded).length;t.push({device_id:i,device_name:s.device_name||s.name||"Unknown Device",integration:e,manufacturer:s.manufacturer,model:s.model,entities:n,is_excluded:a,excluded_entity_count:d}),r+=n.length,o+=d}t.sort((e,t)=>e.is_excluded!==t.is_excluded?e.is_excluded?1:-1:e.device_name.localeCompare(t.device_name)),i.push({integration:e,devices:t,total_entities:r,excluded_entity_count:o})}return i.sort((e,t)=>"Other"===e.integration?1:"Other"===t.integration?-1:e.integration.localeCompare(t.integration)),i}_getFilteredDevices(){let e=this.devices;if("excluded"===this.filterMode?e=e.filter(e=>e.is_excluded):"not_excluded"===this.filterMode&&(e=e.filter(e=>!e.is_excluded)),this.searchQuery){const t=this.searchQuery.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.entity_id.toLowerCase().includes(t)||e.device_name&&e.device_name.toLowerCase().includes(t)||e.integration&&e.integration.toLowerCase().includes(t))}return e}_formatIntegrationName(e){return e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}_toggleIntegration(e){const t=new Set(this._expandedIntegrations);t.has(e)?t.delete(e):t.add(e),this._expandedIntegrations=t}_toggleDevice(e){const t=new Set(this._expandedDevices);t.has(e)?t.delete(e):t.add(e),this._expandedDevices=t}_toggleEntity(e){this.dispatchEvent(new CustomEvent("toggle-exclusion",{detail:{entityId:e},bubbles:!0,composed:!0}))}_toggleDeviceExclusion(e){this.dispatchEvent(new CustomEvent("toggle-device-exclusion",{detail:{deviceId:e},bubbles:!0,composed:!0}))}};Ce.styles=n`
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
  `,e([pe({type:Array})],Ce.prototype,"devices",void 0),e([pe({type:String})],Ce.prototype,"filterMode",void 0),e([pe({type:String})],Ce.prototype,"searchQuery",void 0),e([ue()],Ce.prototype,"_expandedIntegrations",void 0),e([ue()],Ce.prototype,"_expandedDevices",void 0),Ce=e([ce("exclusions-table")],Ce);let Me=class extends ae{constructor(){super(...arguments),this._devices=[],this._settings={excluded_entities:[],excluded_devices:[],battery_threshold:20},this._filterMode="all",this._searchQuery="",this._loading=!0}connectedCallback(){super.connectedCallback(),this._loadData()}render(){if(this._loading)return L`
        <div class="loading">
          <div>Loading devices...</div>
        </div>
      `;const e=this._calculateStats();return L`
      <div class="header">
        <h1>Device Health Exclusions Manager</h1>
      </div>

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
        @filter-changed=${this._handleFilterChanged}
        @search-changed=${this._handleSearchChanged}
        @threshold-changed=${this._handleThresholdChanged}
      ></filter-toolbar>

      <exclusions-table
        .devices=${this._devices}
        .filterMode=${this._filterMode}
        .searchQuery=${this._searchQuery}
        @toggle-exclusion=${this._handleToggleExclusion}
        @toggle-device-exclusion=${this._handleToggleDeviceExclusion}
      ></exclusions-table>
    `}async _loadData(){try{this._loading=!0;const[e,t]=await Promise.all([ve(this.hass),ge(this.hass,this._settings.battery_threshold)]);this._settings=e,this._devices=t}catch(e){console.error("Failed to load data:",e)}finally{this._loading=!1}}async _handleToggleExclusion(e){const{entityId:t}=e.detail;try{const e=await async function(e,t){return await e.callWS({type:"device_health_exclusions/toggle_exclusion",entity_id:t})}(this.hass,t);this._devices=this._devices.map(i=>i.entity_id===t?{...i,is_excluded:e.is_excluded,is_entity_excluded:e.is_excluded}:i),e.is_excluded?this._settings={...this._settings,excluded_entities:[...this._settings.excluded_entities,t]}:this._settings={...this._settings,excluded_entities:this._settings.excluded_entities.filter(e=>e!==t)}}catch(e){console.error("Failed to toggle exclusion:",e)}}async _handleToggleDeviceExclusion(e){const{deviceId:t}=e.detail;try{const e=await async function(e,t){return await e.callWS({type:"device_health_exclusions/toggle_device_exclusion",device_id:t})}(this.hass,t);this._devices=this._devices.map(i=>i.device_id===t?{...i,is_device_excluded:e.is_excluded,is_excluded:e.is_excluded||i.is_entity_excluded}:i),e.is_excluded?this._settings={...this._settings,excluded_devices:[...this._settings.excluded_devices,t]}:this._settings={...this._settings,excluded_devices:this._settings.excluded_devices.filter(e=>e!==t)}}catch(e){console.error("Failed to toggle device exclusion:",e)}}_handleFilterChanged(e){this._filterMode=e.detail.filterMode}_handleSearchChanged(e){this._searchQuery=e.detail.searchQuery}async _handleThresholdChanged(e){const t=e.detail.batteryThreshold;try{await async function(e,t,i){await e.callWS({type:"device_health_exclusions/update_exclusions",excluded_entities:t,...i&&{battery_threshold:i}})}(this.hass,this._settings.excluded_entities,t),this._settings={...this._settings,battery_threshold:t},await this._loadData()}catch(e){console.error("Failed to update threshold:",e)}}_calculateStats(){const e=this._devices.length,t=this._devices.filter(e=>e.is_excluded).length;return{total:e,excluded:t,reported:e-t}}};Me.styles=_e,e([ue()],Me.prototype,"_devices",void 0),e([ue()],Me.prototype,"_settings",void 0),e([ue()],Me.prototype,"_filterMode",void 0),e([ue()],Me.prototype,"_searchQuery",void 0),e([ue()],Me.prototype,"_loading",void 0),Me=e([ce("device-health-panel")],Me);export{Me as DeviceHealthPanel};
//# sourceMappingURL=device-health-panel.js.map
