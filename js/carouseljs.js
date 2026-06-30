// js/carouseljs.js
document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.getElementById('carrossel-cyber');
    const imagens = document.querySelectorAll('#carrossel-cyber .slide-img');
    const btnAnterior = document.getElementById('carrossel-anterior');
    const btnProximo = document.getElementById('carrossel-proximo');
    const areaSlides = document.querySelector('#carrossel-cyber .carrossel-slides');
    
    const lightbox = document.getElementById('carrossel-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnFechar = document.getElementById('carrossel-fechar');
    
    const btnZoomAnterior = document.getElementById('zoom-anterior');
    const btnZoomProximo = document.getElementById('zoom-proximo');

    if (!carrossel || imagens.length === 0 || !btnAnterior || !btnProximo || !lightbox || !lightboxImg || !btnFechar || !btnZoomAnterior || !btnZoomProximo) return;

    let slideAtual = 0;
    let temporizadorAuto = null;
    let toqueInicialX = 0;
    let toqueFinalX = 0;

    const mostrarSlide = (indice) => {
        imagens.forEach(img => img.classList.remove('ativa'));
        slideAtual = (indice + imagens.length) % imagens.length;
        imagens[slideAtual].classList.add('ativa');
        
        if (lightbox.hasAttribute('open')) {
            lightboxImg.setAttribute('src', imagens[slideAtual].getAttribute('src'));
        }
    };

    const proximoSlide = () => mostrarSlide(slideAtual + 1);
    const anteriorSlide = () => mostrarSlide(slideAtual - 1);

    const pararAutoTroca = () => {
        if (temporizadorAuto) {
            clearInterval(temporizadorAuto);
            temporizadorAuto = null;
        }
    };

    temporizadorAuto = setInterval(proximoSlide, 5000);

    btnProximo.addEventListener('click', (e) => { e.stopPropagation(); pararAutoTroca(); proximoSlide(); });
    btnAnterior.addEventListener('click', (e) => { e.stopPropagation(); pararAutoTroca(); anteriorSlide(); });

    btnZoomProximo.addEventListener('click', (e) => { e.stopPropagation(); pararAutoTroca(); proximoSlide(); });
    btnZoomAnterior.addEventListener('click', (e) => { e.stopPropagation(); pararAutoTroca(); anteriorSlide(); });

    areaSlides.addEventListener('click', () => {
        pararAutoTroca();
        lightboxImg.setAttribute('src', imagens[slideAtual].getAttribute('src'));
        lightbox.showModal();
    });

    const fecharZoom = () => lightbox.close();
    btnFechar.addEventListener('click', fecharZoom);
    lightboxImg.addEventListener('click', fecharZoom);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            fecharZoom();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.hasAttribute('open')) fecharZoom();
        if (e.key === 'ArrowRight') { pararAutoTroca(); proximoSlide(); }
        if (e.key === 'ArrowLeft') { pararAutoTroca(); anteriorSlide(); }
    });

    const tratarGestoSwipe = () => {
        const limiteParaMudar = 50;
        const diferencaX = toqueInicialX - toqueFinalX;

        if (Math.abs(diferencaX) > limiteParaMudar) {
            pararAutoTroca();
            if (diferencaX > 0) { proximoSlide(); } else { anteriorSlide(); }
        }
    };

    const registrarInicioToque = (e) => { toqueInicialX = e.changedTouches.clientX; };
    const registrarFimToque = (e) => { toqueFinalX = e.changedTouches.clientX; tratarGestoSwipe(); };

    carrossel.addEventListener('touchstart', registrarInicioToque, { passive: true });
    carrossel.addEventListener('touchend', registrarFimToque, { passive: true });
    lightbox.addEventListener('touchstart', registrarInicioToque, { passive: true });
    lightbox.addEventListener('touchend', registrarFimToque, { passive: true });
});
