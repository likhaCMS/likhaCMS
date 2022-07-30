var E=Object.defineProperty,H=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var D=(e,t,r)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,O=(e,t)=>{for(var r in t||(t={}))W.call(t,r)&&D(e,r,t[r]);if(P)for(var r of P(t))j.call(t,r)&&D(e,r,t[r]);return e},I=(e,t)=>H(e,V(t));var _=(e,t,r)=>(D(e,typeof t!="symbol"?t+"":t,r),r);import{t as B,m as U}from"./bootLibs.e73f6a69.js";import"./index.9ef8835f.js";import"./QTabs.e349332a.js";import"./QSpace.86cac1f6.js";import"./_commonjsHelpers.2cf1d77b.js";/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/var N=Object.defineProperty,$=Object.getOwnPropertyDescriptor,z=Object.getOwnPropertyNames,G=Object.prototype.hasOwnProperty,J=(e,t,r)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Q=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of z(t))!G.call(e,a)&&(r||a!=="default")&&N(e,a,{get:()=>t[a],enumerable:!(i=$(t,a))||i.enumerable});return e},f=(e,t,r)=>(J(e,typeof t!="symbol"?t+"":t,r),r),n={};Q(n,U);var q=class{constructor(e,t){_(this,"_modeId");_(this,"_defaults");_(this,"_configChangeListener");_(this,"_updateExtraLibsToken");_(this,"_extraLibsChangeListener");_(this,"_worker");_(this,"_client");this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange(()=>this._stopWorker()),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange(()=>this._updateExtraLibs())}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}async _updateExtraLibs(){if(!this._worker)return;const e=++this._updateExtraLibsToken,t=await this._worker.getProxy();this._updateExtraLibsToken===e&&t.updateExtraLibs(this._defaults.getExtraLibs())}_getClient(){if(!this._client){this._worker=n.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}});let e=this._worker.getProxy();this._defaults.getEagerModelSync()&&(e=e.then(t=>this._worker?this._worker.withSyncedResources(n.editor.getModels().filter(r=>r.getLanguageId()===this._modeId).map(r=>r.uri)):t)),this._client=e}return this._client}getLanguageServiceWorker(...e){let t;return this._getClient().then(r=>{t=r}).then(r=>{if(this._worker)return this._worker.withSyncedResources(e)}).then(r=>t)}},o={};o["lib.d.ts"]=!0;o["lib.dom.d.ts"]=!0;o["lib.dom.iterable.d.ts"]=!0;o["lib.es2015.collection.d.ts"]=!0;o["lib.es2015.core.d.ts"]=!0;o["lib.es2015.d.ts"]=!0;o["lib.es2015.generator.d.ts"]=!0;o["lib.es2015.iterable.d.ts"]=!0;o["lib.es2015.promise.d.ts"]=!0;o["lib.es2015.proxy.d.ts"]=!0;o["lib.es2015.reflect.d.ts"]=!0;o["lib.es2015.symbol.d.ts"]=!0;o["lib.es2015.symbol.wellknown.d.ts"]=!0;o["lib.es2016.array.include.d.ts"]=!0;o["lib.es2016.d.ts"]=!0;o["lib.es2016.full.d.ts"]=!0;o["lib.es2017.d.ts"]=!0;o["lib.es2017.full.d.ts"]=!0;o["lib.es2017.intl.d.ts"]=!0;o["lib.es2017.object.d.ts"]=!0;o["lib.es2017.sharedmemory.d.ts"]=!0;o["lib.es2017.string.d.ts"]=!0;o["lib.es2017.typedarrays.d.ts"]=!0;o["lib.es2018.asyncgenerator.d.ts"]=!0;o["lib.es2018.asynciterable.d.ts"]=!0;o["lib.es2018.d.ts"]=!0;o["lib.es2018.full.d.ts"]=!0;o["lib.es2018.intl.d.ts"]=!0;o["lib.es2018.promise.d.ts"]=!0;o["lib.es2018.regexp.d.ts"]=!0;o["lib.es2019.array.d.ts"]=!0;o["lib.es2019.d.ts"]=!0;o["lib.es2019.full.d.ts"]=!0;o["lib.es2019.object.d.ts"]=!0;o["lib.es2019.string.d.ts"]=!0;o["lib.es2019.symbol.d.ts"]=!0;o["lib.es2020.bigint.d.ts"]=!0;o["lib.es2020.d.ts"]=!0;o["lib.es2020.full.d.ts"]=!0;o["lib.es2020.intl.d.ts"]=!0;o["lib.es2020.promise.d.ts"]=!0;o["lib.es2020.sharedmemory.d.ts"]=!0;o["lib.es2020.string.d.ts"]=!0;o["lib.es2020.symbol.wellknown.d.ts"]=!0;o["lib.es2021.d.ts"]=!0;o["lib.es2021.full.d.ts"]=!0;o["lib.es2021.intl.d.ts"]=!0;o["lib.es2021.promise.d.ts"]=!0;o["lib.es2021.string.d.ts"]=!0;o["lib.es2021.weakref.d.ts"]=!0;o["lib.es5.d.ts"]=!0;o["lib.es6.d.ts"]=!0;o["lib.esnext.d.ts"]=!0;o["lib.esnext.full.d.ts"]=!0;o["lib.esnext.intl.d.ts"]=!0;o["lib.esnext.promise.d.ts"]=!0;o["lib.esnext.string.d.ts"]=!0;o["lib.esnext.weakref.d.ts"]=!0;o["lib.scripthost.d.ts"]=!0;o["lib.webworker.d.ts"]=!0;o["lib.webworker.importscripts.d.ts"]=!0;o["lib.webworker.iterable.d.ts"]=!0;function F(e,t,r=0){if(typeof e=="string")return e;if(e===void 0)return"";let i="";if(r){i+=t;for(let a=0;a<r;a++)i+="  "}if(i+=e.messageText,r++,e.next)for(const a of e.next)i+=F(a,t,r);return i}function y(e){return e?e.map(t=>t.text).join(""):""}var w=class{constructor(e){this._worker=e}_textSpanToRange(e,t){let r=e.getPositionAt(t.start),i=e.getPositionAt(t.start+t.length),{lineNumber:a,column:d}=r,{lineNumber:u,column:s}=i;return{startLineNumber:a,startColumn:d,endLineNumber:u,endColumn:s}}},X=class{constructor(e){_(this,"_libFiles");_(this,"_hasFetchedLibFiles");_(this,"_fetchLibFilesPromise");this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}isLibFile(e){return e&&e.path.indexOf("/lib.")===0?!!o[e.path.slice(1)]:!1}getOrCreateModel(e){const t=n.Uri.parse(e),r=n.editor.getModel(t);if(r)return r;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return n.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);const i=B.getExtraLibs()[e];return i?n.editor.createModel(i.content,"typescript",t):null}_containsLibFile(e){for(let t of e)if(this.isLibFile(t))return!0;return!1}async fetchLibFilesIfNecessary(e){!this._containsLibFile(e)||await this._fetchLibFiles()}_fetchLibFiles(){return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then(e=>e.getLibFiles()).then(e=>{this._hasFetchedLibFiles=!0,this._libFiles=e})),this._fetchLibFilesPromise}},Y=class extends w{constructor(e,t,r,i){super(i);_(this,"_disposables",[]);_(this,"_listener",Object.create(null));this._libFiles=e,this._defaults=t,this._selector=r;const a=s=>{if(s.getLanguageId()!==r)return;const c=()=>{const{onlyVisible:b}=this._defaults.getDiagnosticsOptions();b?s.isAttachedToEditor()&&this._doValidate(s):this._doValidate(s)};let g;const p=s.onDidChangeContent(()=>{clearTimeout(g),g=window.setTimeout(c,500)}),h=s.onDidChangeAttached(()=>{const{onlyVisible:b}=this._defaults.getDiagnosticsOptions();b&&(s.isAttachedToEditor()?c():n.editor.setModelMarkers(s,this._selector,[]))});this._listener[s.uri.toString()]={dispose(){p.dispose(),h.dispose(),clearTimeout(g)}},c()},d=s=>{n.editor.setModelMarkers(s,this._selector,[]);const c=s.uri.toString();this._listener[c]&&(this._listener[c].dispose(),delete this._listener[c])};this._disposables.push(n.editor.onDidCreateModel(s=>a(s))),this._disposables.push(n.editor.onWillDisposeModel(d)),this._disposables.push(n.editor.onDidChangeModelLanguage(s=>{d(s.model),a(s.model)})),this._disposables.push({dispose(){for(const s of n.editor.getModels())d(s)}});const u=()=>{for(const s of n.editor.getModels())d(s),a(s)};this._disposables.push(this._defaults.onDidChange(u)),this._disposables.push(this._defaults.onDidExtraLibsChange(u)),n.editor.getModels().forEach(s=>a(s))}dispose(){this._disposables.forEach(e=>e&&e.dispose()),this._disposables=[]}async _doValidate(e){const t=await this._worker(e.uri);if(e.isDisposed())return;const r=[],{noSyntaxValidation:i,noSemanticValidation:a,noSuggestionDiagnostics:d}=this._defaults.getDiagnosticsOptions();i||r.push(t.getSyntacticDiagnostics(e.uri.toString())),a||r.push(t.getSemanticDiagnostics(e.uri.toString())),d||r.push(t.getSuggestionDiagnostics(e.uri.toString()));const u=await Promise.all(r);if(!u||e.isDisposed())return;const s=u.reduce((g,p)=>p.concat(g),[]).filter(g=>(this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(g.code)===-1),c=s.map(g=>g.relatedInformation||[]).reduce((g,p)=>p.concat(g),[]).map(g=>g.file?n.Uri.parse(g.file.fileName):null);await this._libFiles.fetchLibFilesIfNecessary(c),!e.isDisposed()&&n.editor.setModelMarkers(e,this._selector,s.map(g=>this._convertDiagnostics(e,g)))}_convertDiagnostics(e,t){const r=t.start||0,i=t.length||1,{lineNumber:a,column:d}=e.getPositionAt(r),{lineNumber:u,column:s}=e.getPositionAt(r+i),c=[];return t.reportsUnnecessary&&c.push(n.MarkerTag.Unnecessary),t.reportsDeprecated&&c.push(n.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:a,startColumn:d,endLineNumber:u,endColumn:s,message:F(t.messageText,`
`),code:t.code.toString(),tags:c,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}_convertRelatedInformation(e,t){if(!t)return[];const r=[];return t.forEach(i=>{let a=e;if(i.file&&(a=this._libFiles.getOrCreateModel(i.file.fileName)),!a)return;const d=i.start||0,u=i.length||1,{lineNumber:s,column:c}=a.getPositionAt(d),{lineNumber:g,column:p}=a.getPositionAt(d+u);r.push({resource:a.uri,startLineNumber:s,startColumn:c,endLineNumber:g,endColumn:p,message:F(i.messageText,`
`)})}),r}_tsDiagnosticCategoryToMarkerSeverity(e){switch(e){case 1:return n.MarkerSeverity.Error;case 3:return n.MarkerSeverity.Info;case 0:return n.MarkerSeverity.Warning;case 2:return n.MarkerSeverity.Hint}return n.MarkerSeverity.Info}},C=class extends w{get triggerCharacters(){return["."]}async provideCompletionItems(e,t,r,i){const a=e.getWordUntilPosition(t),d=new n.Range(t.lineNumber,a.startColumn,t.lineNumber,a.endColumn),u=e.uri,s=e.getOffsetAt(t),c=await this._worker(u);if(e.isDisposed())return;const g=await c.getCompletionsAtPosition(u.toString(),s);return!g||e.isDisposed()?void 0:{suggestions:g.entries.map(h=>{var v;let b=d;if(h.replacementSpan){const x=e.getPositionAt(h.replacementSpan.start),L=e.getPositionAt(h.replacementSpan.start+h.replacementSpan.length);b=new n.Range(x.lineNumber,x.column,L.lineNumber,L.column)}const k=[];return((v=h.kindModifiers)==null?void 0:v.indexOf("deprecated"))!==-1&&k.push(n.languages.CompletionItemTag.Deprecated),{uri:u,position:t,offset:s,range:b,label:h.name,insertText:h.name,sortText:h.sortText,kind:C.convertKind(h.kind),tags:k}})}}async resolveCompletionItem(e,t){const r=e,i=r.uri,a=r.position,d=r.offset,s=await(await this._worker(i)).getCompletionEntryDetails(i.toString(),d,r.label);return s?{uri:i,position:a,label:s.name,kind:C.convertKind(s.kind),detail:y(s.displayParts),documentation:{value:C.createDocumentationString(s)}}:r}static convertKind(e){switch(e){case l.primitiveType:case l.keyword:return n.languages.CompletionItemKind.Keyword;case l.variable:case l.localVariable:return n.languages.CompletionItemKind.Variable;case l.memberVariable:case l.memberGetAccessor:case l.memberSetAccessor:return n.languages.CompletionItemKind.Field;case l.function:case l.memberFunction:case l.constructSignature:case l.callSignature:case l.indexSignature:return n.languages.CompletionItemKind.Function;case l.enum:return n.languages.CompletionItemKind.Enum;case l.module:return n.languages.CompletionItemKind.Module;case l.class:return n.languages.CompletionItemKind.Class;case l.interface:return n.languages.CompletionItemKind.Interface;case l.warning:return n.languages.CompletionItemKind.File}return n.languages.CompletionItemKind.Property}static createDocumentationString(e){let t=y(e.documentation);if(e.tags)for(const r of e.tags)t+=`

${M(r)}`;return t}};function M(e){let t=`*@${e.name}*`;if(e.name==="param"&&e.text){const[r,...i]=e.text;t+=`\`${r.text}\``,i.length>0&&(t+=` \u2014 ${i.map(a=>a.text).join(" ")}`)}else Array.isArray(e.text)?t+=` \u2014 ${e.text.map(r=>r.text).join(" ")}`:e.text&&(t+=` \u2014 ${e.text}`);return t}var K=class extends w{constructor(){super(...arguments);_(this,"signatureHelpTriggerCharacters",["(",","])}static _toSignatureHelpTriggerReason(e){switch(e.triggerKind){case n.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case n.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case n.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}async provideSignatureHelp(e,t,r,i){const a=e.uri,d=e.getOffsetAt(t),u=await this._worker(a);if(e.isDisposed())return;const s=await u.getSignatureHelpItems(a.toString(),d,{triggerReason:K._toSignatureHelpTriggerReason(i)});if(!s||e.isDisposed())return;const c={activeSignature:s.selectedItemIndex,activeParameter:s.argumentIndex,signatures:[]};return s.items.forEach(g=>{const p={label:"",parameters:[]};p.documentation={value:y(g.documentation)},p.label+=y(g.prefixDisplayParts),g.parameters.forEach((h,b,k)=>{const v=y(h.displayParts),x={label:v,documentation:{value:y(h.documentation)}};p.label+=v,p.parameters.push(x),b<k.length-1&&(p.label+=y(g.separatorDisplayParts))}),p.label+=y(g.suffixDisplayParts),c.signatures.push(p)}),{value:c,dispose(){}}}},Z=class extends w{async provideHover(e,t,r){const i=e.uri,a=e.getOffsetAt(t),d=await this._worker(i);if(e.isDisposed())return;const u=await d.getQuickInfoAtPosition(i.toString(),a);if(!u||e.isDisposed())return;const s=y(u.documentation),c=u.tags?u.tags.map(p=>M(p)).join(`  

`):"",g=y(u.displayParts);return{range:this._textSpanToRange(e,u.textSpan),contents:[{value:"```typescript\n"+g+"\n```\n"},{value:s+(c?`

`+c:"")}]}}},ee=class extends w{async provideDocumentHighlights(e,t,r){const i=e.uri,a=e.getOffsetAt(t),d=await this._worker(i);if(e.isDisposed())return;const u=await d.getOccurrencesAtPosition(i.toString(),a);if(!(!u||e.isDisposed()))return u.map(s=>({range:this._textSpanToRange(e,s.textSpan),kind:s.isWriteAccess?n.languages.DocumentHighlightKind.Write:n.languages.DocumentHighlightKind.Text}))}},te=class extends w{constructor(e,t){super(t);this._libFiles=e}async provideDefinition(e,t,r){const i=e.uri,a=e.getOffsetAt(t),d=await this._worker(i);if(e.isDisposed())return;const u=await d.getDefinitionAtPosition(i.toString(),a);if(!u||e.isDisposed()||(await this._libFiles.fetchLibFilesIfNecessary(u.map(c=>n.Uri.parse(c.fileName))),e.isDisposed()))return;const s=[];for(let c of u){const g=this._libFiles.getOrCreateModel(c.fileName);g&&s.push({uri:g.uri,range:this._textSpanToRange(g,c.textSpan)})}return s}},re=class extends w{constructor(e,t){super(t);this._libFiles=e}async provideReferences(e,t,r,i){const a=e.uri,d=e.getOffsetAt(t),u=await this._worker(a);if(e.isDisposed())return;const s=await u.getReferencesAtPosition(a.toString(),d);if(!s||e.isDisposed()||(await this._libFiles.fetchLibFilesIfNecessary(s.map(g=>n.Uri.parse(g.fileName))),e.isDisposed()))return;const c=[];for(let g of s){const p=this._libFiles.getOrCreateModel(g.fileName);p&&c.push({uri:p.uri,range:this._textSpanToRange(p,g.textSpan)})}return c}},se=class extends w{async provideDocumentSymbols(e,t){const r=e.uri,i=await this._worker(r);if(e.isDisposed())return;const a=await i.getNavigationBarItems(r.toString());if(!a||e.isDisposed())return;const d=(s,c,g)=>{let p={name:c.text,detail:"",kind:m[c.kind]||n.languages.SymbolKind.Variable,range:this._textSpanToRange(e,c.spans[0]),selectionRange:this._textSpanToRange(e,c.spans[0]),tags:[]};if(g&&(p.containerName=g),c.childItems&&c.childItems.length>0)for(let h of c.childItems)d(s,h,p.name);s.push(p)};let u=[];return a.forEach(s=>d(u,s)),u}},l=class{};f(l,"unknown","");f(l,"keyword","keyword");f(l,"script","script");f(l,"module","module");f(l,"class","class");f(l,"interface","interface");f(l,"type","type");f(l,"enum","enum");f(l,"variable","var");f(l,"localVariable","local var");f(l,"function","function");f(l,"localFunction","local function");f(l,"memberFunction","method");f(l,"memberGetAccessor","getter");f(l,"memberSetAccessor","setter");f(l,"memberVariable","property");f(l,"constructorImplementation","constructor");f(l,"callSignature","call");f(l,"indexSignature","index");f(l,"constructSignature","construct");f(l,"parameter","parameter");f(l,"typeParameter","type parameter");f(l,"primitiveType","primitive type");f(l,"label","label");f(l,"alias","alias");f(l,"const","const");f(l,"let","let");f(l,"warning","warning");var m=Object.create(null);m[l.module]=n.languages.SymbolKind.Module;m[l.class]=n.languages.SymbolKind.Class;m[l.enum]=n.languages.SymbolKind.Enum;m[l.interface]=n.languages.SymbolKind.Interface;m[l.memberFunction]=n.languages.SymbolKind.Method;m[l.memberVariable]=n.languages.SymbolKind.Property;m[l.memberGetAccessor]=n.languages.SymbolKind.Property;m[l.memberSetAccessor]=n.languages.SymbolKind.Property;m[l.variable]=n.languages.SymbolKind.Variable;m[l.const]=n.languages.SymbolKind.Variable;m[l.localVariable]=n.languages.SymbolKind.Variable;m[l.variable]=n.languages.SymbolKind.Variable;m[l.function]=n.languages.SymbolKind.Function;m[l.localFunction]=n.languages.SymbolKind.Function;var S=class extends w{static _convertOptions(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:`
`,InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}_convertTextChanges(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}},ie=class extends S{async provideDocumentRangeFormattingEdits(e,t,r,i){const a=e.uri,d=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),u=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),s=await this._worker(a);if(e.isDisposed())return;const c=await s.getFormattingEditsForRange(a.toString(),d,u,S._convertOptions(r));if(!(!c||e.isDisposed()))return c.map(g=>this._convertTextChanges(e,g))}},ne=class extends S{get autoFormatTriggerCharacters(){return[";","}",`
`]}async provideOnTypeFormattingEdits(e,t,r,i,a){const d=e.uri,u=e.getOffsetAt(t),s=await this._worker(d);if(e.isDisposed())return;const c=await s.getFormattingEditsAfterKeystroke(d.toString(),u,r,S._convertOptions(i));if(!(!c||e.isDisposed()))return c.map(g=>this._convertTextChanges(e,g))}},ae=class extends S{async provideCodeActions(e,t,r,i){const a=e.uri,d=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),u=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),s=S._convertOptions(e.getOptions()),c=r.markers.filter(b=>b.code).map(b=>b.code).map(Number),g=await this._worker(a);if(e.isDisposed())return;const p=await g.getCodeFixesAtPosition(a.toString(),d,u,c,s);return!p||e.isDisposed()?{actions:[],dispose:()=>{}}:{actions:p.filter(b=>b.changes.filter(k=>k.isNewFile).length===0).map(b=>this._tsCodeFixActionToMonacoCodeAction(e,r,b)),dispose:()=>{}}}_tsCodeFixActionToMonacoCodeAction(e,t,r){const i=[];for(const d of r.changes)for(const u of d.textChanges)i.push({resource:e.uri,edit:{range:this._textSpanToRange(e,u.span),text:u.newText}});return{title:r.description,edit:{edits:i},diagnostics:t.markers,kind:"quickfix"}}},oe=class extends w{constructor(e,t){super(t);this._libFiles=e}async provideRenameEdits(e,t,r,i){const a=e.uri,d=a.toString(),u=e.getOffsetAt(t),s=await this._worker(a);if(e.isDisposed())return;const c=await s.getRenameInfo(d,u,{allowRenameOfImportPath:!1});if(c.canRename===!1)return{edits:[],rejectReason:c.localizedErrorMessage};if(c.fileToRename!==void 0)throw new Error("Renaming files is not supported.");const g=await s.findRenameLocations(d,u,!1,!1,!1);if(!g||e.isDisposed())return;const p=[];for(const h of g){const b=this._libFiles.getOrCreateModel(h.fileName);if(b)p.push({resource:b.uri,edit:{range:this._textSpanToRange(b,h.textSpan),text:r}});else throw new Error(`Unknown file ${h.fileName}.`)}return{edits:p}}},le=class extends w{async provideInlayHints(e,t,r){const i=e.uri,a=i.toString(),d=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),u=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),s=await this._worker(i);return e.isDisposed()?null:{hints:(await s.provideInlayHints(a,d,u)).map(p=>I(O({},p),{label:p.text,position:e.getPositionAt(p.position),kind:this._convertHintKind(p.kind)})),dispose:()=>{}}}_convertHintKind(e){switch(e){case"Parameter":return n.languages.InlayHintKind.Parameter;case"Type":return n.languages.InlayHintKind.Type;default:return n.languages.InlayHintKind.Type}}},A,T;function he(e){T=R(e,"typescript")}function be(e){A=R(e,"javascript")}function me(){return new Promise((e,t)=>{if(!A)return t("JavaScript not registered!");e(A)})}function _e(){return new Promise((e,t)=>{if(!T)return t("TypeScript not registered!");e(T)})}function R(e,t){const r=new q(t,e),i=(...d)=>r.getLanguageServiceWorker(...d),a=new X(i);return n.languages.registerCompletionItemProvider(t,new C(i)),n.languages.registerSignatureHelpProvider(t,new K(i)),n.languages.registerHoverProvider(t,new Z(i)),n.languages.registerDocumentHighlightProvider(t,new ee(i)),n.languages.registerDefinitionProvider(t,new te(a,i)),n.languages.registerReferenceProvider(t,new re(a,i)),n.languages.registerDocumentSymbolProvider(t,new se(i)),n.languages.registerDocumentRangeFormattingEditProvider(t,new ie(i)),n.languages.registerOnTypeFormattingEditProvider(t,new ne(i)),n.languages.registerCodeActionProvider(t,new ae(i)),n.languages.registerRenameProvider(t,new oe(a,i)),n.languages.registerInlayHintsProvider(t,new le(i)),new Y(a,e,t,i),i}export{w as Adapter,ae as CodeActionAdaptor,te as DefinitionAdapter,Y as DiagnosticsAdapter,ie as FormatAdapter,S as FormatHelper,ne as FormatOnTypeAdapter,le as InlayHintsAdapter,l as Kind,X as LibFiles,ee as OccurrencesAdapter,se as OutlineAdapter,Z as QuickInfoAdapter,re as ReferenceAdapter,oe as RenameAdapter,K as SignatureHelpAdapter,C as SuggestAdapter,q as WorkerManager,F as flattenDiagnosticMessageText,me as getJavaScriptWorker,_e as getTypeScriptWorker,be as setupJavaScript,he as setupTypeScript};
