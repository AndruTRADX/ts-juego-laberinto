(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function c(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=c(i);fetch(i.href,o)}})();const w={"-":" ",O:"🚪",X:"🧱",I:"🎁",PLAYER:"👾",BOMB_COLLISION:"🔥",GAME_OVER:"👎",WIN:"🏆",HEART:"❤️"},L=[];L.push(`
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
`);function C(n){const e=Math.floor(n/1e3/60).toString().padStart(2,"0"),c=(Math.floor(n/1e3)%60).toString().padStart(2,"0"),r=Math.floor(n%1e3/100).toString().padStart(1,"0");return`${e}:${c}:${r}`}let t={x:void 0,y:void 0},f={x:void 0,y:void 0},S=[],s,X;const N=10;let B=0,y=3,l,p,m=!1,E;const d=document.querySelector("#game"),a=d.getContext("2d"),_=document.getElementById("up"),D=document.getElementById("left"),Y=document.getElementById("right"),z=document.getElementById("down"),F=document.getElementById("start-game"),v=document.getElementById("modal-start-game"),M=document.getElementById("modal-game-over"),O=document.getElementById("modal-game-win"),$=document.getElementById("finish"),T=document.getElementById("win-message"),q=document.getElementById("start-game-after"),K=document.getElementById("no-continue"),R=document.getElementById("modal-counter"),A=document.getElementById("counter"),U=document.getElementById("reset"),V=document.getElementById("lives"),j=document.getElementById("time"),Q=document.getElementById("lives-2"),J=document.getElementById("time-2"),Z=document.getElementById("record"),ee=document.getElementById("record-2");_.addEventListener("click",G);D.addEventListener("click",b);Y.addEventListener("click",H);z.addEventListener("click",P);function G(){t.y!==void 0&&(Math.ceil(t.y-X)<X||(t.y-=X,u()))}function b(){t.x!==void 0&&(Math.ceil(t.x-X)<X||(t.x-=X,u()))}function H(){t.x!==void 0&&(Math.floor(t.x+X)>s||(t.x+=X,u()))}function P(){t.y!==void 0&&(Math.floor(t.y+X)>s||(t.y+=X,u()))}window.addEventListener("keydown",te);function te(n){const e=n.key;e==="ArrowUp"||e==="w"?G():e==="ArrowLeft"||e==="a"?b():e==="ArrowRight"||e==="d"?H():(e==="ArrowDown"||e==="s")&&P()}F.addEventListener("click",()=>{m=!0,x()});U.addEventListener("click",()=>{m=!0,x()});window.addEventListener("resize",x);function x(){if(window.innerWidth<500?E=.875:E=.65,m===!0){window.innerHeight>window.innerWidth?s=window.innerWidth*E:s=window.innerHeight*E,Number(s.toFixed(0)),d==null||d.setAttribute("width",String(s)),d==null||d.setAttribute("height",String(s)),X=s/N,t.x=void 0,t.y=void 0,v&&(v.style.display="none"),R.classList.remove("hidden");let n=2;A.innerText="3";const e=setInterval(()=>{A.innerText=String(n),n--,n<0&&(clearInterval(e),R.classList.add("hidden"),u())},1e3)}}function u(){if(m==!0&&a){const n=L[B];if(!n){oe();return}l||(l=Date.now(),clearInterval(p),p=setInterval(se,100),W());const c=n.trim().split(`
`).map(r=>r.trim().split(""));a.font=`${X*.95}px Verdana`,a.textAlign="right",S=[],a.clearRect(0,0,s,s),c.forEach((r,i)=>{r.forEach((o,g)=>{const k=w[o],h=X*(g+1),I=X*(i+1);o==="O"?!t.x&&!t.y&&(t.x=h,t.y=I):o==="I"?(f.x=h,f.y=I):o==="X"&&S.push({x:h,y:I}),a.fillText(k,h,I),re()})}),ne()}}function ne(){if(a&&t.x&&t.y&&f.x&&f.y){const n=Math.ceil(t.x)===Math.ceil(f.x),e=Math.ceil(t.y)===Math.ceil(f.y);n&&e&&ie(),S.find(r=>{const i=Math.ceil(r.x)===Math.ceil(t.x??0),o=Math.ceil(r.y)===Math.ceil(t.y??0);return i&&o})&&Xe(),a.fillText(w.PLAYER,t.x,t.y)}}function ie(){B++,u()}function oe(){if(l){clearInterval(p),m=!1,O.classList.remove("hidden");const n=Number(localStorage.getItem("record_time")),e=Number(Date.now()-l);n?n>e?(localStorage.setItem("record_time",String(e)),T.innerText="🎉 Superaste tu record 🎉"):T.innerText="Sigue intentando superar tu record":(localStorage.setItem("record_time",String(e)),T.innerText="¡Genial! Ahora puedes intentar superar tu record actual"),W(),$.addEventListener("click",()=>{B=0,y=3,l=void 0,clearInterval(p),O.classList.add("hidden"),v.style.display="block"})}}function Xe(){y--,y<=0&&(B=0,y=3,l=void 0,clearInterval(p),m=!1,M.classList.remove("hidden"),v.style.display="none",q.addEventListener("click",()=>{m=!0,M.classList.add("hidden"),x()}),K.addEventListener("click",()=>{M.classList.add("hidden"),v.style.display="block"})),t.x=void 0,t.y=void 0,u()}function re(){V.innerHTML=w.HEART.repeat(y),Q.innerHTML=w.HEART.repeat(y)}function se(){if(l){const e=Date.now()-l,c=C(e);j.innerHTML=c,J.innerHTML=c}}function W(){const n=Number(localStorage.getItem("record_time"))||0,e=C(n);Z.innerHTML=e,ee.innerHTML=e}
