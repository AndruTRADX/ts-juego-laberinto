(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function c(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=c(n);fetch(n.href,i)}})();const E={"-":" ",O:"🚪",X:"🧱",I:"🎁",PLAYER:"👾",BOMB_COLLISION:"🔥",GAME_OVER:"👎",WIN:"🏆",HEART:"❤️"},L=[];L.push(`
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
`);L.push(`
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
  `);L.push(`
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
`);function O(o){const t=Math.floor(o/1e3/60).toString().padStart(2,"0"),c=(Math.floor(o/1e3)%60).toString().padStart(2,"0"),r=Math.floor(o%1e3/100).toString().padStart(1,"0");return`${t}:${c}:${r}`}let e={x:void 0,y:void 0},f={x:void 0,y:void 0},T=[],s,X;const W=10;let x=0,u=3,l,p,y=!1,I;const a=document.querySelector("#game"),m=a.getContext("2d"),N=document.getElementById("up"),k=document.getElementById("left"),_=document.getElementById("right"),D=document.getElementById("down"),Y=document.getElementById("start-game"),h=document.getElementById("modal-start-game"),B=document.getElementById("modal-game-over"),S=document.getElementById("modal-game-win"),z=document.getElementById("finish"),M=document.getElementById("win-message"),F=document.getElementById("start-game-after"),$=document.getElementById("no-continue"),q=document.getElementById("lives"),K=document.getElementById("time"),U=document.getElementById("lives-2"),V=document.getElementById("time-2"),j=document.getElementById("record"),Q=document.getElementById("record-2");N.addEventListener("click",A);k.addEventListener("click",R);_.addEventListener("click",C);D.addEventListener("click",G);function A(){e.y!==void 0&&(Math.ceil(e.y-X)<X||(e.y-=X,d()))}function R(){e.x!==void 0&&(Math.ceil(e.x-X)<X||(e.x-=X,d()))}function C(){e.x!==void 0&&(Math.floor(e.x+X)>s||(e.x+=X,d()))}function G(){e.y!==void 0&&(Math.floor(e.y+X)>s||(e.y+=X,d()))}window.addEventListener("keydown",J);function J(o){const t=o.key;t==="ArrowUp"||t==="w"?A():t==="ArrowLeft"||t==="a"?R():t==="ArrowRight"||t==="d"?C():(t==="ArrowDown"||t==="s")&&G()}Y.addEventListener("click",()=>{y=!0,b()});window.addEventListener("resize",b);function b(){window.innerWidth<500?I=.875:I=.65,y===!0&&(window.innerHeight>window.innerWidth?s=window.innerWidth*I:s=window.innerHeight*I,Number(s.toFixed(0)),a==null||a.setAttribute("width",String(s)),a==null||a.setAttribute("height",String(s)),X=s/W,e.x=void 0,e.y=void 0,h&&(h.style.display="none"),d())}function d(){if(y==!0&&m){const o=L[x];if(!o){te();return}l||(l=Date.now(),clearInterval(p),p=setInterval(oe,100),H());const c=o.trim().split(`
`).map(r=>r.trim().split(""));m.font=`${X*.95}px Verdana`,m.textAlign="right",T=[],m.clearRect(0,0,s,s),c.forEach((r,n)=>{r.forEach((i,g)=>{const P=E[i],v=X*(g+1),w=X*(n+1);i==="O"?!e.x&&!e.y&&(e.x=v,e.y=w):i==="I"?(f.x=v,f.y=w):i==="X"&&T.push({x:v,y:w}),m.fillText(P,v,w),ie()})}),Z()}}function Z(){if(m&&e.x&&e.y&&f.x&&f.y){const o=Math.ceil(e.x)===Math.ceil(f.x),t=Math.ceil(e.y)===Math.ceil(f.y);o&&t&&ee(),T.find(r=>{const n=Math.ceil(r.x)===Math.ceil(e.x??0),i=Math.ceil(r.y)===Math.ceil(e.y??0);return n&&i})&&ne(),m.fillText(E.PLAYER,e.x,e.y)}}function ee(){x++,d()}function te(){if(l){clearInterval(p),y=!1,S.classList.remove("hidden");const o=Number(localStorage.getItem("record_time")),t=Number(Date.now()-l);o?o>t?(localStorage.setItem("record_time",String(t)),M.innerText="🎉 Superaste tu record 🎉"):M.innerText="Sigue intentando superar tu record":(localStorage.setItem("record_time",String(t)),M.innerText="¡Genial! Ahora puedes intentar superar tu record actual"),H(),z.addEventListener("click",()=>{x=0,u=3,l=void 0,clearInterval(p),S.classList.add("hidden"),h.style.display="block"})}}function ne(){u--,u<=0&&(x=0,u=3,l=void 0,clearInterval(p),y=!1,B.classList.remove("hidden"),h.style.display="none",F.addEventListener("click",()=>{y=!0,B.classList.add("hidden"),d()}),$.addEventListener("click",()=>{B.classList.add("hidden"),h.style.display="block"})),e.x=void 0,e.y=void 0,d()}function ie(){q.innerHTML=E.HEART.repeat(u),U.innerHTML=E.HEART.repeat(u)}function oe(){if(l){const t=Date.now()-l,c=O(t);K.innerHTML=c,V.innerHTML=c}}function H(){const o=Number(localStorage.getItem("record_time"))||0,t=O(o);j.innerHTML=t,Q.innerHTML=t}
