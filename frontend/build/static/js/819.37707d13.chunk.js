"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[819],{819:function(e,r,s){s.r(r),s.d(r,{default:function(){return b}});var a=s(791),n=s(504),o=s(165),l=s(861),t=s(885),d=s(705),i=s(756),m=s(184);var c=function(e){var r=e.alertType,s=e.message;return(0,m.jsxs)("div",{className:"alert alert-".concat(r," alert-dismissible fade show mb-4"),role:"alert",children:[s,(0,m.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]})},u=function(e){var r={};return e.username||(r.username="Required"),e.password||(r.password="Required"),r},h=function(){var e=(0,a.useContext)(i.Z).handleLogin,r=(0,a.useState)(!0),s=(0,t.Z)(r,2),n=s[0],h=s[1];function p(){return(p=(0,l.Z)((0,o.Z)().mark((function r(s,a){return(0,o.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e(s,a);case 2:!1===r.sent&&h(!1);case 4:case"end":return r.stop()}}),r)})))).apply(this,arguments)}var w=(0,d.TA)({initialValues:{username:"",password:""},validate:u,onSubmit:function(e){return function(e,r){return p.apply(this,arguments)}(e.username,e.password)}});return(0,m.jsxs)(m.Fragment,{children:[!n&&(0,m.jsx)(c,{alertType:"danger",message:"Incorrect username and/or password. Please try again."}),(0,m.jsxs)("form",{className:"my-3",onSubmit:function(e){e.preventDefault(),w.handleSubmit()},children:[(0,m.jsxs)("div",{className:"form-group form-floating mb-4",children:[(0,m.jsx)("input",{autoFocus:!0,className:"form-control shadow-none"+(w.touched.username&&w.errors.username?" error":""),id:"username",type:"text",name:"username",placeholder:"Username",value:w.values.username,onChange:w.handleChange,onBlur:w.handleBlur}),(0,m.jsx)("label",{htmlFor:"username",className:w.touched.username&&w.errors.username?"label-error":"",children:"Username"})]}),(0,m.jsxs)("div",{className:"form-group form-floating mb-4",children:[(0,m.jsx)("input",{className:"form-control shadow-none"+(w.touched.password&&w.errors.password?" error":""),id:"password",type:"password",name:"password",placeholder:"Password",value:w.values.password,onChange:w.handleChange,onBlur:w.handleBlur}),(0,m.jsx)("label",{htmlFor:"password",className:w.touched.password&&w.errors.password?"label-error":"",children:"Password"})]}),(0,m.jsx)("input",{className:"btn btn-skyblue shadow-none w-100 mt-3",type:"submit",value:"Login"})]})]})},p=s(871),w=function(e){var r={};return e.username?(e.username.length<3||e.username.length>25)&&(r.username="Username must be between 3 and 25 characters"):r.username="Required",e.password?e.password.length<=7&&(r.password="Password must be has at least 8 character"):r.password="Required",e.confirmPassword?e.confirmPassword!==e.password&&(r.confirmPassword="Must be same as the password"):r.confirmPassword="Required",e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(r.email="Invalid email address"):r.email="Required",r},f=function(){var e=(0,p.s0)(),r=(0,a.useState)(!0),s=(0,t.Z)(r,2),n=s[0],i=s[1];function u(){return(u=(0,l.Z)((0,o.Z)().mark((function r(s,a,n){return(0,o.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,email:a,password:n})});case 2:r.sent.ok?e("/login"):i(!1);case 4:case"end":return r.stop()}}),r)})))).apply(this,arguments)}var h=(0,d.TA)({initialValues:{username:"",email:"",password:"",confirmPassword:""},validate:w,onSubmit:function(e){return function(e,r,s){return u.apply(this,arguments)}(e.username,e.email,e.password)}});return(0,m.jsxs)(m.Fragment,{children:[!n&&(0,m.jsx)(c,{alertType:"danger",message:"Username has been taken by other."}),(0,m.jsxs)("form",{className:"my-3",onSubmit:function(e){e.preventDefault(),h.handleSubmit()},children:[(0,m.jsxs)("div",{className:"form-group form-floating mb-4",children:[(0,m.jsx)("input",{autoFocus:!0,className:"form-control shadow-none"+(h.touched.username&&h.errors.username?" error":""),id:"username",type:"text",name:"username",placeholder:"Username",value:h.values.username,onChange:h.handleChange,onBlur:h.handleBlur}),(0,m.jsx)("label",{htmlFor:"username",className:h.touched.username&&h.errors.username?"label-error":"",children:"Username"}),h.touched.username&&h.errors.username?(0,m.jsx)("div",{className:"error-message",children:h.errors.username}):null]}),(0,m.jsxs)("div",{className:"form-group form-floating mb-4",children:[(0,m.jsx)("input",{className:"form-control shadow-none"+(h.touched.email&&h.errors.email?" error":""),id:"email",type:"email",name:"email",placeholder:"Email",value:h.values.email,onChange:h.handleChange,onBlur:h.handleBlur}),(0,m.jsx)("label",{htmlFor:"email",className:h.touched.email&&h.errors.email?"label-error":"",children:"Email"}),h.touched.email&&h.errors.email?(0,m.jsx)("div",{className:"error-message",children:h.errors.email}):null]}),(0,m.jsxs)("div",{className:"form-group form-floating mb-4",children:[(0,m.jsx)("input",{className:"form-control shadow-none"+(h.touched.password&&h.errors.password?" error":""),id:"password",type:"password",name:"password",placeholder:"Password",value:h.values.password,onChange:h.handleChange,onBlur:h.handleBlur}),(0,m.jsx)("label",{htmlFor:"password",className:h.touched.password&&h.errors.password?"label-error":"",children:"Password"}),h.touched.password&&h.errors.password?(0,m.jsx)("div",{className:"error-message",children:h.errors.password}):null]}),(0,m.jsxs)("div",{className:"form-group form-floating mb-5",children:[(0,m.jsx)("input",{className:"form-control shadow-none"+(h.touched.confirmPassword&&h.errors.confirmPassword?" error":""),id:"confirmPassword",type:"password",name:"confirmPassword",placeholder:"Confirm Password",value:h.values.confirmPassword,onChange:h.handleChange,onBlur:h.handleBlur}),(0,m.jsx)("label",{htmlFor:"confirmPassword",className:h.touched.confirmPassword&&h.errors.confirmPassword?"label-error":"",children:"Confirm Password"}),h.touched.confirmPassword&&h.errors.confirmPassword?(0,m.jsx)("div",{className:"error-message",children:h.errors.confirmPassword}):null]}),(0,m.jsx)("input",{className:"btn btn-skyblue shadow-none w-100 mt-3",type:"submit",value:"Register"})]})]})};var b=function(e){var r,s,a,o=e.authMode;return"register"===o?(r="Create your ALE-Network Account to enjoy the service.",s="/login",a="Already have an account?"):(r="Enter your ALE-Network Account details.",s="/register",a="Don't have an account?"),(0,m.jsx)("div",{className:"auth-form container",children:(0,m.jsx)("div",{className:"row mt-3 justify-content-center align-items-center",children:(0,m.jsx)("div",{className:"col-md-10 col-lg-6",children:(0,m.jsx)("div",{className:"card border-0",children:(0,m.jsxs)("div",{className:"card-body",children:[(0,m.jsxs)("div",{className:"mb-4",children:[(0,m.jsx)("h2",{className:"fw-bold",children:o[0].toUpperCase()+o.slice(1)}),(0,m.jsx)("p",{className:"text-muted",children:r})]}),"login"===o?(0,m.jsx)(h,{}):(0,m.jsx)(f,{}),(0,m.jsxs)("div",{className:"card-footer bg-white border-0 text-center",children:[(0,m.jsx)(n.rU,{to:s,children:a}),(0,m.jsx)(n.rU,{to:"/",children:"Back to homepage"})]})]})})})})})}}}]);
//# sourceMappingURL=819.37707d13.chunk.js.map