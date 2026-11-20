/* Busca e filtros da vitrine (página inicial) e visualizador de fotos (página do imóvel). */
(function () {
  "use strict";
  var grade = document.getElementById("grade");
  if (grade) {
    var cards = Array.prototype.slice.call(grade.querySelectorAll(".card"));
    var f = { bairro: "", tipo: "", ate: "", atalho: "", ordem: "" };
    var nomes = { mar: "Pé na areia e até 200 m do mar", flat: "Flats para investir", ate800: "Até R$ 800 mil", alto: "Alto padrão" };
    var convite = document.getElementById("convite"), visiveis = 0;
    // O convite ocupa o espaço que sobra na última linha; se a linha estiver cheia, some.
    function encaixa(n) {
      visiveis = n; if (!convite) return;
      var cols = getComputedStyle(grade).gridTemplateColumns.split(" ").length, resto = (cols - (n % cols)) % cols;
      convite.hidden = resto === 0 || n === 0;
      convite.style.gridColumn = resto ? "span " + resto : "";
    }
    window.addEventListener("resize", function () { encaixa(visiveis); });
    var ativo = document.getElementById("ativo"), contagem = document.getElementById("contagem"), vazio = document.getElementById("vazio");
    function aplicar() {
      var n = 0;
      cards.forEach(function (c) {
        var d = c.dataset, p = Number(d.preco || 0), ok = true;
        if (f.bairro && d.bairro !== f.bairro) ok = false;
        if (f.tipo && d.tipo !== f.tipo) ok = false;
        if (f.ate && (!p || p > Number(f.ate))) ok = false;
        if (f.atalho && (" " + d.tags + " ").indexOf(" " + f.atalho + " ") < 0) ok = false;
        c.hidden = !ok; if (ok) n++;
      });
      if (f.ordem) {
        cards.slice().sort(function (a, b) {
          var pa = Number(a.dataset.preco) || 9e12, pb = Number(b.dataset.preco) || 9e12;
          return f.ordem === "menor" ? pa - pb : (Number(b.dataset.preco) || 0) - (Number(a.dataset.preco) || 0);
        }).forEach(function (c) { grade.appendChild(c); });
      } else {
        cards.forEach(function (c) { grade.appendChild(c); });
      }
      if (convite) grade.appendChild(convite);
      encaixa(n);
      contagem.textContent = n === 1 ? "1 imóvel" : n + " imóveis";
      vazio.hidden = n > 0;
      var partes = [];
      if (f.atalho) partes.push(nomes[f.atalho]);
      if (f.bairro) partes.push(f.bairro);
      if (f.tipo) partes.push(f.tipo);
      if (f.ate) partes.push("até " + Number(f.ate).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }));
      ativo.hidden = !partes.length;
      ativo.querySelector("span").textContent = "Filtro: " + partes.join(" · ");
    }
    function ir() { document.getElementById("imoveis").scrollIntoView({ behavior: "smooth" }); }
    var busca = document.getElementById("busca");
    busca.addEventListener("submit", function (e) {
      e.preventDefault();
      f.bairro = busca.bairro.value; f.tipo = busca.tipo.value; f.ate = busca.ate.value; f.atalho = "";
      aplicar(); ir();
    });
    document.querySelectorAll("[data-atalho]").forEach(function (b) {
      b.addEventListener("click", function () {
        f = { bairro: "", tipo: "", ate: "", atalho: b.getAttribute("data-atalho"), ordem: f.ordem };
        busca.reset(); aplicar(); ir();
      });
    });
    document.getElementById("ordem").addEventListener("change", function (e) { f.ordem = e.target.value; aplicar(); });
    document.querySelectorAll("[data-limpar]").forEach(function (b) {
      b.addEventListener("click", function () { f = { bairro: "", tipo: "", ate: "", atalho: "", ordem: f.ordem }; busca.reset(); aplicar(); });
    });
    aplicar();
  }

  var visor = document.getElementById("visor");
  if (visor) {
    var trilho = visor.querySelector(".trilho"), conta = visor.querySelector("[data-conta]");
    var figs = trilho.querySelectorAll("figure"), total = figs.length, ultimo = null;
    function atual() { return Math.round(trilho.scrollLeft / trilho.clientWidth); }
    function mostra(i) {
      figs.forEach(function (fg, k) { if (Math.abs(k - i) <= 2) { var im = fg.querySelector("img"); if (!im.src) im.src = im.getAttribute("data-src"); } });
      conta.textContent = (i + 1) + " / " + total;
    }
    function abre(i) {
      ultimo = document.activeElement;
      visor.hidden = false; document.body.style.overflow = "hidden";
      mostra(i);
      trilho.scrollTo({ left: i * trilho.clientWidth, behavior: "instant" });
      visor.querySelector(".fechar").focus();
    }
    function fecha() { visor.hidden = true; document.body.style.overflow = ""; if (ultimo) ultimo.focus(); }
    document.querySelectorAll("[data-abre]").forEach(function (b) {
      b.addEventListener("click", function () { abre(Number(b.getAttribute("data-abre")) || 0); });
    });
    visor.querySelector(".fechar").addEventListener("click", fecha);
    visor.querySelector(".ant").addEventListener("click", function () { trilho.scrollBy({ left: -trilho.clientWidth, behavior: "smooth" }); });
    visor.querySelector(".prox").addEventListener("click", function () { trilho.scrollBy({ left: trilho.clientWidth, behavior: "smooth" }); });
    var t; trilho.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(function () { mostra(atual()); }, 60); });
    document.addEventListener("keydown", function (e) {
      if (visor.hidden) return;
      if (e.key === "Escape") fecha();
      if (e.key === "ArrowRight") visor.querySelector(".prox").click();
      if (e.key === "ArrowLeft") visor.querySelector(".ant").click();
    });
  }
})();
