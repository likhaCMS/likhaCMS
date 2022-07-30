var A=Object.defineProperty;var F=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var E=(e,r,o)=>r in e?A(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,M=(e,r)=>{for(var o in r||(r={}))I.call(r,o)&&E(e,o,r[o]);if(F)for(var o of F(r))j.call(r,o)&&E(e,o,r[o]);return e};import{b as V}from"./QTabs.21b96ff0.js";import{br as L,ag as _,cv as O,l as z,U as f,aZ as w,ap as N,bO as K,ad as h,aa as P,aB as U,cz as D,bu as G,at as Z,bH as k,cd as J,bI as X,cA as Y,cB as ee,bG as te,c1 as R,r as C,ax as oe,bF as ne}from"./index.9fdffc92.js";var ue=L({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:r,emit:o}){const{proxy:{$q:a}}=P(),n=_(O,()=>{console.error("QHeader needs to be child of QLayout")}),s=z(parseInt(e.heightHint,10)),c=z(!0),b=f(()=>e.reveal===!0||n.view.value.indexOf("H")>-1||a.platform.is.ios&&n.isContainer.value===!0),g=f(()=>{if(e.modelValue!==!0)return 0;if(b.value===!0)return c.value===!0?s.value:0;const t=s.value-n.scroll.value.position;return t>0?t:0}),u=f(()=>e.modelValue!==!0||b.value===!0&&c.value!==!0),x=f(()=>e.modelValue===!0&&u.value===!0&&e.reveal===!0),y=f(()=>"q-header q-layout__section--marginal "+(b.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(u.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),p=f(()=>{const t=n.rows.value.top,v={};return t[0]==="l"&&n.left.space===!0&&(v[a.lang.rtl===!0?"right":"left"]=`${n.left.size}px`),t[2]==="r"&&n.right.space===!0&&(v[a.lang.rtl===!0?"left":"right"]=`${n.right.size}px`),v});function i(t,v){n.update("header",t,v)}function m(t,v){t.value!==v&&(t.value=v)}function T({height:t}){m(s,t),i("size",t)}function H(t){x.value===!0&&m(c,!0),o("focusin",t)}w(()=>e.modelValue,t=>{i("space",t),m(c,!0),n.animate()}),w(g,t=>{i("offset",t)}),w(()=>e.reveal,t=>{t===!1&&m(c,e.modelValue)}),w(c,t=>{n.animate(),o("reveal",t)}),w(n.scroll,t=>{e.reveal===!0&&m(c,t.direction==="up"||t.position<=e.revealOffset||t.position-t.inflectionPoint<100)});const $={};return n.instances.header=$,e.modelValue===!0&&i("size",s.value),i("space",e.modelValue),i("offset",g.value),N(()=>{n.instances.header===$&&(n.instances.header=void 0,i("size",0),i("offset",0),i("space",!1))}),()=>{const t=K(r.default,[]);return e.elevated===!0&&t.push(h("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(h(V,{debounce:0,onResize:T})),h("header",{class:y.value,style:p.value,onFocusin:H},t)}}}),ce=L({name:"QPageContainer",setup(e,{slots:r}){const{proxy:{$q:o}}=P(),a=_(O,()=>{console.error("QPageContainer needs to be child of QLayout")});U(D,!0);const n=f(()=>{const s={};return a.header.space===!0&&(s.paddingTop=`${a.header.size}px`),a.right.space===!0&&(s[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${a.right.size}px`),a.footer.space===!0&&(s.paddingBottom=`${a.footer.size}px`),a.left.space===!0&&(s[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${a.left.size}px`),s});return()=>h("div",{class:"q-page-container",style:n.value},G(r.default))}});const{passive:W}=X,le=["both","horizontal","vertical"];var ae=L({name:"QScrollObserver",props:{axis:{type:String,validator:e=>le.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:r}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let a=null,n,s;w(()=>e.scrollTarget,()=>{g(),b()});function c(){a!==null&&a();const y=Math.max(0,Y(n)),p=ee(n),i={top:y-o.position.top,left:p-o.position.left};if(e.axis==="vertical"&&i.top===0||e.axis==="horizontal"&&i.left===0)return;const m=Math.abs(i.top)>=Math.abs(i.left)?i.top<0?"up":"down":i.left<0?"left":"right";o.position={top:y,left:p},o.directionChanged=o.direction!==m,o.delta=i,o.directionChanged===!0&&(o.direction=m,o.inflectionPoint=o.position),r("scroll",M({},o))}function b(){n=J(s,e.scrollTarget),n.addEventListener("scroll",u,W),u(!0)}function g(){n!==void 0&&(n.removeEventListener("scroll",u,W),n=void 0)}function u(y){if(y===!0||e.debounce===0||e.debounce==="0")c();else if(a===null){const[p,i]=e.debounce?[setTimeout(c,e.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];a=()=>{i(p),a=null}}}const x=P();return Z(()=>{s=x.proxy.$el.parentNode,b()}),N(()=>{a!==null&&a(),g()}),Object.assign(x.proxy,{trigger:u,getPosition:()=>o}),k}}),de=L({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:r,emit:o}){const{proxy:{$q:a}}=P(),n=z(null),s=z(a.screen.height),c=z(e.container===!0?0:a.screen.width),b=z({position:0,direction:"down",inflectionPoint:0}),g=z(0),u=z(te.value===!0?0:R()),x=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),y=f(()=>e.container===!1?{minHeight:a.screen.height+"px"}:null),p=f(()=>u.value!==0?{[a.lang.rtl===!0?"left":"right"]:`${u.value}px`}:null),i=f(()=>u.value!==0?{[a.lang.rtl===!0?"right":"left"]:0,[a.lang.rtl===!0?"left":"right"]:`-${u.value}px`,width:`calc(100% + ${u.value}px)`}:null);function m(l){if(e.container===!0||document.qScrollPrevented!==!0){const d={position:l.position.top,direction:l.direction,directionChanged:l.directionChanged,inflectionPoint:l.inflectionPoint.top,delta:l.delta.top};b.value=d,e.onScroll!==void 0&&o("scroll",d)}}function T(l){const{height:d,width:S}=l;let q=!1;s.value!==d&&(q=!0,s.value=d,e.onScrollHeight!==void 0&&o("scroll-height",d),$()),c.value!==S&&(q=!0,c.value=S),q===!0&&e.onResize!==void 0&&o("resize",l)}function H({height:l}){g.value!==l&&(g.value=l,$())}function $(){if(e.container===!0){const l=s.value>g.value?R():0;u.value!==l&&(u.value=l)}}let t;const v={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:n,height:s,containerHeight:g,scrollbarWidth:u,totalWidth:f(()=>c.value+u.value),rows:f(()=>{const l=e.view.toLowerCase().split(" ");return{top:l[0].split(""),middle:l[1].split(""),bottom:l[2].split("")}}),header:C({size:0,offset:0,space:!1}),right:C({size:300,offset:0,space:!1}),footer:C({size:0,offset:0,space:!1}),left:C({size:300,offset:0,space:!1}),scroll:b,animate(){t!==void 0?clearTimeout(t):document.body.classList.add("q-body--layout-animate"),t=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),t=void 0},155)},update(l,d,S){v[l][d]=S}};if(U(O,v),R()>0){let S=function(){l=null,d.classList.remove("hide-scrollbar")},q=function(){if(l===null){if(d.scrollHeight>a.screen.height)return;d.classList.add("hide-scrollbar")}else clearTimeout(l);l=setTimeout(S,300)},Q=function(B){l!==null&&B==="remove"&&(clearTimeout(l),S()),window[`${B}EventListener`]("resize",q)},l=null;const d=document.body;w(()=>e.container!==!0?"add":"remove",Q),e.container!==!0&&Q("add"),oe(()=>{Q("remove")})}return()=>{const l=ne(r.default,[h(ae,{onScroll:m}),h(V,{onResize:T})]),d=h("div",{class:x.value,style:y.value,ref:e.container===!0?void 0:n,tabindex:-1},l);return e.container===!0?h("div",{class:"q-layout-container overflow-hidden",ref:n},[h(V,{onResize:H}),h("div",{class:"absolute-full",style:p.value},[h("div",{class:"scroll",style:i.value},[d])])]):d}}});export{ae as Q,ue as a,ce as b,de as c};
