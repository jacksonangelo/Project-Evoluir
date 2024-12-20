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

// Lógica de abertura e fechamento do modal de equipe
const teamCards = document.querySelectorAll('.team-card .more-info-btn');
const modal = document.getElementById('team-modal');
const modalCloseButton = document.querySelector('.close-button');
const closeModalButton = document.querySelector('.close-modal');
const modalName = document.getElementById('modal-name');
const modalDetails = document.getElementById('modal-details');
const modalPhoto = document.querySelector('.modal-photo');

const psychologists = [
  {
    id: 1,
    name: 'Jarbas Garcia',
    photo: './assets/team/2.png',
    details: `
      <p><strong>Pós-graduação:</strong> Intervenção ABA para Autismo e Deficiência Intelectual pelo Centro Universitário Celso Lisboa (2021).</p>
      <p><strong>Atualmente:</strong> Mestrando em Psicopatologias do Desenvolvimento da Criança e do Adolescente na Universidade de Lisboa (2023).</p>
      <p><strong>Atuação:</strong> Diretor Clínico no Centro de Desenvolvimento Infantil Evoluir desde 2024.</p>
      <p><strong>Experiência:</strong> Implementação de estratégias comportamentais para pessoas com TEA desde 2015, incluindo atuação internacional em intervenção ABA em Portugal.</p>
      <p><strong>Docência:</strong> Foi professor em Estratégias e Técnicas para Inclusão Escolar e Elaboração de Programa de Ensino Individualizado no curso de pós-graduação em Análise do Comportamento Aplicada ao Autismo.</p>
    `
  },
  {
    id: 2,
    name: 'Juliana Fidelis',
    photo: './assets/team/1.png',
    details: `
      <p><strong>Formação:</strong> Psicóloga educacional e clínica pela UEMG (2014), com foco no desenvolvimento infantil.</p>
      <p><strong>Experiência:</strong> Desde 2008, atua no atendimento a crianças atípicas, incluindo crianças com Perturbação do Espectro do Autismo (PEA) e outras perturbações do desenvolvimento.</p>
      <p><strong>Pós-graduações:</strong> 
        <ul>
          <li>Análise do Comportamento Aplicada ao Autismo e Deficiência Intelectual pelo CBI of Miami.</li>
          <li>Especialização em Psicologia Infantil (2016).</li>
          <li>Especialista em Intervenção Precoce (Primeira Infância), aplicando protocolos para crianças com ou sem diagnóstico médico.</li>
        </ul>
      </p>
      <p><strong>Supervisão Clínica:</strong> Especialista em supervisão clínica, com formação em avaliação e elaboração de planos de intervenção individualizados utilizando protocolos como VB-MAPP, ABLLs e Socially Savvy.</p>
      <p><strong>Orientação Parental:</strong> Formada pelo PDA (EUA) desde 2020, capacitando famílias atípicas para promover o desenvolvimento de crianças com Autismo, Síndrome de Down e outras condições.</p>
      <p><strong>Participação em Congressos:</strong> Participação constante em eventos de atualização sobre o autismo e outras perturbações, com o objetivo de se manter atualizada e garantir a qualidade no atendimento.</p>
    `
  }
];

teamCards.forEach(button => {
  button.addEventListener('click', () => {
    const id = parseInt(button.dataset.id);
    const psychologist = psychologists.find(p => p.id === id);
    if (psychologist) {
      modalName.textContent = psychologist.name;
      modalDetails.innerHTML = psychologist.details;
      modalPhoto.src = psychologist.photo;
      modal.style.display = 'block';
    }
  });
});

modalCloseButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Galeria de Imagens com Lightbox e Botões de Controle
const galleryItems = document.querySelectorAll('.gallery-item img');
const galleryModal = document.createElement('div');
galleryModal.classList.add('gallery-modal');
document.body.appendChild(galleryModal);

let currentImageIndex = 0;

const createModalContent = (src, alt) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
};

