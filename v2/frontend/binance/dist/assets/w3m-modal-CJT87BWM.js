const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CUz7G6kQ.js","assets/index-Dn4U-enM.js","assets/index-DprJ6iax.css"])))=>i.map(i=>d[i]);
import{aI as e,aJ as t,M as i,C as a,O as o,aK as s,A as n,E as r,aL as l,R as c,aM as d,U as h,i as w,S as u,aN as p,aO as m,aP as v,c as b,aQ as g}from"./index-Dn4U-enM.js";const f=e`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var y=function(e,t,i,a){var o,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};const k="scroll-lock";let C=class extends t{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=i.state.open,this.caipAddress=a.state.activeCaipAddress,this.caipNetwork=a.state.activeCaipNetwork,this.isSiweEnabled=o.state.isSiweEnabled,this.shake=i.state.shake,this.initializeTheming(),s.prefetch(),this.unsubscribe.push(i.subscribeKey("open",(e=>e?this.onOpen():this.onClose())),i.subscribeKey("shake",(e=>this.shake=e)),n.subscribeKey("siweStatus",(e=>this.onSiweStatusChange(e)),"eip155"),a.subscribeKey("activeCaipNetwork",(e=>this.onNewNetwork(e))),a.subscribeKey("activeCaipAddress",(e=>this.onNewAddress(e))),o.subscribeKey("isSiweEnabled",(e=>this.isSiweEnabled=e))),r.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),this.onRemoveKeyboardListener()}render(){return this.open?l`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e="ConnectingSiwe"===c.state.view,t="ApproveTransaction"===c.state.view;if(this.isSiweEnabled){const{SIWEController:a}=await d((async()=>{const{SIWEController:e}=await import("./index-CUz7G6kQ.js");return{SIWEController:e}}),__vite__mapDeps([0,1,2]));"success"!==a.state.status&&(e||t)?i.shake():i.close()}else i.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=g.state,i=h.getColorTheme(t);w(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),u.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=k,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${k}"]`);e&&e.remove()}onAddKeyboardListener(){var e;this.abortController=new AbortController;const t=null==(e=this.shadowRoot)?void 0:e.querySelector("wui-card");null==t||t.focus(),window.addEventListener("keydown",(e=>{if("Escape"===e.key)this.handleClose();else if("Tab"===e.key){const{tagName:i}=e.target;!i||i.includes("W3M-")||i.includes("WUI-")||null==t||t.focus()}}),this.abortController)}onRemoveKeyboardListener(){var e;null==(e=this.abortController)||e.abort(),this.abortController=void 0}onSiweStatusChange(e){"success"===e&&i.close()}async onNewAddress(e){var t;const a=this.caipAddress?p.getPlainAddress(this.caipAddress):void 0,o=e?p.getPlainAddress(e):void 0;if(o&&!(a===o)&&this.isSiweEnabled){const{SIWEController:e}=await d((async()=>{const{SIWEController:e}=await import("./index-CUz7G6kQ.js");return{SIWEController:e}}),__vite__mapDeps([0,1,2])),i="success"===n.state.siweStatus;!a&&o?this.onSiweNavigation():i&&a&&o&&a!==o&&(null==(t=e.state._client)?void 0:t.options.signOutOnAccountChange)&&(await e.signOut(),this.onSiweNavigation())}o||i.close(),this.caipAddress=e}async onNewNetwork(e){var t,i,a,o;if(!this.caipAddress)return void(this.caipNetwork=e);const s=null==(i=null==(t=this.caipNetwork)?void 0:t.id)?void 0:i.toString(),n=null==(a=null==e?void 0:e.id)?void 0:a.toString();if(s&&n&&s!==n)if(this.isSiweEnabled){const{SIWEController:e}=await d((async()=>{const{SIWEController:e}=await import("./index-CUz7G6kQ.js");return{SIWEController:e}}),__vite__mapDeps([0,1,2]));(null==(o=e.state._client)?void 0:o.options.signOutOnNetworkChange)?(await e.signOut(),this.onSiweNavigation()):c.goBack()}else c.goBack();this.caipNetwork=e}onSiweNavigation(){const e=a.state.activeChain===m.CHAIN.EVM;!("success"===n.state.siweStatus)&&e?this.open?c.replace("ConnectingSiwe"):i.open({view:"ConnectingSiwe"}):c.goBack()}};C.styles=f,y([v()],C.prototype,"open",void 0),y([v()],C.prototype,"caipAddress",void 0),y([v()],C.prototype,"caipNetwork",void 0),y([v()],C.prototype,"isSiweEnabled",void 0),y([v()],C.prototype,"shake",void 0),C=y([b("w3m-modal")],C);export{C as W3mModal};
