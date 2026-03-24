// ============================================
// DADOS DOS PERFUMES
// ============================================
const perfumes = [
    { nome: 'Essência Noturna', desc: 'Notas de baunilha, sândalo e âmbar. Uma fragrância envolvente e misteriosa.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774363254/transferir_dxyk0f.jpg' },
    { nome: 'Flor Dourada', desc: 'Jasmim, pétalas de rosa e almíscar. Elegante e sofisticado.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774363254/transferir_4_wnlln5.jpg' },
    { nome: 'Mistério Elegante', desc: 'Patchouli, cedro e bergamota. Para quem busca personalidade.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774363254/images_bminxa.jpg' },
    { nome: 'Alma de Paris', desc: 'Lavanda, violeta e madeira de caxemira. Um toque romântico e moderno.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774363254/transferir_3_xihiw6.jpg' },
    { nome: 'Luz da Manhã', desc: 'Flores brancas, frutas cítricas e almíscar. Frescor e delicadeza.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365009/transferir_1_bflary.jpg' },
    { nome: 'Sonho Encantado', desc: 'Âmbar, baunilha e caramelo. Doce e inesquecível.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774363253/images_1_fb7xnb.jpg' }
];

// ============================================
// DADOS DOS TESTEMUNHOS (6 clientes)
// ============================================
const depoimentos = [
    { nome: 'Ana Souza', texto: 'O perfume Essência Noturna é simplesmente divino! Dura o dia todo e todos elogiam.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365619/images_2_yhy3va.jpg', estrelas: 5 },
    { nome: 'Mariana Costa', texto: 'Flor Dourada se tornou minha fragrância favorita. Elegante e marcante.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365619/transferir_9_wgxrbj.jpg', estrelas: 5 },
    { nome: 'Fernanda Lima', texto: 'Mistério Elegante é perfeito para ocasiões especiais. Recebo muitos elogios.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365619/transferir_7_ipu4pw.jpg', estrelas: 5 },
    { nome: 'Patrícia Silva', texto: 'Alma de Paris tem um toque romântico que me conquistou. Amo!', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365619/images_3_gmtvlw.jpg', estrelas: 4 },
    { nome: 'Carla Mendes', texto: 'Luz da Manhã é meu perfume do dia a dia. Fresco e delicado.', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365619/transferir_6_t6ynzj.jpg', estrelas: 5 },
    { nome: 'Roberta Alves', texto: 'Sonho Encantado é doce na medida certa. Perfeito!', img: 'https://res.cloudinary.com/dhsg68f5x/image/upload/v1774365670/images_4_z1nilv.jpg', estrelas: 5 }
];

// ============================================
// CARROSSEL DE PERFUMES
// ============================================
const track = document.getElementById('carrosselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicadoresContainer = document.getElementById('carrosselIndicadores');

let currentIndex = 0;
let autoSlideInterval;

// Criar os slides
perfumes.forEach((perfume, index) => {
    const slide = document.createElement('div');
    slide.className = 'carrossel-item';
    slide.innerHTML = `<img src="${perfume.img}" alt="${perfume.nome}">`;
    slide.addEventListener('click', () => abrirModal(perfume));
    track.appendChild(slide);
    
    const indicador = document.createElement('div');
    indicador.className = 'indicador';
    indicador.addEventListener('click', () => goToSlide(index));
    indicadoresContainer.appendChild(indicador);
});

const slides = document.querySelectorAll('.carrossel-item');
const indicadores = document.querySelectorAll('.indicador');

function updateCarrossel() {
    const slideWidth = slides[0]?.offsetWidth + 30 || 330;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    indicadores.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarrossel();
    resetAutoSlide();
}

function nextSlide() {
    if (currentIndex < perfumes.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;  // volta ao início suavemente
    }
    updateCarrossel();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = perfumes.length - 1;  // vai para o último
    }
    updateCarrossel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
window.addEventListener('resize', updateCarrossel);
updateCarrossel();
startAutoSlide();

// ============================================
// CARROSSEL DE TESTEMUNHOS
// ============================================
const depoTrack = document.getElementById('depoimentosTrack');
const prevDepoBtn = document.getElementById('prevDepoBtn');
const nextDepoBtn = document.getElementById('nextDepoBtn');
const depoIndicadoresContainer = document.getElementById('depoimentosIndicadores');

let currentDepoIndex = 0;
let autoDepoInterval;

function criarEstrelas(qtd) {
    let estrelas = '';
    for (let i = 0; i < 5; i++) {
        estrelas += i < qtd ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return `<div class="estrelas">${estrelas}</div>`;
}

depoimentos.forEach((depo, index) => {
    const card = document.createElement('div');
    card.className = 'depoimento-card';
    card.innerHTML = `
        <img src="${depo.img}" alt="${depo.nome}">
        <h4>${depo.nome}</h4>
        ${criarEstrelas(depo.estrelas)}
        <p>"${depo.texto}"</p>
    `;
    depoTrack.appendChild(card);
    
    const indicador = document.createElement('div');
    indicador.className = 'indicador';
    indicador.addEventListener('click', () => goToDepoSlide(index));
    depoIndicadoresContainer.appendChild(indicador);
});

const depoSlides = document.querySelectorAll('.depoimento-card');
const depoIndicadores = document.querySelectorAll('.depoimentos-indicadores .indicador');

function updateDepoCarrossel() {
    const slideWidth = depoSlides[0]?.offsetWidth + 30 || 330;
    depoTrack.style.transform = `translateX(-${currentDepoIndex * slideWidth}px)`;
    depoIndicadores.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentDepoIndex);
    });
}

function goToDepoSlide(index) {
    currentDepoIndex = index;
    updateDepoCarrossel();
    resetAutoDepo();
}

function nextDepoSlide() {
    currentDepoIndex = (currentDepoIndex + 1) % depoSlides.length;
    updateDepoCarrossel();
    resetAutoDepo();
}

function prevDepoSlide() {
    currentDepoIndex = (currentDepoIndex - 1 + depoSlides.length) % depoSlides.length;
    updateDepoCarrossel();
    resetAutoDepo();
}

function startAutoDepo() {
    autoDepoInterval = setInterval(nextDepoSlide, 5000);
}

function resetAutoDepo() {
    clearInterval(autoDepoInterval);
    startAutoDepo();
}

if (prevDepoBtn && nextDepoBtn) {
    prevDepoBtn.addEventListener('click', prevDepoSlide);
    nextDepoBtn.addEventListener('click', nextDepoSlide);
}
window.addEventListener('resize', updateDepoCarrossel);
updateDepoCarrossel();
startAutoDepo();

// ============================================
// CONTADOR REGRESSIVO
// ============================================
function updateCountdown() {
    const targetDate = new Date('March 25, 2026 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        document.getElementById('dias').textContent = '00';
        document.getElementById('horas').textContent = '00';
        document.getElementById('minutos').textContent = '00';
        document.getElementById('segundos').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('dias').textContent = days.toString().padStart(2, '0');
    document.getElementById('horas').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
// ============================================
// MODAL DE PERFUMES
// ============================================
const modal = document.getElementById('modal-perfume');
const modalImg = document.getElementById('modal-img');
const modalNome = document.getElementById('modal-nome');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.querySelector('.modal-close');

function abrirModal(perfume) {
    modalImg.src = perfume.img;
    modalNome.textContent = perfume.nome;
    modalDesc.textContent = perfume.desc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', fecharModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
});

// ============================================
// MODO CLARO/ESCURO
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function toggleTheme() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
    }
}

