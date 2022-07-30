var Me=Object.defineProperty;var de=Object.getOwnPropertySymbols;var Pe=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable;var ve=(e,s,i)=>s in e?Me(e,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[s]=i,fe=(e,s)=>{for(var i in s||(s={}))Pe.call(s,i)&&ve(e,i,s[i]);if(de)for(var i of de(s))Ee.call(s,i)&&ve(e,i,s[i]);return e};import{ag as ze,aa as ee,l as R,U as m,ap as N,at as V,bA as we,b4 as Fe,bB as Oe,ad as w,bC as Qe,bD as We,bE as je,bw as p,bF as De,br as te,bG as He,am as E,bH as Y,bI as be,bJ as Ne,bK as he,aZ as O,aB as Ve,ar as pe,an as Ke,bu as Ue}from"./index.930c38c3.js";let Te=!1;{const e=document.createElement("div"),s=document.createElement("div");e.setAttribute("dir","rtl"),e.style.width="1px",e.style.height="1px",e.style.overflow="auto",s.style.width="1000px",s.style.height="1px",document.body.appendChild(e),e.appendChild(s),e.scrollLeft=-1e3,Te=e.scrollLeft>=0,e.remove()}let Ge=0;const Je=["click","keydown"],Xe={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Ge++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Ze(e,s,i,o){const n=ze(we,()=>{console.error("QTab/QRouteTab component needs to be child of QTabs")}),{proxy:k}=ee(),_=R(null),I=R(null),b=R(null),h=m(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),g=m(()=>n.currentModel.value===e.name),x=m(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(g.value===!0?" q-tab--active"+(n.tabProps.value.activeClass?" "+n.tabProps.value.activeClass:"")+(n.tabProps.value.activeColor?` text-${n.tabProps.value.activeColor}`:"")+(n.tabProps.value.activeBgColor?` bg-${n.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&n.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||n.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(o!==void 0&&o.linkClass.value!==""?` ${o.linkClass.value}`:"")),B=m(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(n.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),z=m(()=>e.disable===!0||n.hasFocus.value===!0?-1:e.tabindex||0);function $(c,T){if(T!==!0&&_.value!==null&&_.value.focus(),e.disable!==!0){let y;if(o!==void 0)if(o.hasRouterLink.value===!0)y=()=>{c.__qNavigate=!0,n.avoidRouteWatcher=!0;const C=o.navigateToRouterLink(c);C===!1?n.avoidRouteWatcher=!1:C.then(q=>{n.avoidRouteWatcher=!1,q===void 0&&n.updateModel({name:e.name,fromRoute:!0})})};else{i("click",c);return}else y=()=>{n.updateModel({name:e.name,fromRoute:!1})};i("click",c,y),c.defaultPrevented!==!0&&y()}}function F(c){Qe(c,[13,32])?$(c,!0):We(c)!==!0&&c.keyCode>=35&&c.keyCode<=40&&n.onKbdNavigate(c.keyCode,k.$el)===!0&&je(c),i("keydown",c)}function M(){const c=n.tabProps.value.narrowIndicator,T=[],y=w("div",{ref:b,class:["q-tab__indicator",n.tabProps.value.indicatorClass]});e.icon!==void 0&&T.push(w(p,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&T.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&T.push(e.alertIcon!==void 0?w(p,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),c===!0&&T.push(y);const C=[w("div",{class:"q-focus-helper",tabindex:-1,ref:_}),w("div",{class:B.value},De(s.default,T))];return c===!1&&C.push(y),C}const L={name:m(()=>e.name),rootRef:I,tabIndicatorRef:b,routerProps:o};N(()=>{n.unregisterTab(L),n.recalculateScroll()}),V(()=>{n.registerTab(L),n.recalculateScroll()});function P(c,T){const y=fe({ref:I,class:x.value,tabindex:z.value,role:"tab","aria-selected":g.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:$,onKeydown:F},T);return Fe(w(c,y,M()),[[Oe,h.value]])}return{renderTab:P,$tabs:n}}var lt=te({name:"QTab",props:Xe,emits:Je,setup(e,{slots:s,emit:i}){const{renderTab:o}=Ze(e,s,i);return()=>o("div")}});function Ye(){const e=R(!He.value);return e.value===!1&&V(()=>{e.value=!0}),e}const Ce=typeof ResizeObserver!="undefined",ge=Ce===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var et=te({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:s}){let i=null,o,n={width:-1,height:-1};function k(b){b===!0||e.debounce===0||e.debounce==="0"?_():i===null&&(i=setTimeout(_,e.debounce))}function _(){if(clearTimeout(i),i=null,o){const{offsetWidth:b,offsetHeight:h}=o;(b!==n.width||h!==n.height)&&(n={width:b,height:h},s("resize",n))}}const I=ee();if(Object.assign(I.proxy,{trigger:k}),Ce===!0){let b;return V(()=>{E(()=>{o=I.proxy.$el.parentNode,o&&(b=new ResizeObserver(k),b.observe(o),_())})}),N(()=>{clearTimeout(i),b!==void 0&&(b.disconnect!==void 0?b.disconnect():o&&b.unobserve(o))}),Y}else{let g=function(){clearTimeout(i),h!==void 0&&(h.removeEventListener!==void 0&&h.removeEventListener("resize",k,be.passive),h=void 0)},x=function(){g(),o&&o.contentDocument&&(h=o.contentDocument.defaultView,h.addEventListener("resize",k,be.passive),_())};const b=Ye();let h;return V(()=>{E(()=>{o=I.proxy.$el,o&&x()})}),N(g),()=>{if(b.value===!0)return w("object",{style:ge.style,tabindex:-1,type:"text/html",data:ge.url,"aria-hidden":"true",onLoad:x})}}}});function tt(e,s,i){const o=i===!0?["left","right"]:["top","bottom"];return`absolute-${s===!0?o[0]:o[1]}${e?` text-${e}`:""}`}const at=["left","center","right","justify"],me=()=>{};var rt=te({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>at.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:s,emit:i}){const o=ee(),{proxy:{$q:n}}=o,{registerTick:k}=Ne(),{registerTimeout:_,removeTimeout:I}=he(),{registerTimeout:b}=he(),h=R(null),g=R(null),x=R(e.modelValue),B=R(!1),z=R(!0),$=R(!1),F=R(!1),M=m(()=>n.platform.is.desktop===!0||e.mobileArrows===!0),L=[],P=R(!1);let c=!1,T,y,C,q=M.value===!0?ne:Y;const ye=m(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:tt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Re=m(()=>`q-tabs__content--align-${B.value===!0?"left":F.value===!0?"justify":e.align}`),_e=m(()=>`q-tabs row no-wrap items-center q-tabs--${B.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${M.value===!0&&e.outsideArrows===!0?"outside":"inside"}`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),xe=m(()=>"q-tabs__content row no-wrap items-center self-stretch hide-scrollbar relative-position "+Re.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")+(n.platform.is.mobile===!0?" scroll":"")),Q=m(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),W=m(()=>e.vertical!==!0&&n.lang.rtl===!0),K=m(()=>Te===!1&&W.value===!0);O(W,q),O(()=>e.modelValue,t=>{U({name:t,setCurrent:!0,skipEmit:!0})}),O(()=>e.outsideArrows,()=>{E(j())}),O(M,t=>{q=t===!0?ne:Y,E(j())});function U({name:t,setCurrent:a,skipEmit:l,fromRoute:d}){x.value!==t&&(l!==!0&&i("update:modelValue",t),(a===!0||e["onUpdate:modelValue"]===void 0)&&(Le(x.value,t),x.value=t)),d!==void 0&&(c=d)}function j(){k(()=>{o.isDeactivated!==!0&&o.isUnmounted!==!0&&ae({width:h.value.offsetWidth,height:h.value.offsetHeight})})}function ae(t){if(Q.value===void 0||g.value===null)return;const a=t[Q.value.container],l=Math.min(g.value[Q.value.scroll],Array.prototype.reduce.call(g.value.children,(r,v)=>r+(v[Q.value.content]||0),0)),d=a>0&&l>a;B.value!==d&&(B.value=d),d===!0&&E(q);const f=a<parseInt(e.breakpoint,10);F.value!==f&&(F.value=f)}function Le(t,a){const l=t!=null&&t!==""?L.find(f=>f.name.value===t):null,d=a!=null&&a!==""?L.find(f=>f.name.value===a):null;if(l&&d){const f=l.tabIndicatorRef.value,r=d.tabIndicatorRef.value;clearTimeout(T),f.style.transition="none",f.style.transform="none",r.style.transition="none",r.style.transform="none";const v=f.getBoundingClientRect(),u=r.getBoundingClientRect();r.style.transform=e.vertical===!0?`translate3d(0,${v.top-u.top}px,0) scale3d(1,${u.height?v.height/u.height:1},1)`:`translate3d(${v.left-u.left}px,0,0) scale3d(${u.width?v.width/u.width:1},1,1)`,E(()=>{T=setTimeout(()=>{r.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",r.style.transform="none"},70)})}d&&B.value===!0&&D(d.rootRef.value)}function D(t){const{left:a,width:l,top:d,height:f}=g.value.getBoundingClientRect(),r=t.getBoundingClientRect();let v=e.vertical===!0?r.top-d:r.left-a;if(v<0){g.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(v),q();return}v+=e.vertical===!0?r.height-f:r.width-l,v>0&&(g.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(v),q())}function ne(){const t=g.value;if(t!==null){const a=t.getBoundingClientRect(),l=e.vertical===!0?t.scrollTop:Math.abs(t.scrollLeft);W.value===!0?(z.value=Math.ceil(l+a.width)<t.scrollWidth-1,$.value=l>0):(z.value=l>0,$.value=e.vertical===!0?Math.ceil(l+a.height)<t.scrollHeight:Math.ceil(l+a.width)<t.scrollWidth)}}function oe(t){A(),ie(t),y=setInterval(()=>{ie(t)===!0&&A()},5)}function le(){oe(K.value===!0?Number.MAX_SAFE_INTEGER:0)}function re(){oe(K.value===!0?0:Number.MAX_SAFE_INTEGER)}function A(){clearInterval(y)}function qe(t,a){const l=Array.prototype.filter.call(g.value.children,u=>u===a||u.matches&&u.matches(".q-tab.q-focusable")===!0),d=l.length;if(d===0)return;if(t===36)return D(l[0]),!0;if(t===35)return D(l[d-1]),!0;const f=t===(e.vertical===!0?38:37),r=t===(e.vertical===!0?40:39),v=f===!0?-1:r===!0?1:void 0;if(v!==void 0){const u=W.value===!0?-1:1,S=l.indexOf(a)+v*u;return S>=0&&S<d&&(D(l[S]),l[S].focus({preventScroll:!0})),!0}}const Se=m(()=>K.value===!0?{get:t=>Math.abs(t.scrollLeft),set:(t,a)=>{t.scrollLeft=-a}}:e.vertical===!0?{get:t=>t.scrollTop,set:(t,a)=>{t.scrollTop=a}}:{get:t=>t.scrollLeft,set:(t,a)=>{t.scrollLeft=a}});function ie(t){const a=g.value,{get:l,set:d}=Se.value;let f=!1,r=l(a);const v=t<r?-1:1;return r+=v*5,r<0?(f=!0,r=0):(v===-1&&r<=t||v===1&&r>=t)&&(f=!0,r=t),d(a,r),q(),f}function G(){return L.filter(t=>t.routerProps!==void 0&&t.routerProps.hasRouterLink.value===!0)}function ke(){let t=null,a=c;const l={matchedLen:0,hrefLen:0,exact:!1,found:!1},{hash:d}=o.proxy.$route,f=x.value;let r=a===!0?me:u=>{f===u.name.value&&(a=!0,r=me)};const v=G();for(const u of v){const S=u.routerProps.exact.value===!0;if(u.routerProps[S===!0?"linkIsExactActive":"linkIsActive"].value!==!0||l.exact===!0&&S!==!0){r(u);continue}const J=u.routerProps.linkRoute.value,X=J.hash;if(S===!0){if(d===X){t=u.name.value;break}else if(d!==""&&X!==""){r(u);continue}}const Z=J.matched.length,ce=J.href.length-X.length;if(Z===l.matchedLen?ce>l.hrefLen:Z>l.matchedLen){t=u.name.value,Object.assign(l,{matchedLen:Z,hrefLen:ce,exact:S});continue}r(u)}(a===!0||t!==null)&&U({name:t,setCurrent:!0,fromRoute:!0})}function Ie(t){if(I(),P.value!==!0&&h.value!==null&&t.target&&typeof t.target.closest=="function"){const a=t.target.closest(".q-tab");a&&h.value.contains(a)===!0&&(P.value=!0)}}function Ae(){_(()=>{P.value=!1},30)}function H(){se.avoidRouteWatcher!==!0&&b(ke)}function Be(t){L.push(t),G().length>0&&(C===void 0&&(C=O(()=>o.proxy.$route,H)),H())}function $e(t){L.splice(L.indexOf(t),1),C!==void 0&&(G().length===0&&(C(),C=void 0),H())}const se={currentModel:x,tabProps:ye,hasFocus:P,registerTab:Be,unregisterTab:$e,verifyRouteModel:H,updateModel:U,recalculateScroll:j,onKbdNavigate:qe,avoidRouteWatcher:!1};Ve(we,se),N(()=>{clearTimeout(T),C!==void 0&&C()});let ue=!1;return pe(()=>{ue=!0}),Ke(()=>{ue===!0&&j()}),()=>{const t=[w(et,{onResize:ae}),w("div",{ref:g,class:xe.value,onScroll:q},Ue(s.default))];return M.value===!0&&t.push(w(p,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(z.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||n.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedown:le,onTouchstartPassive:le,onMouseup:A,onMouseleave:A,onTouchend:A}),w(p,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+($.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||n.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedown:re,onTouchstartPassive:re,onMouseup:A,onMouseleave:A,onTouchend:A})),w("div",{ref:h,class:_e.value,role:"tablist",onFocusin:Ie,onFocusout:Ae},t)}}});export{rt as Q,lt as a,et as b,Te as r};
