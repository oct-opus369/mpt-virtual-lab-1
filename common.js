const $=id=>document.getElementById(id);
const near=(x,y)=>Math.abs(x-y)<=Math.max(0.02*Math.abs(y),0.02);
const KEY="mpt-readings";
function loadRows(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
function saveRows(r){try{localStorage.setItem(KEY,JSON.stringify(r))}catch(e){}}
