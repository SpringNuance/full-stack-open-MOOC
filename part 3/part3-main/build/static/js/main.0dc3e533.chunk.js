(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),o=t(7),a=t(3),u=t(2),s=t(0),i=function(e){var n=e.person,t=e.deletePerson;return Object(s.jsxs)("li",{children:[n.name," ",n.number," ",Object(s.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},l=function(e){var n=e.message;return null===n?null:n.includes("!")?Object(s.jsx)("div",{className:"error",children:n}):Object(s.jsx)("div",{className:"success",children:n})},d=t(4),f=t.n(d),j="api/persons",b={getAll:function(){return f.a.get(j).then((function(e){return e.data}))},create:function(e){return f.a.post(j,e).then((function(e){return e.data}))},update:function(e,n){return f.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return f.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))}},h=function(e){var n=e.filter,t=e.handleFilter;return Object(s.jsxs)("div",{children:["Filter name ",Object(s.jsx)("input",{value:n,onChange:t})]})},m=function(e){var n=e.PersonsToShow,t=e.deletePerson;return Object(s.jsx)("ul",{children:n.map((function(e,n){return Object(s.jsx)(i,{person:e,deletePerson:t},n)}))})},O=function(e){var n=e.addPerson,t=e.newName,c=e.handleNameChange,r=e.newNumber,o=e.handleNumberChange;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:[" Name: ",Object(s.jsx)("input",{value:t,onChange:c})]}),Object(s.jsxs)("div",{children:[" Number: ",Object(s.jsx)("input",{value:r,onChange:o})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},p=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),i=Object(a.a)(r,2),d=i[0],f=i[1],j=Object(u.useState)(""),p=Object(a.a)(j,2),v=p[0],g=p[1],x=Object(u.useState)(""),w=Object(a.a)(x,2),N=w[0],y=w[1],C=Object(u.useState)(null),P=Object(a.a)(C,2),S=P[0],T=P[1];Object(u.useEffect)((function(){b.getAll().then((function(e){c(e)}))}),[]);var k=N?t.filter((function(e){return e.name.toLowerCase().includes(N)})):t;return Object(s.jsxs)("div",{children:[Object(s.jsx)(l,{message:S}),Object(s.jsx)("h1",{children:"Phonebook "}),Object(s.jsx)(h,{filter:N,handleFilter:function(e){console.log(e.target.value),y(e.target.value)}}),Object(s.jsx)("h1",{children:"Add a new phone record"}),Object(s.jsx)(O,{addPerson:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(d)){var n=t.filter((function(e){return e.name===d}))[0],r=Object(o.a)(Object(o.a)({},n),{},{number:v}),a=n.id;window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))&&b.update(a,r).then((function(e){console.log("".concat(d,"'s phone number successfully updated"));var n=t.map((function(n){return n.id!==a?n:e}));c(n),T("".concat(d," was successfully updated")),setTimeout((function(){T(null)}),4e3)})).catch((function(e){console.log(e),c(t.filter((function(e){return e.id!==a}))),f(""),g(""),T("".concat(e.response.data,"!")),T("Information of ".concat(n.name," has already been deleted from server!")),setTimeout((function(){T(null)}),4e4)}))}else{var u={name:d,number:v};b.create(u).then((function(e){c(t.concat(e)),f(""),g(""),T("".concat(d," was successfully added")),setTimeout((function(){T(null)}),4e3)})).catch((function(e){console.log(e.response.data),T("".concat(e.response.data,"!")),setTimeout((function(){T(null)}),4e3)}))}},newName:d,handleNameChange:function(e){console.log(e.target.value),f(e.target.value)},newNumber:v,handleNumberChange:function(e){console.log(e.target.value),g(e.target.value)}}),Object(s.jsx)("h1",{children:"Numbers"}),Object(s.jsx)(m,{PersonsToShow:k,deletePerson:function(e){var n=t.filter((function(n){return n.id===e}))[0].name;window.confirm("Delete ".concat(n," from the phonebook?"))&&b.remove(e).then((function(r){c(t.filter((function(n){return n.id!==e}))),T("".concat(n," was successfully deleted")),setTimeout((function(){T(null)}),4e3)})).catch((function(r){c(t.filter((function(n){return n.id!==e}))),T("".concat(n," has already been deleted!")),setTimeout((function(){T(null)}),4e3)}))}})]})};t(41);r.a.render(Object(s.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.0dc3e533.chunk.js.map