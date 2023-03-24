(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function c(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=c(n);fetch(n.href,i)}})();const w={"-":" ",O:"🚪",X:"🧱",I:"🎁",PLAYER:"👾",BOMB_COLLISION:"🔥",GAME_OVER:"👎",WIN:"🏆",HEART:"❤️"},E=[];E.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);E.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);E.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);function S(o){const t=Math.floor(o/1e3/60).toString().padStart(2,"0"),c=(Math.floor(o/1e3)%60).toString().padStart(2,"0"),r=Math.floor(o%1e3/100).toString().padStart(1,"0");return`${t}:${c}:${r}`}let e={x:void 0,y:void 0},u={x:void 0,y:void 0},M=[],s,X;const P=10;let L=0,f=3,l,p,y=!1;const a=document.querySelector("#game"),m=a.getContext("2d"),N=document.getElementById("up"),k=document.getElementById("left"),W=document.getElementById("right"),_=document.getElementById("down"),D=document.getElementById("start-game"),v=document.getElementById("modal-start-game"),x=document.getElementById("modal-game-over"),T=document.getElementById("modal-game-win"),Y=document.getElementById("finish"),B=document.getElementById("win-message"),z=document.getElementById("start-game-after"),F=document.getElementById("no-continue"),$=document.getElementById("lives"),q=document.getElementById("time"),K=document.getElementById("lives-2"),U=document.getElementById("time-2"),V=document.getElementById("record"),j=document.getElementById("record-2");N.addEventListener("click",O);k.addEventListener("click",A);W.addEventListener("click",R);_.addEventListener("click",C);function O(){e.y!==void 0&&(Math.ceil(e.y-X)<X||(e.y-=X,d()))}function A(){e.x!==void 0&&(Math.ceil(e.x-X)<X||(e.x-=X,d()))}function R(){e.x!==void 0&&(Math.floor(e.x+X)>s||(e.x+=X,d()))}function C(){e.y!==void 0&&(Math.floor(e.y+X)>s||(e.y+=X,d()))}window.addEventListener("keydown",Q);function Q(o){const t=o.key;t==="ArrowUp"||t==="w"?O():t==="ArrowLeft"||t==="a"?A():t==="ArrowRight"||t==="d"?R():(t==="ArrowDown"||t==="s")&&C()}D.addEventListener("click",()=>{y=!0,G()});window.addEventListener("resize",G);function G(){y===!0&&(window.innerHeight>window.innerWidth?s=window.innerWidth*.65:s=window.innerHeight*.65,Number(s.toFixed(0)),a==null||a.setAttribute("width",String(s)),a==null||a.setAttribute("height",String(s)),X=s/P,e.x=void 0,e.y=void 0,d(),v&&(v.style.display="none"))}function d(){if(y==!0&&m){const o=E[L];if(!o){ee();return}l||(l=Date.now(),clearInterval(p),p=setInterval(ie,100),b());const c=o.trim().split(`
`).map(r=>r.trim().split(""));m.font=`${X*.95}px Verdana`,m.textAlign="right",M=[],m.clearRect(0,0,s,s),c.forEach((r,n)=>{r.forEach((i,g)=>{const H=w[i],h=X*(g+1),I=X*(n+1);i==="O"?!e.x&&!e.y&&(e.x=h,e.y=I):i==="I"?(u.x=h,u.y=I):i==="X"&&M.push({x:h,y:I}),m.fillText(H,h,I),ne()})}),J()}}function J(){if(m&&e.x&&e.y&&u.x&&u.y){const o=Math.ceil(e.x)===Math.ceil(u.x),t=Math.ceil(e.y)===Math.ceil(u.y);o&&t&&Z(),M.find(r=>{const n=Math.ceil(r.x)===Math.ceil(e.x??0),i=Math.ceil(r.y)===Math.ceil(e.y??0);return n&&i})&&te(),m.fillText(w.PLAYER,e.x,e.y)}}function Z(){L++,d()}function ee(){if(l){clearInterval(p),y=!1,T.classList.remove("hidden");const o=Number(localStorage.getItem("record_time")),t=Number(Date.now()-l);o?o>t?(localStorage.setItem("record_time",String(t)),B.innerText="🎉 Superaste tu record 🎉"):B.innerText="Sigue intentando superar tu record":(localStorage.setItem("record_time",String(t)),B.innerText="¡Genial! Ahora puedes intentar superar tu record actual"),b(),Y.addEventListener("click",()=>{L=0,f=3,l=void 0,clearInterval(p),T.classList.add("hidden"),v.style.display="block"})}}function te(){f--,f<=0&&(L=0,f=3,l=void 0,clearInterval(p),y=!1,x.classList.remove("hidden"),v.style.display="none",z.addEventListener("click",()=>{y=!0,x.classList.add("hidden"),d()}),F.addEventListener("click",()=>{x.classList.add("hidden"),v.style.display="block"})),e.x=void 0,e.y=void 0,d()}function ne(){$.innerHTML=w.HEART.repeat(f),K.innerHTML=w.HEART.repeat(f)}function ie(){if(l){const t=Date.now()-l,c=S(t);q.innerHTML=c,U.innerHTML=c}}function b(){const o=Number(localStorage.getItem("record_time"))||0,t=S(o);V.innerHTML=t,j.innerHTML=t}
