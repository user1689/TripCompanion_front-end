(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(0),l=Object(a.createContext)({isLoggedIn:!1,userId:null,token:null,login:function(){},logout:function(){}})},,,,,function(e,t,n){"use strict";var a=n(0),l=n.n(a);n(39);t.a=function(e){return l.a.createElement("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay")},l.a.createElement("div",{className:"lds-dual-ring"}))}},function(e,t,n){"use strict";var a=n(0),l=n.n(a),c=n(6),r=n.n(c);n(38);t.a=function(e){return r.a.createPortal(l.a.createElement("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}},,,,,,function(e,t,n){e.exports=n(40)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(6),r=n.n(c),o=(n(28),n(1)),u=n(8),i=n(10);n(29),n(30);function m(e){return l.a.createElement("header",{className:"main-header"},e.children)}n(31);var s=n(11);function E(){var e=Object(a.useContext)(s.a);return l.a.createElement("ul",{className:"nav-links"},l.a.createElement("li",null,l.a.createElement(u.c,{to:"/",exact:!0},"ALL USERS")),l.a.createElement("li",null,e.isLoggedIn&&l.a.createElement(u.c,{to:"/".concat(e.userId,"/places")},"MY PLACES")),l.a.createElement("li",null,e.isLoggedIn&&l.a.createElement(u.c,{to:"/places/new"},"ADD PLACES")),l.a.createElement("li",null,!e.isLoggedIn&&l.a.createElement(u.c,{to:"/auth"},"AUTHENTICATE")),l.a.createElement("li",null,e.isLoggedIn&&l.a.createElement("button",{onClick:e.logout},"LOG OUT")))}var d=n(42);n(37);function f(e){var t=l.a.createElement(d.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0},(function(t){return l.a.createElement("aside",{className:"side-drawer",onClick:e.onClick},e.children)}));return r.a.createPortal(t,document.getElementById("drawer-hook"))}var g,p=n(17);function b(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],r=n[1];var o=function(){r(!1)};return l.a.createElement(a.Fragment,null,c?l.a.createElement(p.a,{onClick:o}):null,l.a.createElement(f,{show:c,onClick:o},l.a.createElement("nav",{className:"main-navigation__drawer-nav"},l.a.createElement(E,null))),l.a.createElement(m,null,l.a.createElement("button",{className:"main-navigation__menu-btn",onClick:function(){r(!0)}},l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null)),l.a.createElement("h2",{className:"main-navigation__title"},"YourPlaces"),l.a.createElement("nav",{className:"main-navigation__header-nav"},l.a.createElement(E,null))))}var v=n(16),h=l.a.lazy((function(){return n.e(7).then(n.bind(null,71))})),k=l.a.lazy((function(){return n.e(4).then(n.bind(null,68))})),I=l.a.lazy((function(){return n.e(6).then(n.bind(null,72))})),O=l.a.lazy((function(){return n.e(5).then(n.bind(null,69))})),S=l.a.lazy((function(){return n.e(3).then(n.bind(null,70))}));var w=function(){var e,t=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(null),r=Object(i.a)(c,2),o=r[0],u=r[1],m=Object(a.useState)(null),s=Object(i.a)(m,2),E=s[0],d=s[1],f=Object(a.useCallback)((function(e,t,n){l(t);var a=n||new Date((new Date).getTime()+36e5);u(a),localStorage.setItem("userData",JSON.stringify({userId:e,token:t,expiration:a.toISOString()})),d(e)}),[]),p=Object(a.useCallback)((function(){l(null),u(null),d(null),localStorage.removeItem("userData")}),[]);return Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&new Date(e.expiration)>new Date&&f(e.userId,e.token,new Date(e.expiration))}),[f]),Object(a.useEffect)((function(){if(n&&o){console.log("setTimer1");var e=o.getTime()-(new Date).getTime();g=setTimeout(p,e)}else console.log("setTimer2"),clearTimeout(g)}),[n,p,o]),{token:n,login:f,logout:p,userId:E}}(),n=t.token,c=t.login,r=t.logout,m=t.userId;return e=n?l.a.createElement(o.d,null,l.a.createElement(o.b,{path:"/",component:h,exact:!0}),l.a.createElement(o.b,{path:"/:userId/places",component:I,exact:!0}),l.a.createElement(o.b,{path:"/places/new",component:k,exact:!0}),l.a.createElement(o.b,{path:"/places/:placeId",component:O,exact:!0}),l.a.createElement(o.a,{to:"/"})):l.a.createElement(o.d,null,l.a.createElement(o.b,{path:"/",component:h,exact:!0}),l.a.createElement(o.b,{path:"/:userId/places",component:I,exact:!0}),l.a.createElement(o.b,{path:"/auth",component:S,exact:!0}),l.a.createElement(o.a,{to:"/auth"})),l.a.createElement(s.a.Provider,{value:{isLoggedIn:!!n,token:n,userId:m,login:c,logout:r}},l.a.createElement(u.a,null,l.a.createElement(b,null),l.a.createElement("main",null,l.a.createElement(a.Suspense,{fallback:l.a.createElement("div",{className:"center"},l.a.createElement(v.a,null))},e))))};r.a.render(l.a.createElement(w,null),document.getElementById("root"))}],[[23,1,2]]]);
//# sourceMappingURL=main.cb4c0ffd.chunk.js.map