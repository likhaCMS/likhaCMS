var z=Object.defineProperty,F=Object.defineProperties;var K=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var Q=(n,e,i)=>e in n?z(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i,C=(n,e)=>{for(var i in e||(e={}))W.call(e,i)&&Q(n,i,e[i]);if(N)for(var i of N(e))X.call(e,i)&&Q(n,i,e[i]);return n},y=(n,e)=>F(n,K(e));import{a5 as Y,bv as A,az as v,V as b,b2 as l,a3 as s,a2 as V,F as M,bM as j,b4 as B,bx as f,l as U,aH as k,X as G,Y as m,bN as L,B as c,W as Z,bw as D,bO as $,bP as ee,J as te}from"./index.a3fa791e.js";import{Q as oe,a as O,b as P,c as ne,E as se,d as ae,e as J,f as le,g as _}from"./EssentialLink.529330fc.js";import{C as H,Q as T,a as w,b as E,c as R,d as I,e as ie,f as re}from"./ClosePopup.9e02b0e7.js";import{b as q,Q as ge,a as x}from"./QTabs.d68e11be.js";const me=Y({name:"EssentialLink",data:()=>({links:[{icon:"",label:"Page Builder",caption:"Drag & Drop Page Builder",to:"/page-editor"}]})}),de=V("Logout");function pe(n,e,i,r,t,a){return n.$global.dev?(v(),b(f,{key:0,dense:"",round:"",label:n.$usernameAvatar.value,dark:"",color:"blue-grey-10","text-color":"secondary"},{default:l(()=>[s(ne,{anchor:"bottom right",self:"top right"},{default:l(()=>[s(oe,{style:{"min-width":"100px"}},{default:l(()=>[s(O,null,{default:l(()=>[s(P,null,{default:l(()=>[V(M(n.$global.dev.email),1)]),_:1})]),_:1}),s(j),B((v(),b(O,{onClick:n.$logoutLikhaUser,clickable:""},{default:l(()=>[s(P,null,{default:l(()=>[de]),_:1})]),_:1},8,["onClick"])),[[H]])]),_:1})]),_:1})]),_:1},8,["label"])):(v(),b(f,{key:1,dense:"",icon:"fa-brands fa-github",label:"Login",dark:"",color:"blue-grey-10","text-color":"secondary",onClick:e[0]||(e[0]=d=>n.$popupCenter({url:n.$likhaAPI.defaults.baseURL+"/connect/github",title:"LikhaCMS Login",w:900,h:600}))}))}var ue=A(me,[["render",pe]]);const he={components:{EssentialLink:se,loginStatus:ue},beforeUnmount(){document.removeEventListener("keydown",this.ctrlSave),this.editor&&this.editor.model&&(this.editor.model.dispose(),this.editor.dispose())},mounted(){document.addEventListener("keydown",this.ctrlSave)},async beforeMount(){const{name:n}=this.$route.params;this.getComponents(),this.getPages(),await this.getPage(n)},computed:{hasChanges(){let n=JSON.stringify(this.page.headerComponents);return n+=JSON.stringify(this.page.leftComponents),n+=JSON.stringify(this.page.components),n+=JSON.stringify(this.page.rightComponents),n+=JSON.stringify(this.page.footerComponents),this.page.origComponents!==n}},methods:{preview(){window.open(this.$previewHost+this.env+this.page.path,"_blank").focus()},openBuilder(){window.open("https://quasar.dev/layout-builder","_blank").focus()},removeComponent(n,e,i){this.$q.dialog({title:"Remove Component",message:`Would you like remove <${n} /> ?`,focus:"none",cancel:!0,persistent:!0}).onOk(()=>{this.page[i].splice(e,1),this.page[i]=this.page[i].map((r,t)=>y(C({},r),{order:t}))}).onOk(()=>{}).onCancel(()=>{}).onDismiss(()=>{})},async clone(n){this.clonedComponent={name:n.name,props:{}}},async getPages(n){this.loading=!0;const e={};n&&(e.$or=[{name:{$containsi:n}},{path:{$containsi:n}},{components:{$containsi:n}}]);const i=this.$qs.stringify({filters:e,sort:["name:desc"],pagination:{start:0,limit:10}});this.debounce=this.$debounce(async()=>{this.pages=(await this.$likhaAPI.get("/pages?"+i)).data.data.map(r=>r.attributes.name)},1250),this.debounce(),this.loading=!1},async changedComponents(n,e){if(n.moved){const i=this.page[e].findIndex(r=>r.name!==n.moved.element.name&&r.order===n.moved.newIndex);this.page[e][i].order=i}if(n.added){if(this.clonedComponent){const{name:i,props:r}=this.clonedComponent,t=[{name:i,props:r,order:n.added.newIndex},...this.page[e]].filter(a=>a.name).sort((a,d)=>a.order-d.order).map((a,d)=>y(C({},a),{order:d}));this.page[e]=t,delete this.clonedComponent;return}this.page[e]=this.page[e].map((i,r)=>y(C({},i),{order:r}))}},checkMove(n){n.draggedContext.element.order=n.draggedContext.futureIndex},async openTemplateEditor(){this.showPageTemplate=!0,this.editor&&(this.editor.model.dispose(),this.editor.dispose()),setTimeout(()=>{this.editor=this.$monaco.editor.create(this.$refs.editor,{value:this.page.template,language:"html",automaticLayout:!0,scrollBeyondLastLine:!1,theme:"vs-dark"}),this.editor.onKeyDown(n=>{const{keyCode:e,ctrlKey:i,metaKey:r}=n;e===49&&(r||i)&&(n.preventDefault(),this.templateHasChanges&&this.save())}),this.editor.model=this.editor.getModel(),this.editor.model.onDidChangeContent(()=>{this.templateHasChanges=this.editor.model.getValue()!==this.page.template})},300)},async getPage(n){this.loading=!0;const e={};n&&(e.$or=[{name:{$containsi:n}},{path:{$containsi:n}},{components:{$containsi:n}}]);const i=this.$qs.stringify({filters:e,sort:["name:desc"],pagination:{start:0,limit:10}}),r=(await this.$likhaAPI.get("/pages?"+i)).data.data[0],t=C({id:r.id},r.attributes);["header","left","","right","footer"].forEach(u=>{let h="components";u&&(h=u+"Components"),t[h]=new Function("return "+t[h])().sort((S,o)=>S.order-o.order)}),this.page=t;let d=JSON.stringify(this.page.headerComponents);d+=JSON.stringify(this.page.leftComponents),d+=JSON.stringify(this.page.components),d+=JSON.stringify(this.page.rightComponents),d+=JSON.stringify(this.page.footerComponents),this.page.origComponents=d,this.debounce(),this.loading=!1},async getComponents(n){this.loading=!0;const e={};n&&(e.$or=[{name:{$containsi:n}},{templateDev:{$containsi:n}},{templateStaging:{$containsi:n}},{template:{$containsi:n}}]);const i=this.$qs.stringify({filters:e,sort:["name:desc"],pagination:{start:0,limit:10}});this.debounce=this.$debounce(async()=>{this.components=(await this.$likhaAPI.get("/components?"+i)).data.data.map(r=>y(C({},r.attributes),{props:{}}))},1250),this.debounce(),this.loading=!1},async ctrlSave(n){if(!(n.keyCode===83&&n.ctrlKey))return!1;n.preventDefault(),this.codeHasChanges&&this.templateHasChanges&&this.save()},async save(){var d,u;const n=this.$JSON5.stringify(this.page.headerComponents,{space:2}),e=this.$JSON5.stringify(this.page.leftComponents,{space:2}),i=this.$JSON5.stringify(this.page.components,{space:2}),r=this.$JSON5.stringify(this.page.rightComponents,{space:2}),t=this.$JSON5.stringify(this.page.footerComponents,{space:2});await this.$likhaAPI.put("/pages/"+this.page.id,{data:{template:((d=this.editor)==null?void 0:d.model.getValue())||this.page.template,headerComponents:n,leftComponents:e,components:i,rightComponents:r,footerComponents:t}});let a=JSON.stringify(this.page.headerComponents);a+=JSON.stringify(this.page.leftComponents),a+=JSON.stringify(this.page.components),a+=JSON.stringify(this.page.rightComponents),a+=JSON.stringify(this.page.footerComponents),this.page.origComponents=a,this.page.template=((u=this.editor)==null?void 0:u.model.getValue())||this.page.template,this.templateHasChanges=!1,this.$q.notify({position:"top-right",color:"positive",icon:"verified",message:"Page Layout Saved!"})}},data(){return{showPageTemplate:!1,templateHasChanges:!1,code:`
        // console.log('html', this);
        const html = this.document.querySelector('html');
        // console.log('html', this);
        html.style.overflow = 'hidden';
      `,loading:!0,page:{name:"",id:-1,path:"",components:[],leftComponents:[],rightComponents:[],headerComponents:[],footerComponents:[],origComponents:""},pageComponents:[],pages:[],dragging:!1,searchText:"",env:"/dev-env",components:[]}},setup(){const n=U(!1),e=U(!1);return{leftDrawerOpen:n,toggleLeftDrawer(){n.value=!n.value},rightDrawerOpen:e,toggleRightDrawer(){}}}},ce=V(" No results "),fe={class:"q-gutter-sm"},ve={class:"row"},Ce={class:"column"},be={class:"column"},ye={class:"row"},ke={class:"left-drawer column"},we={class:"page-container col column text-center"},Ve={class:"column"},Se={class:"column"},_e={class:"absolute-top",style:{height:"50px"}},qe={class:"q-pa-md"},xe={class:"list-group-item"},Oe={style:{height:"150px"}},Pe=["srcdoc"],Ne={style:{"background-color":"rgba(0, 0, 0, 0.7)","backdrop-filter":"blur(4px)","-webkit-backdrop-filter":"blur(4px)"},class:"text-white handle absolute-bottom text-subtitle2 text-center q-pa-md"},Qe={class:"col"},Ue={ref:"editor",class:"fit"},Le=V(" Page Layout "),De={class:"q-gutter-md"};function Je(n,e,i,r,t,a){const d=k("login-status"),u=k("likha-iframe"),h=k("draggable"),S=k("essential-link");return v(),G(te,null,[s(I,{view:"lhh LpR lfr"},{default:l(()=>[s(T,{elevated:"",class:"bg-dark text-white"},{default:l(()=>[s(w,{class:"shadow-6"},{default:l(()=>[s(f,{dense:"",flat:"",round:"",icon:"menu",onClick:r.toggleLeftDrawer},null,8,["onClick"]),s(E,null,{default:l(()=>[s(ae,{ref:"qSelect",dark:"",filled:"",standout:"",style:{"max-width":"300px",height:"50px"},modelValue:t.page.name,"onUpdate:modelValue":[e[0]||(e[0]=o=>t.page.name=o),e[2]||(e[2]=async o=>{await a.getPage(o),n.$refs.qSelect.blur(),n.$updateURL("/page-editor/"+o),a.getPages()})],options:t.pages,"use-input":"","hide-selected":"","fill-input":"",loading:t.loading,onFilter:e[1]||(e[1]=(o,g,p)=>g(()=>{})),onInputValue:a.getPages,onPopupShow:a.getPages},{"no-option":l(()=>[s(O,null,{default:l(()=>[s(P,{class:"text-grey"},{default:l(()=>[ce]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","onInputValue","onPopupShow"])]),_:1}),m("span",fe,[s(f,{dense:"",icon:"preview",label:"preview \xA0",onClick:a.preview},null,8,["onClick"]),s(f,{dense:"",disabled:!a.hasChanges,icon:"save",label:"save \xA0",onClick:a.save},null,8,["disabled","onClick"]),s(d)])]),_:1}),m("div",ve,[s(L,{modelValue:t.page.path,"onUpdate:modelValue":e[3]||(e[3]=o=>t.page.path=o),readonly:"",dense:"",dark:"",label:"path",class:"q-ma-sm"},null,8,["modelValue"]),s(q),s(f,{icon:"dashboard",label:"Page Layout",onClick:a.openTemplateEditor,class:"q-pr-md",flat:"",color:"secondary",dense:""},null,8,["onClick"]),s(ge,{align:"right",dense:"",modelValue:t.env,"onUpdate:modelValue":e[4]||(e[4]=o=>t.env=o)},{default:l(()=>[s(x,{name:"/dev-env",label:"dev"}),s(x,{name:"/staging-env",label:"staging"}),s(x,{name:"",label:"prod"})]),_:1},8,["modelValue"])])]),_:1}),s(R,null,{default:l(()=>[m("div",Ce,[m("div",be,[t.page.headerComponents?(v(),b(h,{key:0,class:c(["dragArea list-group items-center",{"q-gutter-md q-ma-sm bg-cyan-2 q-pa-sm min-size":t.dragging}]),"ghost-class":"ghost",handle:".handle",modelValue:t.page.headerComponents,"onUpdate:modelValue":e[5]||(e[5]=o=>t.page.headerComponents=o),"item-key":"name",group:{name:"pageComponents",pull:!0,put:!0},onStart:e[6]||(e[6]=o=>t.dragging=!0),onEnd:e[7]||(e[7]=o=>t.dragging=!1),move:a.checkMove,onChange:e[8]||(e[8]=o=>a.changedComponents(o,"headerComponents"))},{item:l(({element:o,index:g})=>[s(u,{modelValue:t.page.headerComponents[g],"onUpdate:modelValue":p=>t.page.headerComponents[g]=p,class:c(["list-group-item col",{"max-height-100":t.dragging}]),env:t.env,component:o,dragging:t.dragging,onRemove:p=>a.removeComponent(o.name,g,"headerComponents")},null,8,["modelValue","onUpdate:modelValue","class","env","component","dragging","onRemove"])]),_:1},8,["class","modelValue","move"])):Z("",!0)]),m("div",ye,[m("div",ke,[s(h,{class:c(["dragArea list-group items-center",{"q-gutter-md q-ma-sm bg-purple-2 q-pa-sm min-size":t.dragging}]),"ghost-class":"ghost",handle:".handle",modelValue:t.page.leftComponents,"onUpdate:modelValue":e[9]||(e[9]=o=>t.page.leftComponents=o),"item-key":"name",group:{name:"pageComponents",pull:!0,put:!0},onStart:e[10]||(e[10]=o=>t.dragging=!0),onEnd:e[11]||(e[11]=o=>t.dragging=!1),move:a.checkMove,onChange:e[12]||(e[12]=o=>a.changedComponents(o,"leftComponents"))},{item:l(({element:o,index:g})=>[s(u,{modelValue:t.page.leftComponents[g],"onUpdate:modelValue":p=>t.page.leftComponents[g]=p,class:c(["list-group-item col",{"max-height-100":t.dragging}]),env:t.env,component:o,dragging:t.dragging,onRemove:p=>a.removeComponent(o.name,g,"leftComponents")},null,8,["modelValue","onUpdate:modelValue","class","env","component","dragging","onRemove"])]),_:1},8,["class","modelValue","move"])]),m("div",we,[s(h,{class:c(["dragArea list-group items-center",{"q-gutter-md q-ma-sm bg-green-2 q-pa-sm min-size":t.dragging}]),"ghost-class":"ghost",handle:".handle",modelValue:t.page.components,"onUpdate:modelValue":e[13]||(e[13]=o=>t.page.components=o),"item-key":"name",group:{name:"pageComponents",pull:!0,put:!0},onStart:e[14]||(e[14]=o=>t.dragging=!0),onEnd:e[15]||(e[15]=o=>t.dragging=!1),move:a.checkMove,onChange:e[16]||(e[16]=o=>a.changedComponents(o,"components"))},{item:l(({element:o,index:g})=>[s(u,{modelValue:t.page.components[g],"onUpdate:modelValue":p=>t.page.components[g]=p,class:c(["list-group-item col",{"max-height-100":t.dragging}]),env:t.env,component:o,dragging:t.dragging,onRemove:p=>a.removeComponent(o.name,g,"components")},null,8,["modelValue","onUpdate:modelValue","class","env","component","dragging","onRemove"])]),_:1},8,["class","modelValue","move"])]),m("div",Ve,[s(h,{class:c(["dragArea list-group items-center",{"q-gutter-md q-ma-sm bg-purple-2 q-pa-sm min-size":t.dragging}]),"ghost-class":"ghost",handle:".handle",modelValue:t.page.rightComponents,"onUpdate:modelValue":e[17]||(e[17]=o=>t.page.rightComponents=o),"item-key":"name",group:{name:"pageComponents",pull:!0,put:!0},onStart:e[18]||(e[18]=o=>t.dragging=!0),onEnd:e[19]||(e[19]=o=>t.dragging=!1),move:a.checkMove,onChange:e[20]||(e[20]=o=>a.changedComponents(o,"rightComponents"))},{item:l(({element:o,index:g})=>[s(u,{modelValue:t.page.rightComponents[g],"onUpdate:modelValue":p=>t.page.rightComponents[g]=p,class:c(["list-group-item col",{"max-height-100":t.dragging}]),env:t.env,component:o,dragging:t.dragging,onRemove:p=>a.removeComponent(o.name,g,"rightComponents")},null,8,["modelValue","onUpdate:modelValue","class","env","component","dragging","onRemove"])]),_:1},8,["class","modelValue","move"])])]),m("div",Se,[s(h,{class:c(["dragArea list-group items-center",{"q-gutter-md q-ma-sm bg-cyan-2 q-pa-sm min-size":t.dragging}]),"ghost-class":"ghost",handle:".handle",modelValue:t.page.footerComponents,"onUpdate:modelValue":e[21]||(e[21]=o=>t.page.footerComponents=o),"item-key":"name",group:{name:"pageComponents",pull:!0,put:!0},onStart:e[22]||(e[22]=o=>t.dragging=!0),onEnd:e[23]||(e[23]=o=>t.dragging=!1),move:a.checkMove,onChange:e[24]||(e[24]=o=>a.changedComponents(o,"footerComponents"))},{item:l(({element:o,index:g})=>[s(u,{modelValue:t.page.footerComponents[g],"onUpdate:modelValue":p=>t.page.footerComponents[g]=p,class:c(["list-group-item col",{"max-height-100":t.dragging}]),env:t.env,component:o,dragging:t.dragging,onRemove:p=>a.removeComponent(o.name,g,"footerComponents")},null,8,["modelValue","onUpdate:modelValue","class","env","component","dragging","onRemove"])]),_:1},8,["class","modelValue","move"])])])]),_:1}),s(J,{modelValue:r.leftDrawerOpen,"onUpdate:modelValue":e[25]||(e[25]=o=>r.leftDrawerOpen=o),side:"left",elevated:"",onMouseleave:e[26]||(e[26]=o=>r.leftDrawerOpen=!1)},{default:l(()=>[s(S)]),_:1},8,["modelValue"]),s(J,{"show-if-above":"",modelValue:r.rightDrawerOpen,"onUpdate:modelValue":e[31]||(e[31]=o=>r.rightDrawerOpen=o),side:"right",class:"column col",elevated:""},{default:l(()=>[m("div",_e,[s(w,{class:"bg-dark text-white col"},{default:l(()=>[s(L,{dark:"",dense:"",standout:"",modelValue:t.searchText,"onUpdate:modelValue":[e[28]||(e[28]=o=>t.searchText=o),a.getComponents],class:"col","input-class":"text-right"},{append:l(()=>[t.searchText===""?(v(),b(D,{key:0,name:"search"})):(v(),b(D,{key:1,name:"clear",class:"cursor-pointer",onClick:e[27]||(e[27]=o=>t.searchText="")}))]),_:1},8,["modelValue","onUpdate:modelValue"])]),_:1})]),s(le,{class:"inset-shadow bg-grey-10",style:{height:"calc(100% - 50px)","margin-top":"50px"}},{default:l(()=>[m("div",qe,[s(h,{class:"dragArea list-group q-gutter-md","ghost-class":"ghost",clone:a.clone,list:this.components,group:{name:"pageComponents",pull:"clone",put:!1},"item-key":"name",onStart:e[29]||(e[29]=o=>t.dragging=!0),onEnd:e[30]||(e[30]=o=>t.dragging=!1)},{item:l(({element:o})=>[m("div",xe,[s($,null,{default:l(()=>[m("div",Oe,[m("iframe",{class:"shadow-transition fit",srcdoc:`
                        <iframe src="${n.$previewHost+t.env+"/lk-preview/"+o.name}" frameborder="0"
                          style="
                            -ms-transform: scale(0.80);
                            -moz-transform: scale(0.80);
                            -o-transform: scale(0.80);
                            -webkit-transform: scale(0.80);
                            transform: scale(0.80);

                            -ms-transform-origin: 0 0;
                            -moz-transform-origin: 0 0;
                            -o-transform-origin: 0 0;
                            -webkit-transform-origin: 0 0;
                            transform-origin: 0 0;
                          "
                          onload="function fnName () { ${t.code} }; fnName()"
                        ></iframe>
                      `},`\r
                    `,8,Pe),m("div",Ne,M(o.name),1)])]),_:2},1024)])]),_:1},8,["clone","list"])])]),_:1})]),_:1},8,["modelValue"])]),_:1}),s(ee,{modelValue:t.showPageTemplate,"onUpdate:modelValue":e[32]||(e[32]=o=>t.showPageTemplate=o),"full-width":""},{default:l(()=>[s(I,{view:"Lhh lpR fff",container:"",class:"bg-white"},{default:l(()=>[s(R,null,{default:l(()=>[s(ie,{class:"bg-dark row",style:{overflow:"hidden","max-height":"calc(100vh - 150px) !important"}},{default:l(()=>[m("div",Qe,[m("div",Ue,null,512)])]),_:1})]),_:1}),s(T,{class:"bg-secondary shadow-15"},{default:l(()=>[s(w,null,{default:l(()=>[s(f,{flat:"",round:"",dense:"",icon:"dashboard"}),s(E,null,{default:l(()=>[Le,s(f,{color:"info",flat:"",dense:"",round:"",icon:"help_outline",onClick:a.openBuilder},null,8,["onClick"])]),_:1}),s(q),B(s(f,{flat:"",round:"",dense:"",icon:"close"},null,512),[[H]])]),_:1})]),_:1}),s(re,{class:"bg-dark text-white shadow-up-10"},{default:l(()=>[s(w,null,{default:l(()=>[m("div",De,[s(_,{color:"green","text-color":"white",label:"<lk-page-components />"}),s(_,{color:"purple","text-color":"white",label:"<lk-page-[ left / right ]-components />"}),s(_,{color:"cyan","text-color":"white",label:"<lk-page-[ header / footer ]-components />"})]),s(q),s(f,{disabled:!t.templateHasChanges,color:"secondary",icon:"save",label:"save",onClick:a.save},null,8,["disabled","onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var Me=A(he,[["render",Je]]);export{Me as default};