const updateModalImage = (index) => {
  if (index < 0) index = galleryItems.length - 1;
  if (index >= galleryItems.length) index = 0;
  currentImageIndex = index;
  const img = createModalContent(galleryItems[index].src, galleryItems[index].alt);
  galleryModal.innerHTML = '';
  galleryModal.appendChild(img);
  createModalControls();
};

const createModalControls = () => {
  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('controls');

  const prevButton = document.createElement('div');
  prevButton.classList.add('control', 'control-prev');
  prevButton.innerHTML = '&#9664;'; // Símbolo de seta para esquerda
  prevButton.addEventListener('click', () => updateModalImage(currentImageIndex - 1));

  const nextButton = document.createElement('div');
  nextButton.classList.add('control', 'control-next');
  nextButton.innerHTML = '&#9654;'; // Símbolo de seta para direita
  nextButton.addEventListener('click', () => updateModalImage(currentImageIndex + 1));

  controlsContainer.appendChild(prevButton);
  controlsContainer.appendChild(nextButton);
  galleryModal.appendChild(controlsContainer);
};

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index;
    updateModalImage(currentImageIndex);
    galleryModal.classList.add('active');
  });
});

galleryModal.addEventListener('click', (e) => {
  if (!e.target.closest('.control')) {
    galleryModal.classList.remove('active');
  }
});

/* Modal Services */
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".more-info-btn");
  const modal = document.createElement("div");
  modal.classList.add("service-modal");
  modal.innerHTML = `
    <div class="service-modal-content">
      <span class="service-close-btn">&times;</span>
      <img src="" alt="Imagem do Serviço" class="service-modal-image">
      <h3 class="service-modal-title"></h3>
      <div class="service-modal-text"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalContent = modal.querySelector(".service-modal-content");
  const modalImage = modal.querySelector(".service-modal-image");
  const modalTitle = modal.querySelector(".service-modal-title");
  const modalText = modal.querySelector(".service-modal-text");
  const closeModal = modal.querySelector(".service-close-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (window.innerWidth > 768 && e.target.textContent.trim() === "Ver Menos") {
        const card = e.target.closest(".card");
        const info = card.querySelector(".more-info").innerHTML;

        // Obter a cor de fundo e texto
        const bgColor = getComputedStyle(card).getPropertyValue(card.getAttribute("data-bg-color"));
        const imageSrc = card.querySelector('img').getAttribute('src');
        const titleText = card.querySelector('.title').textContent;

        // Aplicar informações no modal
        modalText.innerHTML = info;
        modalImage.src = imageSrc;
        modalTitle.textContent = titleText;

        // Aplicar cor de fundo no service-modal-content
        modalContent.style.backgroundColor = bgColor;
        modal.style.display = "flex";
        modalContent.style.color = "#000"; // Texto preto para garantir legibilidade

        // Fecha o card e muda o botão para "Ver Mais"
        card.classList.remove("active");
        card.style.backgroundColor = ""; // Voltar ao fundo padrão
        card.style.color = ""; // Voltar ao texto padrão
        card.querySelector(".more-info").style.display = "none";
        button.textContent = "Ver Mais";

        // Adicionar a classe que escurece o fundo do site
        document.body.classList.add('modal-active');
      }
    });
  });

  // Fechar modal ao clicar no botão de fechar
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-active'); // Remove a classe de opacidade no fundo
  });

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove('modal-active'); // Remove a classe de opacidade no fundo
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
// Auto-slide do carrossel
let currentSlide = 1;
const totalSlides = document.querySelectorAll('.carousel-open').length; // Total de slides no carrossel
const changeSlideInterval = 5000; // Tempo entre cada slide (5000ms = 5 segundos)

function changeSlide() {
  currentSlide++;
  if (currentSlide > totalSlides) {
    currentSlide = 1; // Reinicia no primeiro slide
  }
  document.getElementById(`carousel-${currentSlide}`).checked = true; // Marca o próximo slide
}

// Inicia a troca automática de slides
setInterval(changeSlide, changeSlideInterval);

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
