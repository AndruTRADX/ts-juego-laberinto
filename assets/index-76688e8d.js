(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const v of o.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&r(v)}).observe(document,{childList:!0,subtree:!0});function c(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=c(i);fetch(i.href,o)}})();const L={"-":" ",O:"🚪",X:"🧱",I:"🎁",PLAYER:"👾",BOMB_COLLISION:"🔥",GAME_OVER:"👎",WIN:"🏆",HEART:"❤️"},B=[];B.push(`
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
`);B.push(`
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
  `);B.push(`
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
`);function C(n){const e=Math.floor(n/1e3/60).toString().padStart(2,"0"),c=(Math.floor(n/1e3)%60).toString().padStart(2,"0"),r=Math.floor(n%1e3/100).toString().padStart(1,"0");return`${e}:${c}:${r}`}let t={x:void 0,y:void 0},f={x:void 0,y:void 0},T=[],s,X;const _=10;let h=0,m=3,l,y,g=!1,w;const d=document.querySelector("#game"),a=d.getContext("2d"),D=document.getElementById("up"),Y=document.getElementById("left"),z=document.getElementById("right"),F=document.getElementById("down"),$=document.getElementById("start-game"),p=document.getElementById("modal-start-game"),x=document.getElementById("modal-game-over"),O=document.getElementById("modal-game-win"),q=document.getElementById("finish"),M=document.getElementById("win-message"),K=document.getElementById("start-game-after"),U=document.getElementById("no-continue"),R=document.getElementById("modal-counter"),A=document.getElementById("counter"),V=document.getElementById("reset"),j=document.getElementById("lives"),Q=document.getElementById("time"),J=document.getElementById("lives-2"),Z=document.getElementById("time-2"),ee=document.getElementById("record"),te=document.getElementById("record-2");D.addEventListener("click",G);Y.addEventListener("click",b);z.addEventListener("click",H);F.addEventListener("click",P);function G(){t.y!==void 0&&(Math.ceil(t.y-X)<X||(t.y-=X,u()))}function b(){t.x!==void 0&&(Math.ceil(t.x-X)<X||(t.x-=X,u()))}function H(){t.x!==void 0&&(Math.floor(t.x+X)>s||(t.x+=X,u()))}function P(){t.y!==void 0&&(Math.floor(t.y+X)>s||(t.y+=X,u()))}window.addEventListener("keydown",ne);function ne(n){const e=n.key;e==="ArrowUp"||e==="w"?G():e==="ArrowLeft"||e==="a"?b():e==="ArrowRight"||e==="d"?H():(e==="ArrowDown"||e==="s")&&P()}function S(){h=0,m=3,l=void 0,clearInterval(y),W()}$.addEventListener("click",()=>{g=!0,S()});V.addEventListener("click",()=>S());window.addEventListener("resize",()=>S());function W(){if(window.innerWidth<500?w=.875:w=.65,g===!0){window.innerHeight>window.innerWidth?s=window.innerWidth*w:s=window.innerHeight*w,Number(s.toFixed(0)),d==null||d.setAttribute("width",String(s)),d==null||d.setAttribute("height",String(s)),X=s/_,t.x=void 0,t.y=void 0,p&&(p.style.display="none"),R.classList.remove("hidden");let n=2;A.innerText="3";const e=setInterval(()=>{A.innerText=String(n),n--,n<0&&(clearInterval(e),R.classList.add("hidden"),u())},1e3)}}function u(){if(g==!0&&a){const n=B[h];if(!n){Xe();return}l||(l=Date.now(),clearInterval(y),y=setInterval(ce,100),k());const c=n.trim().split(`
`).map(r=>r.trim().split(""));a.font=`${X*.95}px Verdana`,a.textAlign="right",T=[],a.clearRect(0,0,s,s),c.forEach((r,i)=>{r.forEach((o,v)=>{const N=L[o],I=X*(v+1),E=X*(i+1);o==="O"?!t.x&&!t.y&&(t.x=I,t.y=E):o==="I"?(f.x=I,f.y=E):o==="X"&&T.push({x:I,y:E}),a.fillText(N,I,E),se()})}),ie()}}function ie(){if(a&&t.x&&t.y&&f.x&&f.y){const n=Math.ceil(t.x)===Math.ceil(f.x),e=Math.ceil(t.y)===Math.ceil(f.y);n&&e&&oe(),T.find(r=>{const i=Math.ceil(r.x)===Math.ceil(t.x??0),o=Math.ceil(r.y)===Math.ceil(t.y??0);return i&&o})&&re(),a.fillText(L.PLAYER,t.x,t.y)}}function oe(){h++,u()}function Xe(){if(l){clearInterval(y),g=!1,O.classList.remove("hidden");const n=Number(localStorage.getItem("record_time")),e=Number(Date.now()-l);n?n>e?(localStorage.setItem("record_time",String(e)),M.innerText="🎉 Superaste tu record 🎉"):M.innerText="Sigue intentando superar tu record":(localStorage.setItem("record_time",String(e)),M.innerText="¡Genial! Ahora puedes intentar superar tu record actual"),k(),q.addEventListener("click",()=>{h=0,m=3,l=void 0,clearInterval(y),O.classList.add("hidden"),p.style.display="block"})}}function re(){m--,m<=0&&(h=0,m=3,l=void 0,clearInterval(y),g=!1,x.classList.remove("hidden"),p.style.display="none",K.addEventListener("click",()=>{g=!0,x.classList.add("hidden"),W()}),U.addEventListener("click",()=>{x.classList.add("hidden"),p.style.display="block"})),t.x=void 0,t.y=void 0,u()}function se(){j.innerHTML=L.HEART.repeat(m),J.innerHTML=L.HEART.repeat(m)}function ce(){if(l){const e=Date.now()-l,c=C(e);Q.innerHTML=c,Z.innerHTML=c}}function k(){const n=Number(localStorage.getItem("record_time"))||0,e=C(n);ee.innerHTML=e,te.innerHTML=e}
