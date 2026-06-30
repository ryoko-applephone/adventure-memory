
const ids=["titleScreen","playerScreen","homeScreen","mapScreen","badgeScreen"];
const screens={};ids.forEach(i=>screens[i]=document.getElementById(i));
function show(id){Object.values(screens).forEach(s=>s.classList.add("hidden"));screens[id].classList.remove("hidden");if(id==="badgeScreen")renderBadges();}
function save(){localStorage.setItem("adventureSave",JSON.stringify(state));}
let state=JSON.parse(localStorage.getItem("adventureSave")||"null");
document.getElementById("startButton").onclick=()=>show("playerScreen");
document.querySelectorAll(".player").forEach(b=>b.onclick=()=>{state={name:b.dataset.player,exp:25,badges:[]};save();load();show("homeScreen");});
function load(){if(!state)return;playerName.textContent="⚔️ "+state.name+" の城";expBar.style.width=state.exp+"%";}
shirakabaButton.onclick=()=>show("mapScreen");
backButton.onclick=()=>{load();show("homeScreen");}
badgeButton.onclick=()=>show("badgeScreen");
badgeBack.onclick=()=>show("homeScreen");
document.querySelectorAll(".event").forEach(b=>b.onclick=()=>{const n=b.textContent.trim();if(!state.badges.includes(n)){state.badges.push(n);state.exp=Math.min(100,state.exp+Number(b.dataset.exp));alert(n+"クリア！");save();}load();});
function renderBadges(){badgeList.innerHTML="";(state?.badges||[]).forEach(x=>{let li=document.createElement("li");li.textContent="🏅 "+x;badgeList.appendChild(li);});}
window.onload=()=>{if(state){load();show("homeScreen");}else show("titleScreen");}
