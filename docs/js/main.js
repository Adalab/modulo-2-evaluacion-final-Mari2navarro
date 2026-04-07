const h=document.querySelector(".js__form"),v=document.querySelector(".js__input"),d=document.querySelector(".js__results"),a=document.querySelector(".js__favorites"),_=document.querySelector(".js__reset");let c=[],s=[];function i(){d.innerHTML="";for(let e=0;e<c.length;e++){const t=c[e],n=t.show.name;let o="";t.show.image?o=t.show.image.medium:o="https://placehold.co/210x295/f5f5f5/666666/?text=TV";const f=s.find(m=>m.show.id===t.show.id);let r="";f&&(r="selected"),d.innerHTML+=`
    <li class="js__series ${r}" data-index="${e}">
    <img src="${o}" />
    <h3>${n}</h3>
    </li>`}}function l(){if(a.innerHTML="",s.length===0){a.innerHTML=`
    <li class="favorites__empty">
    no hay favoritos...todavía ✨
    </li>
    `;return}for(let e=0;e<s.length;e++){const t=s[e];a.innerHTML+=`
    <li class="favorite__item">
    ${t.show.name}
    <button class="js__remove" data-index="${e}"> ❌ </button>
    </li>
    `}}function g(e){e.preventDefault();const t=v.value;fetch(`https://api.tvmaze.com/search/shows?q=${t}`).then(n=>n.json()).then(n=>{c=n,i()})}function S(e){const t=e.target.closest(".js__series");if(!t)return;const n=parseInt(t.dataset.index),o=c[n];s.find(r=>r.show.id===o.show.id)||s.push(o),localStorage.setItem("favorites",JSON.stringify(s)),l(),i()}function p(e){const t=e.target.closest(".js__remove");if(!t)return;const n=parseInt(t.dataset.index);s.splice(n,1),localStorage.setItem("favorites",JSON.stringify(s)),l(),i()}function L(){s=[],localStorage.removeItem("favorites"),l(),i()}h.addEventListener("submit",g);d.addEventListener("click",S);a.addEventListener("click",p);_.addEventListener("click",L);const u=JSON.parse(localStorage.getItem("favorites"));u&&(s=u,l(),i());console.log("JS conectado");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7In0=
