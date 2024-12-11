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
    details: 'Pós-graduação em Intervenção ABA para Autismo e Deficiência Intelectual pelo Centro Universitário Celso Lisboa (2021). Atualmente é mestrando em Psicopatologias do Desenvolvimento da Criança e do Adolescente na Universidade de Lisboa, curso iniciado em 2023. Desde 2024, atua como diretor clínico no Centro de Desenvolvimento Infantil Evoluir. Foi professor das disciplinas de Estratégias e Técnicas para Inclusão Escolar e Elaboração de Programa de Ensino Individualizado no curso de pós-graduação em Análise do Comportamento Aplicada (ABA) ao Autismo, promovido pelo Centro de Educação Superior Continuada. Desde 2015, tem experiência profissional na implementação de estratégias comportamentais voltadas para pessoas com diagnóstico de Transtorno do Espectro do Autismo, incluindo atuação internacional em intervenção ABA em Portugal.'
  },
  {
    id: 2,
    name: 'Juliana',
    photo: './assets/team/1.png',
    details: '⁠Pós graduada em Análise do comportamento Aplicada ao Autismo e deficiência intelectual pelo CBI of Miami. Especialista em psicologia infantil: Psicopedagoga, Pós-graduada em Análise do Comportamento Aplicada ao Autismo e Deficiência Intelectual pelo CBI of Miami, Especialistade em intervenção precoce (primeira infância), Supervisora clínica, Formação em orientação parental pelo PDA/EUA , Formação nas Avaliações: VB-MAPP, ABLLs e Socially Savvy, Participação em congressos e eventos de atualização voltados para autismo.'
  }
];

teamCards.forEach(button => {
  button.addEventListener('click', () => {
    const id = parseInt(button.dataset.id);
    const psychologist = psychologists.find(p => p.id === id);
    if (psychologist) {
      modalName.textContent = psychologist.name;
      modalDetails.textContent = psychologist.details;
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
