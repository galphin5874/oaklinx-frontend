import{r as e,u as k,a as y,g as L,j as a,I as w,B,b as F,c as R}from"./index-f7c5f732.js";function $(){const[f,n]=e.useState(!1),[h,p]=e.useState();e.useState();const[o,g]=e.useState(""),[d,m]=e.useState(""),[x,c]=e.useState(!1),[S,i]=e.useState(!1),[j,r]=e.useState([]),[v,l]=e.useState(!1),[P,C]=e.useState(!1),N=k(),E=y();e.useEffect(()=>{L().then(s=>p(s.data))},[]),e.useEffect(()=>{const s=()=>{o.length<8?(r(t=>[...t,"Password must be at least 8 chars"]),c(!1)):c(!0),o!==d?(r(t=>[...t,"Passwords must match"]),i(!1)):i(!0)};u(),o.length>0&&d.length>0&&s()},[o,d]);const u=()=>{l(!1),r([])},T=()=>{x&&S?(u(),n(!0),F.post(`${R}${N.pathname}`,{new_password:o,confirmed_password:o},{headers:{"Content-Type":"multipart/form-data","X-CSRFToken":h}}).then(s=>{s.data=="success"?(C(!0),setTimeout(()=>{E("/")},2500)):(r(t=>[...t,s.data]),l(!0),n(!1))}).catch(s=>console.log(s))):(l(!0),n(!1))};return a.jsx("div",{className:"setpassword-container",children:a.jsxs("div",{className:"setpassword-form-fade",children:[a.jsx("div",{className:"setpassword-logo-container",children:a.jsx("img",{className:"setpassword-logo",src:logo})}),P?a.jsx("div",{className:"setpassword-success-container",children:"Password changed succesfully, redirecting to login..."}):null,v?a.jsx("div",{children:a.jsx("div",{className:"setpassword-error-header",children:j.map((s,t)=>a.jsxs("div",{children:[t+1,". ",s]},t))})}):null,a.jsxs("div",{className:"setpassword-form",children:[a.jsx(w,{type:"password",placeholder:"New Password",autoFocus:!0,autoComplete:"true",onChange:s=>g(s.target.value)}),a.jsx(w,{type:"password",placeholder:"Confirm Password",autoComplete:"true",onChange:s=>m(s.target.value)}),a.jsx(B,{text:"Save",style:{margin:5},loading:f,onClick:()=>T()})]})]})})}export{$ as default};