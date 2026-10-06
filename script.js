const F=[
{n:"Arthi",e:"👩‍🎤",c:"#ff9ecd",l:["er mathay bonk! Ekhono selfie-r angle thik korche 🤳","bonk khaye bolse: 'ami toh shudhu ek minute!' (1 ghonta age)"]},
{n:"Sejuti",e:"🧚‍♀️",c:"#b8f5d0",l:["bonk khaye bolse: 'ei, amar hair!' 💇‍♀️","er mathay hathuri porlo, ekhon Sejuti drama queen mode on 🎭"]},
{n:"Tanha",e:"😎",c:"#ffd9a0",l:["bonk khaye bolse: 'ami toh shob jani, tao lagse keno?' 🤨","er mathay bonk, ekhon sunglasses-o kaj korche na 🕶️"]},
{n:"Mumu",e:"🐮",c:"#cde7ff",l:["Moo-moo! bonk khaye Mumu dour dilo 🐄💨","er mathay bonk, tobuo hashi theke ni 😂"]},
{n:"Sabriha",e:"🦸‍♀️",c:"#e5c9ff",l:["bonk khaye bolse: 'ami superhero, byatha lage na' (lage 😭)","er mathay bonk, ekhon cape-o sathe nei 🦸‍♀️"]},
{n:"Nahid",e:"🤓",c:"#fff2a3",l:["bonk khaye chokher chosma shoman korlo 🤓","er mathay bonk! Ekhon 'actually...' bolar shahosh nei 😆"]},
{n:"Ashraful",e:"🍔",c:"#ffc4b0",l:["bonk khaye burger-er kotha mone porlo 🍔","er mathay bonk, treat dite hobe ekhon! 🍕"]},
{n:"Mahim",e:"🤪",c:"#c4ffb0",l:["bonk khaye hashte hashte pore gelo 🤣","er mathay bonk, tobuo bole 'aro mar!' 🤪"]},
{n:"Talha",e:"🥷",c:"#c9d4ff",l:["ninja chilo, tobuo bonk khaye dhora poreche 🥷","er mathay bonk! Ninja training ekhono baki 😅"]}
];
const BILL={n:"Bill",e:"💸",c:"#ff8a8a",l:["Bill-e bonk! Tumi ekhon sobar treat dibe 💸","Oops! Bill bonk korle taka tomar 😭"]};
const grid=document.getElementById("grid"),toast=document.getElementById("toast");
const $=id=>document.getElementById(id);
let holes=[],score=0,combo=0,time=30,run=false,tick,spawn,hits={};
for(let i=0;i<9;i++){const h=document.createElement("div");h.className="hole";
 h.innerHTML='<div class="mole"><div class="face"></div><div class="tag"></div></div>';
 const m=h.firstChild;h.onpointerdown=()=>bonk(i);grid.appendChild(h);holes.push({h,m,who:null,t:null});}
function show(i,p){const o=holes[i];o.who=p;const m=o.m;m.style.background=p.c;
 m.querySelector(".face").textContent=p.e;m.querySelector(".tag").textContent=p.n;
 m.classList.remove("hit");m.classList.add("up");
 clearTimeout(o.t);o.t=setTimeout(()=>hide(i,true),Math.max(550,1100-(30-time)*15));}
function hide(i,missed){const o=holes[i];if(!o.who)return;if(missed&&o.who!==BILL)combo=0;
 o.who=null;o.m.classList.remove("up");$("combo").textContent=combo;}
function say(p){const line=p.l[Math.floor(Math.random()*p.l.length)];
 toast.innerHTML='<span><span class="nm">'+p.n+'</span> '+line+'</span>';}
function bonk(i){if(!run)return;const o=holes[i],p=o.who;if(!p)return;
 o.m.classList.add("hit");clearTimeout(o.t);o.who=null;
 setTimeout(()=>o.m.classList.remove("up"),160);
 if(p===BILL){score=Math.max(0,score-5);combo=0;}
 else{combo++;score+=10+Math.min(combo,10);hits[p.n]=(hits[p.n]||0)+1;}
 say(p);$("score").textContent=score;$("combo").textContent=combo;}
function next(){if(!run)return;
 const free=holes.map((x,i)=>x.who?-1:i).filter(i=>i>=0);
 if(free.length){const i=free[Math.floor(Math.random()*free.length)];
  show(i,Math.random()<.15?BILL:F[Math.floor(Math.random()*F.length)]);}
 spawn=setTimeout(next,Math.max(350,750-(30-time)*12));}
function start(){score=0;combo=0;time=30;hits={};run=true;
 $("score").textContent=0;$("combo").textContent=0;$("time").textContent=30;
 $("end").style.display="none";$("start").style.display="none";
 toast.textContent="Bonk bonk bonk! 🔨";
 tick=setInterval(()=>{time--;$("time").textContent=time;if(time<=0)finish();},1000);next();}
function finish(){run=false;clearInterval(tick);clearTimeout(spawn);
 holes.forEach((_,i)=>{clearTimeout(holes[i].t);holes[i].who=null;holes[i].m.classList.remove("up");});
 $("fs").textContent=score;
 const r=score>=300?"👑 Bondhu-Bonk Samrat!":score>=200?"🔨 Pro Bonker":score>=100?"😏 Thik-thak Bonker":"🐢 Tumi to bondhuder bhoy pao!";
 $("rank").textContent=r;
 const top=Object.entries(hits).sort((a,b)=>b[1]-a[1]);
 $("most").innerHTML=top.length?'Shobcheye beshi bonk khaise: <span class="nm">'+top[0][0]+'</span> ('+top[0][1]+' bar) 😂':"Keu bonk khai nai, bondhura khushi 😇";
 $("chips").innerHTML=F.map(f=>'<span class="chip" style="background:'+f.c+'">'+f.n+': '+(hits[f.n]||0)+'</span>').join("");
 $("end").style.display="block";$("start").style.display="inline-block";$("start").textContent="🔁 Abar Khelo";
 toast.textContent="Time shesh! Bondhuder kachhe maaf chao 🙏";}
$("start").onclick=start;
