(this["webpackJsonpacademy-article-qa"]=this["webpackJsonpacademy-article-qa"]||[]).push([[0],{105:function(t,e,n){},163:function(t,e){},165:function(t,e){},219:function(t,e,n){"use strict";n.r(e);var r,c=n(3),a=n.n(c),i=n(9),o=n(0),s=n.n(o),l=n(91),u=n.n(l),f=(n(104),n(105),n(30)),d=n(15),h=n(98),j=n(10),b=n(5),p=n(92),v=n(94),m=n(93),O=n(28),x=function(t){var e,n,c=(e=0,new Proxy(Object.create(null),{get:function(t,n){return n in t?t[n]:e}})),a=Object(j.a)(t.querySelectorAll("h2, h3, h4, h5, h6, .anchored"));try{for(a.s();!(n=a.n()).done;){var i=n.value;if(i.textContent){var o=i.textContent.toLowerCase().replace(Object(O.regex)("gu")(r||(r=Object(m.a)(["[\n\t\t\t\t^\n\t\t\t\tp{Letter}\n\t\t\t\tp{Mark}\n\t\t\t\tp{Number}\n\t\t\t]+"],["[\n\t\t\t\t^\n\t\t\t\t\\p{Letter}\n\t\t\t\t\\p{Mark}\n\t\t\t\t\\p{Number}\n\t\t\t]+"])))," ").trim().replace(/\s+/g,"-")||"heading",s=++c[o];i.id=[o,s>1&&s].filter(Boolean).join("-"),i.classList.add("anchored")}}}catch(l){a.e(l)}finally{a.f()}},g=Object(p.matchPatternWithConfig)({strict:!1}),y=function(t,e){var n,r=[],c=function(t){var e=document.createElement("template");return e.innerHTML=t,e.content}(t),a="*://",i=e.map((function(t){var e=t.split("."),n=(2===e.length?["*"].concat(Object(b.a)(e)):e).join(".").replace(/^\w+:\/{2,3}|^/,a);return Object.assign({domain:t},g(n.slice(a.length).includes("/")?n:"".concat(n,"/")))})),o=Object(j.a)(c.querySelectorAll("a[href]"));try{var s=function(){var t,e,c=n.value,a=c.href,o=c.textContent,s=null!==(t=c.parentElement)&&void 0!==t?t:c,l=Object(j.a)(s.querySelectorAll("a[href]"));try{for(l.s();!(e=l.n()).done;){var u=e.value;u.classList[u===c?"add":"remove"]("violation")}}catch(b){l.e(b)}finally{l.f()}var f=i.find((function(t){return t.match(a)}));if(f){var d=f.pattern,h=f.domain;r.push({url:a,context:s.innerHTML,text:o,pattern:d,domain:h})}};for(o.s();!(n=o.n()).done;)s()}catch(l){o.e(l)}finally{o.f()}return r},w=n(63),k=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return w.join.apply(void 0,["/academy-article-qa"].concat(Object(b.a)(e.flat())))},S=n(95),C=n.n(S),N=n(2),A=function(t){return new Promise((function(e){var n=new FileReader;n.onload=function(t){return e(t.target.result)},n.readAsArrayBuffer(t)}))},L={},q=function(){var t=Object(o.useMemo)((function(){var t,e;return null!==(t=JSON.parse(null!==(e=localStorage.getItem("checkerForm"))&&void 0!==e?e:"null"))&&void 0!==t?t:L}),[]),e=Object(h.a)({defaultValues:t}),n=e.register,r=e.handleSubmit,c="list",s=Object(o.useState)([]),l=Object(d.a)(s,2),u=l[0],f=l[1];Object(o.useEffect)((function(){fetch(k("lists","".concat(c,".txt"))).then(function(){var t=Object(i.a)(a.a.mark((function t(e){var n,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("text/plain"===(null===(n=e.headers.get("content-type"))||void 0===n?void 0:n.split(";")[0].trim())){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.text();case 4:r=t.sent,f(r.split("\n").filter(Boolean));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[c]);var j=Object(o.useState)(null),b=Object(d.a)(j,2),p=b[0],v=b[1],m=Object(o.useState)(!1),O=Object(d.a)(m,2),x=O[0],g=O[1],w=Object(o.useCallback)((function(t){localStorage.setItem("checkerForm",JSON.stringify(t,(function(t,e){return"files"===t?void 0:e})))}),[]),S=Object(o.useCallback)(function(){var t=Object(i.a)(a.a.mark((function t(e){var n,r,c,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.files,v(null),null===n||void 0===n?void 0:n.length){t.next=4;break}return t.abrupt("return");case 4:return g(!0),r=n[0],t.next=8,A(r);case 8:return c=t.sent,t.next=11,C.a.convertToHtml({arrayBuffer:c});case 11:i=t.sent,v(y(i.value,u)),g(!1);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[u]);return u.length?Object(N.jsxs)("form",{onSubmit:r(S),onChange:r(w),children:[Object(N.jsx)("h1",{children:"Check"}),Object(N.jsx)("div",{className:"spaced",children:Object(N.jsxs)("label",{children:["Upload file (DOCX)",Object(N.jsx)("input",{onChange:r(S),type:"file",name:"files",ref:n})]})}),Object(N.jsx)("hr",{}),Object(N.jsx)("output",{children:(null===p||void 0===p?void 0:p.length)?Object(N.jsx)("ul",{children:p.map((function(t,e){return Object(N.jsxs)("li",{children:[Object(N.jsxs)("p",{children:["Matched blacklisted domain",Object(N.jsx)("code",{children:t.domain}),". Context:"]}),Object(N.jsx)("blockquote",{className:"violation-context",dangerouslySetInnerHTML:{__html:t.context}})]},e)}))}):Array.isArray(p)?Object(N.jsx)(N.Fragment,{children:"No blacklisted domains found \ud83d\ude04"}):x?Object(N.jsx)(N.Fragment,{children:"Checking..."}):Object(N.jsx)(N.Fragment,{children:"No file selected."})})]}):Object(N.jsx)(N.Fragment,{children:Object(N.jsx)("div",{className:"spaced",children:"Loading..."})})},M=n(7),I=n.p+"static/media/instructions.a708fafa.md",F=n(64),E=function(){var t,e=Object(o.useState)(""),n=Object(d.a)(e,2),r=n[0],c=n[1],s=Object(M.f)();return Object(o.useEffect)((function(){fetch(I,{cache:"force-cache"}).then(function(){var t=Object(i.a)(a.a.mark((function t(e){var n,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.text();case 2:n=t.sent,r=n.split(/((?<=^|\n)```\r?\n[\s\S]*?\r?\n```)/).map((function(t,e){return e%2?"<pre><code>".concat(t.split(/\r?\n/).slice(1,-1).join("\n"),"</pre></code>"):t.split(/(?:\r?\n){2,}/).map((function(t){return[" ","\t","#","-","*","`","~"].some((function(e){return t.startsWith(e)}))?/^\s*-{3,}\s*$/.test(t)?"<hr>":Object(F.a)(t):"<p>".concat(Object(F.a)(t),"</p>")})).join("")})).join("").replace(/<p><\/p>/g,""),c(r);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[]),Object(N.jsx)("div",{ref:(t=function(t){x(t),function(t){var e,n=Object(j.a)(t.querySelectorAll("a"));try{for(n.s();!(e=n.n()).done;){var r=e.value,c=r.getAttribute("href");(null===c||void 0===c?void 0:c.startsWith("/"))&&r.setAttribute("href","/academy-article-qa"+c)}}catch(a){n.e(a)}finally{n.f()}}(t),function(t,e){t.addEventListener("click",(function(t){var n=t.target,r=n.getAttribute("href");"A"===n.nodeName&&r?(t.preventDefault(),r.startsWith("http")&&!r.startsWith(window.location.origin)?window.open(r,"_blank","noopener noreferrer"):e.push(r.slice("/academy-article-qa".length))):n.classList.contains("anchored")&&(window.location.hash=n.id,n.scrollIntoView(!0))}))}(t,s),function(t){window.location.hash&&setTimeout((function(){var e=Object(v.a)(window.location.hash.slice(1),decodeURIComponent,CSS.escape,(function(e){return t.querySelector("#".concat(e))}));null===e||void 0===e||e.scrollIntoView(!0)}),100)}(t)},function(e){if(e){var n=new MutationObserver((function(r){t(e),n.disconnect()}));n.observe(e,{childList:!0})}}),dangerouslySetInnerHTML:{__html:r}})},T=function(){return Object(N.jsxs)(M.c,{children:[Object(N.jsx)(M.a,{exact:!0,path:"/",children:Object(N.jsx)(q,{})}),Object(N.jsx)(M.a,{path:"/instructions",children:Object(N.jsx)(E,{})})]})},B=function(){return Object(N.jsx)(N.Fragment,{children:Object(N.jsxs)(f.a,{basename:"/academy-article-qa",children:[Object(N.jsxs)("nav",{className:"tabs",children:[Object(N.jsx)(f.b,{exact:!0,activeClassName:"active",to:"/",children:"Check"}),Object(N.jsx)(f.b,{activeClassName:"active",to:"/instructions",children:"Instructions"})]}),Object(N.jsx)("main",{className:"container",children:Object(N.jsx)(T,{})})]})})};fetch(k("build-timestamp.txt")).then(function(){var t=Object(i.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.text();case 2:n=t.sent,console.info("App last built",new Date(Number(n)));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),u.a.render(Object(N.jsx)(s.a.StrictMode,{children:Object(N.jsx)(B,{})}),document.getElementById("root"))}},[[219,1,2]]]);
//# sourceMappingURL=main.6edab085.chunk.js.map