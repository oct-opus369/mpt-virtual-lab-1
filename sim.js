let rows=loadRows(),showTh=false;
const P=(V,R,L)=>V*V*L/((R+L)*(R+L));
function vals(){return{V:+$("V").value,R:+$("R").value,L:+$("L").value}}
function draw(){const{V,R,L}=vals();const I=V/(R+L),VL=I*L,PL=I*I*L,Pm=V*V/(4*R),eta=100*L/(R+L);
$("oV").textContent=V+" V";$("oR").textContent=R+" Ω";$("oL").textContent=L+" Ω";
$("cV").textContent=V+" V";$("cR").textContent=R+" Ω";$("cL").textContent=L+" Ω";
$("mA").textContent=I.toFixed(2)+" A";$("rI").textContent=I.toFixed(3);$("rV").textContent=VL.toFixed(2);$("rP").textContent=PL.toFixed(3);$("rE").textContent=eta.toFixed(1);$("rM").textContent=Pm.toFixed(3);$("rT").textContent=(PL/Pm*100).toFixed(1)+"%";
const near=Math.abs(L-R)<=0.05*R;
$("hit").textContent=near?"R\u2097 matches R\u209c\u2095: load power is at its maximum.":(L<R?"Load is below R\u209c\u2095. Increase R\u2097.":"Load is above R\u209c\u2095. Decrease R\u2097.");
$("hit").style.color=near?"var(--ok)":"var(--mute)";
const W=440,H=300,m={l:52,r:14,t:16,b:44},xm=Math.max(40,Math.ceil(4*R/10)*10),ym=Pm*1.15;
const X=x=>m.l+x/xm*(W-m.l-m.r),Y=y=>H-m.b-y/ym*(H-m.t-m.b);
let s=`<rect x="${m.l}" y="${m.t}" width="${W-m.l-m.r}" height="${H-m.t-m.b}" fill="none" stroke="var(--line)"/>`;
for(let i=0;i<=4;i++){const xv=xm*i/4,yv=ym*i/4;
s+=`<text x="${X(xv)}" y="${H-m.b+16}" font-size="11" text-anchor="middle">${+xv.toFixed(1)}</text><text x="${m.l-6}" y="${Y(yv)+4}" font-size="11" text-anchor="end">${yv.toFixed(2)}</text>`}
s+=`<text x="${(W+m.l)/2}" y="${H-6}" font-size="12" text-anchor="middle">Load resistance R\u2097 (Ω)</text><text transform="translate(13 ${H/2}) rotate(-90)" font-size="12" text-anchor="middle">Load power (W)</text>`;
s+=`<line x1="${X(R)}" x2="${X(R)}" y1="${m.t}" y2="${H-m.b}" stroke="var(--teal)" stroke-dasharray="4 4"/><text x="${X(R)+4}" y="${m.t+12}" font-size="11" style="fill:var(--teal)">R\u2097 = R\u209c\u2095</text>`;
if(showTh){let d="";for(let i=0;i<=150;i++){const x=xm*i/150;d+=(i?"L":"M")+X(x).toFixed(1)+" "+Y(P(V,R,x)).toFixed(1)}
s+=`<path d="${d}" fill="none" stroke="var(--amber)" stroke-width="2.5"/>`}
rows.forEach(r=>{if(r.V===V&&r.R===R&&r.L<=xm)s+=`<circle cx="${X(r.L)}" cy="${Y(r.P)}" r="4" fill="var(--navy)" stroke="var(--panel)"/>`});
s+=`<circle cx="${X(L)}" cy="${Y(PL)}" r="7" fill="var(--amber)" stroke="var(--ink)" stroke-width="2"/>`;
$("chart").innerHTML=s}
function table(){const tb=$("tb");if(!rows.length){tb.innerHTML='<tr><td colspan="6" style="text-align:center;color:var(--mute)">No readings yet. Move the load slider and click Record reading.</td></tr>';return}
tb.innerHTML=rows.map((r,i)=>`<tr><td>${i+1}</td><td>${r.L}</td><td>${r.I.toFixed(3)}</td><td>${r.VL.toFixed(2)}</td><td>${r.P.toFixed(3)}</td><td>${r.eta.toFixed(1)}</td></tr>`).join("")}
["V","R","L"].forEach(k=>$(k).addEventListener("input",draw));
$("rec").onclick=()=>{const{V,R,L}=vals(),I=V/(R+L);rows.push({V,R,L,I,VL:I*L,P:I*I*L,eta:100*L/(R+L)});saveRows(rows);table();draw()};
$("th").onclick=()=>{showTh=!showTh;$("th").textContent=showTh?"Hide theoretical curve":"Show theoretical curve";draw()};
$("clr").onclick=()=>{rows=[];saveRows(rows);table();draw()};
const tv=()=>{const S=+$("tS").value,a=+$("t1").value,b=+$("t2").value;return{Vth:S*b/(a+b),Rth:a*b/(a+b)}};
function tOut(){$("oS").textContent=$("tS").value+" V";$("o1").textContent=$("t1").value+" Ω";$("o2").textContent=$("t2").value+" Ω";$("aF").textContent=""}
["tS","t1","t2"].forEach(k=>$(k).addEventListener("input",tOut));
$("aC").onclick=()=>{const t=tv(),v=parseFloat($("aV").value),r=parseFloat($("aR").value),gv=near(v,t.Vth),gr=near(r,t.Rth),f=$("aF");
if(gv&&gr){f.textContent=`Correct. Vth = ${t.Vth.toFixed(2)} V and Rth = ${t.Rth.toFixed(2)} Ω. Click Use values in Part B.`;f.className="fb ok"}
else{f.textContent=`Not yet. Your Vth is ${isNaN(v)?"missing":gv?"correct":"wrong"} and your Rth is ${isNaN(r)?"missing":gr?"correct":"wrong"}. Use the hint above.`;f.className="fb no"}};
$("aU").onclick=()=>{const t=tv();$("V").value=Math.min(24,Math.max(2,Math.round(t.Vth)));$("R").value=Math.min(50,Math.max(1,Math.round(t.Rth)));draw();$("chart").scrollIntoView({block:"center"})};
table();draw();
