// Preloader 
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  preloader.style.display = "none"; // Esconde o preloader
  content.style.display = "block"; // Exibe o conteúdo principal
});
/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}
// Lógica aprimorada para alternar informações dos Cards na seção de serviços
document.querySelectorAll(".more-info-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const moreInfo = card.querySelector(".more-info");
    const paragraphs = card.querySelectorAll("p:not(.more-info)");

    // Obter as cores personalizadas definidas no card
    const bgColor = card.getAttribute("data-bg-color");
    const textColor = card.getAttribute("data-text-color");

    // Alternar a classe ativa e aplicar estilos personalizados
    card.classList.toggle("active");

    if (card.classList.contains("active")) {
      // Aplicar cores personalizadas
      card.style.backgroundColor = `var(${bgColor})`;
      card.style.color = `var(${textColor})`;

      // Ocultar todos os <p> não pertencentes a .more-info
      paragraphs.forEach((p) => {
        p.style.display = "none";
      });

      // Mostrar o conteúdo do elemento .more-info
      moreInfo.style.display = "block";

      // Atualizar o texto do botão
      button.textContent = "Ver Menos";
    } else {
      // Restaurar o estilo padrão
      card.style.backgroundColor = ""; // Voltar ao fundo padrão
      card.style.color = ""; // Voltar ao texto padrão

      // Mostrar novamente os <p> originais
      paragraphs.forEach((p) => {
        p.style.display = "block";
      });

      // Ocultar o elemento .more-info
      moreInfo.style.display = "none";

      // Atualizar o texto do botão
      button.textContent = "Ver Mais";
    }
  });
});


/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
