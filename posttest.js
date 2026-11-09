const post=[
["Maximum power is transferred to the load when:",["R_L = 0","R_L = R_th","R_L is very large"],1],
["A source has V_th = 20 V and R_th = 5 Ω. What is P_max?",["20 W","10 W","80 W"],0],
["Efficiency at maximum power transfer is:",["100%","75%","50%"],2],
["As R_L → ∞, the power delivered to the load:",["Goes to zero","Goes to maximum","Becomes infinite"],0],
["For an AC source with impedance Z_th, maximum power needs Z_L equal to:",["Z_th","The complex conjugate of Z_th","Zero"],1],
["A power utility should NOT operate at maximum power transfer because:",["The voltage is too high","Half the generated power is lost in the source","The load current is zero"],1]];
function quiz(id,qs){const el=document.getElementById(id);const ans={},sc=document.createElement("div");sc.className="fb";sc.setAttribute("aria-live","polite");el.appendChild(sc);
qs.forEach((q,i)=>{const d=document.createElement("div");d.className="q";
d.innerHTML=`<p>${i+1}. ${q[0].replace("R_L","R<sub>L</sub>").replace("R_th","R<sub>th</sub>").replace("V_th","V<sub>th</sub>").replace("Z_th","Z<sub>th</sub>").replace("Z_L","Z<sub>L</sub>")}</p>`;
q[1].forEach((o,j)=>{const l=document.createElement("label");const r=document.createElement("input");r.type="radio";r.name=id+i;
r.addEventListener("change",()=>{ans[id+i]=j===q[2];sc.textContent="Score: "+Object.values(ans).filter(Boolean).length+" / "+qs.length+" ("+Object.keys(ans).length+" answered)";f.textContent=j===q[2]?"Correct.":"Not quite. Review the Theory tab and try again.";f.className="fb "+(j===q[2]?"ok":"no")});
l.append(r," "+o.replace(/_/g," "));d.appendChild(l)});
const f=document.createElement("div");f.className="fb";f.setAttribute("aria-live","polite");d.appendChild(f);el.appendChild(d)})}
quiz("post",post);
let cq=[];
function mkCalc(){const V=2*(3+Math.floor(Math.random()*10)),R=[2,4,5,8,10,20][Math.floor(Math.random()*6)];
cq=[[`A source has V\u209c\u2095 = ${V} V and R\u209c\u2095 = ${R} Ω. At what R\u2097 (Ω) is the load power maximum?`,R],[`What is the maximum power P\u2098\u2090\u2093 (W) for this source?`,V*V/(4*R)],[`What is the load power (W) when R\u2097 = ${2*R} Ω?`,V*V*2*R/((3*R)*(3*R))],[`What is the efficiency (%) when maximum power is transferred?`,50]];
document.getElementById("calc").innerHTML=cq.map((q,i)=>`<div class="q"><p>${i+1}. ${q[0]}</p><input type="text" id="c${i}" inputmode="decimal" aria-label="Answer ${i+1}" style="max-width:160px;margin:0"></div>`).join("");
document.getElementById("score").textContent=""}
mkCalc();
$("chk").onclick=()=>{let n=0,w=[];cq.forEach((q,i)=>{const v=parseFloat($("c"+i).value);if(near(v,q[1]))n++;else w.push(`Q${i+1}: ${+q[1].toFixed(3)}`)});
const s=$("score");s.textContent=`Score: ${n} / ${cq.length}.`+(w.length?` Correct answers for the rest: ${w.join(", ")}.`:" Well done.");s.className="fb "+(n===cq.length?"ok":"no")};
$("newq").onclick=mkCalc;
