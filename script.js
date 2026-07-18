/* =========================================================
   1. Inicialização dos ícones e ano do rodapé
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  document.getElementById("ano-atual").textContent = new Date().getFullYear();
});

/* =========================================================
   2. Menu mobile
   ========================================================= */
const botaoMenu = document.getElementById("botao-menu");
const menuPrincipal = document.getElementById("menu-principal");
const linksMenu = document.querySelectorAll(".nav-link");

function alternarMenu() {
  const menuAberto = menuPrincipal.classList.toggle("open");
  botaoMenu.setAttribute("aria-expanded", String(menuAberto));
  document.body.classList.toggle("menu-open", menuAberto);
  botaoMenu.innerHTML = menuAberto
    ? '<i data-lucide="x"></i>'
    : '<i data-lucide="menu"></i>';
  lucide.createIcons();
}

botaoMenu.addEventListener("click", alternarMenu);
linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuPrincipal.classList.contains("open")) alternarMenu();
  });
});

/* =========================================================
   3. Cabeçalho com efeito ao rolar a página
   ========================================================= */
const cabecalho = document.getElementById("cabecalho");
window.addEventListener("scroll", () => {
  cabecalho.classList.toggle("scrolled", window.scrollY > 30);
});

/* =========================================================
   4. Busca no cabeçalho
   ========================================================= */
const botaoBusca = document.getElementById("botao-busca");
const caixaBusca = document.getElementById("caixa-busca");
const fecharBusca = document.getElementById("fechar-busca");
const campoBusca = document.getElementById("campo-busca");

function abrirBusca() {
  caixaBusca.hidden = false;
  campoBusca.focus();
}

function esconderBusca() {
  caixaBusca.hidden = true;
  campoBusca.value = "";
}

botaoBusca.addEventListener("click", abrirBusca);
fecharBusca.addEventListener("click", esconderBusca);

campoBusca.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const termo = campoBusca.value.trim();
    mostrarToast(
      termo ? `Busca iniciada por: ${termo}` : "Digite algo para pesquisar.",
    );
  }
});

/* =========================================================
   5. Carrossel horizontal de produtos
   ========================================================= */
const listaProdutos = document.getElementById("lista-produtos");
document.getElementById("produto-anterior").addEventListener("click", () => {
  listaProdutos.scrollBy({ left: -460, behavior: "smooth" });
});
document.getElementById("produto-proximo").addEventListener("click", () => {
  listaProdutos.scrollBy({ left: 460, behavior: "smooth" });
});

/* =========================================================
   6. Carrinho demonstrativo
   ========================================================= */
let quantidadeCarrinho = 0;
const contadorCarrinho = document.querySelector(".cart-count");
const botoesCarrinho = document.querySelectorAll(".add-cart");

botoesCarrinho.forEach((botao) => {
  botao.addEventListener("click", () => {
    quantidadeCarrinho += 1;
    contadorCarrinho.textContent = quantidadeCarrinho;
    mostrarToast(`${botao.dataset.product} foi adicionado ao carrinho.`);
  });
});

/* =========================================================
   7. Mensagem flutuante (toast)
   ========================================================= */
const toast = document.getElementById("toast");
let temporizadorToast;

function mostrarToast(mensagem) {
  clearTimeout(temporizadorToast);
  toast.textContent = mensagem;
  toast.classList.add("show");
  temporizadorToast = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* =========================================================
   8. Animação dos elementos quando aparecem na tela
   ========================================================= */
const elementosRevelados = document.querySelectorAll(".reveal");
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12 },
);

elementosRevelados.forEach((elemento) => observador.observe(elemento));

/* =========================================================
   9. Destaque automático do item ativo no menu
   ========================================================= */
const secoes = document.querySelectorAll("main section[id], footer[id]");
const observadorSecoes = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      linksMenu.forEach((link) => link.classList.remove("active"));
      const linkAtual = document.querySelector(
        `.nav-link[href="#${entrada.target.id}"]`,
      );
      if (linkAtual) linkAtual.classList.add("active");
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 },
);

secoes.forEach((secao) => observadorSecoes.observe(secao));