themeToggle.addEventListener('click', toggleTheme);

// ============================================
// NAVBAR DINÂMICA
// ============================================
const navbar = document.querySelector('.navbar');

function checkScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll === 0) {
        navbar.classList.remove('centered');
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.width = '100%';
        navbar.style.borderRadius = '0';
    } 
    else if (currentScroll > 0) {
        navbar.classList.add('centered');
        navbar.style.position = 'fixed';
        navbar.style.top = '20px';
        navbar.style.left = '20px';
        navbar.style.width = 'calc(100% - 40px)';
        navbar.style.borderRadius = '50px';
    }
}

checkScroll();
window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);

// ============================================
// FORMULÁRIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contatoForm');
const formMensagem = document.getElementById('form-mensagem');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        formMensagem.innerHTML = '<p style="color: var(--accent);">A enviar mensagem...</p>';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                formMensagem.innerHTML = '<p style="color: green;">✓ Mensagem enviada com sucesso! Entraremos em contacto em breve.</p>';
                contactForm.reset();
            } else {
                formMensagem.innerHTML = '<p style="color: red;">✗ Erro ao enviar. Tente novamente.</p>';
            }
        } catch (error) {
            formMensagem.innerHTML = '<p style="color: red;">✗ Erro de rede. Verifique sua conexão.</p>';
        }
    });
}

// ============================================
// SIDEBAR (MENU LATERAL MOBILE) - ÚNICA
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const sidebarClose = document.querySelector('.sidebar-close');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});