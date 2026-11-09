const pre=[
["What does a Thévenin equivalent circuit consist of?",["A current source in parallel with a resistor","A voltage source in series with a resistor","Two voltage sources in parallel"],1],
["Power in a resistor R carrying current I is:",["I/R","I²R","V/R²"],1],
["If R_th = 5 Ω, what happens to the current when R_L increases?",["It increases","It stays the same","It decreases"],2],
["Efficiency of a source is the ratio of:",["Output power to input power","Input voltage to output voltage","Load current to source current"],0],
["Which law is used to find the current in a series loop?",["Kirchhoff’s voltage law","Gauss’s law","Faraday’s law"],0]];
function quiz(id,qs){const el=document.getElementById(id);const ans={},sc=document.createElement("div");sc.className="fb";sc.setAttribute("aria-live","polite");el.appendChild(sc);
qs.forEach((q,i)=>{const d=document.createElement("div");d.className="q";
d.innerHTML=`<p>${i+1}. ${q[0].replace("R_L","R<sub>L</sub>").replace("R_th","R<sub>th</sub>").replace("V_th","V<sub>th</sub>").replace("Z_th","Z<sub>th</sub>").replace("Z_L","Z<sub>L</sub>")}</p>`;
q[1].forEach((o,j)=>{const l=document.createElement("label");const r=document.createElement("input");r.type="radio";r.name=id+i;
r.addEventListener("change",()=>{ans[id+i]=j===q[2];sc.textContent="Score: "+Object.values(ans).filter(Boolean).length+" / "+qs.length+" ("+Object.keys(ans).length+" answered)";f.textContent=j===q[2]?"Correct.":"Not quite. Review the Theory tab and try again.";f.className="fb "+(j===q[2]?"ok":"no")});
l.append(r," "+o.replace(/_/g," "));d.appendChild(l)});
const f=document.createElement("div");f.className="fb";f.setAttribute("aria-live","polite");d.appendChild(f);el.appendChild(d)})}
quiz("pre",pre);
