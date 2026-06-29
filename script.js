const screens={
title:document.getElementById('titleScreen'),
player:document.getElementById('playerScreen'),
home:document.getElementById('homeScreen'),
map:document.getElementById('mapScreen')
};

function show(name){
Object.values(screens).forEach(s=>s&&s.classList.add('hidden'));
screens[name]&&screens[name].classList.remove('hidden');
}

document.getElementById('startButton')?.addEventListener('click',()=>show('player'));

document.querySelectorAll('.player').forEach(btn=>{
btn.addEventListener('click',()=>{
const save={
name:btn.dataset.player,
level:1,
exp:25,
badges:[]
};
localStorage.setItem('adventureSave',JSON.stringify(save));
loadPlayer();
show('home');
});
});

function loadPlayer(){
const save=JSON.parse(localStorage.getItem('adventureSave')||'{}');
if(save.name){
document.getElementById('playerName').textContent='⚔️ '+save.name+' の城';
const bar=document.getElementById('expBar');
if(bar) bar.style.width=(save.exp||0)+'%';
}
}

document.getElementById('shirakabaButton')?.addEventListener('click',()=>show('map'));
document.getElementById('backButton')?.addEventListener('click',()=>show('home'));

window.addEventListener('load',()=>{
if(localStorage.getItem('adventureSave')){
loadPlayer();
show('home');
}else{
show('title');
}
});

screens.event=document.getElementById('eventScreen');
document.getElementById('questButton')?.addEventListener('click',()=>show('event'));
document.getElementById('clearButton')?.addEventListener('click',()=>{
 let save=JSON.parse(localStorage.getItem('adventureSave')||'{}');
 save.exp=Math.min((save.exp||25)+15,100);
 save.badges=save.badges||[];
 if(!save.badges.includes('bus')) save.badges.push('bus');
 localStorage.setItem('adventureSave',JSON.stringify(save));
 loadPlayer();
 alert('経験値+15！');
 show('home');
});
