import{aa as v,r as D,ao as V,az as h,V as w,b2 as s,a3 as e,cG as c,bM as p,cH as Q,b4 as B,bx as u,y as m,cz as S,cm as H,Y as P}from"./index.c1160921.js";import{u as g,C as z}from"./use-dialog-plugin-component.362cdb6a.js";const I=P("div",{class:"text-h6"},"Staging Deployment",-1),M={__name:"stagingDeploy",props:["component","codes"],emits:[...g.emits],setup(f){const l=f,{$likhaAPI:r}=v().appContext.config.globalProperties,t=D({props:[],summary:"",description:""});V(async()=>{});const{dialogRef:y,onDialogHide:C,onDialogOK:b,onDialogCancel:x}=g();async function k(){const i={},a={};for(const n of l.codes)i[n.prop+"Staging"]=n.value,a[n.prop]=n.value;await r.put("/components/"+l.component.id,{data:i});const{summary:o,description:_}=t,d={component:l.component.id,summary:o,description:_,codes:JSON.stringify(a)};await r.post("/versions",{data:d}),b(d)}return(i,a)=>(h(),w(H,{persistent:"",class:"z-top",ref_key:"dialogRef",ref:y,onHide:m(C)},{default:s(()=>[e(S,{class:"bg-dark text-white",style:{"min-width":"350px"}},{default:s(()=>[e(c,null,{default:s(()=>[I]),_:1}),e(c,{class:"q-pt-none"},{default:s(()=>[e(p,{dark:"",modelValue:t.summary,"onUpdate:modelValue":a[0]||(a[0]=o=>t.summary=o),type:"text",label:"Summary"},null,8,["modelValue"]),e(p,{dark:"",modelValue:t.description,"onUpdate:modelValue":a[1]||(a[1]=o=>t.description=o),type:"textarea",label:"Description",autogrow:"","input-style":"min-height: 64px;"},null,8,["modelValue"])]),_:1}),e(Q,{align:"right",class:"text-primary"},{default:s(()=>[B(e(u,{flat:"",label:"Cancel",onClick:m(x)},null,8,["onClick"]),[[z]]),e(u,{disabled:!t.summary,flat:"",label:"Commit",onClick:k},null,8,["disabled"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{M as default};
