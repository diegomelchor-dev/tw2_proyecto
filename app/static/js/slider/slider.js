// Slider con autoplay, barra de progreso, miniaturas, teclado y gestos táctiles.
document.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('#slides-container .slide-fade');
    const thumbs = document.querySelectorAll('.thumb');
    const contador = document.getElementById('contador');
    const progressBar = document.getElementById('progress-bar');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnPlay = document.getElementById('btn-play');
    const playIcon = document.getElementById('play-icon');
    const sliderEl = document.getElementById('slider');

    const total = slides.length;
    const DURACION = 4000; // ms entre slides
    let indice = 0;
    let reproduciendo = true;
    let intervalId = null;
    let progresoInicio = null;
    let progresoAnimId = null;

    function mostrar(nuevoIndice) {
        slides[indice].classList.replace('opacity-100', 'opacity-0');
        thumbs[indice].classList.remove('active');
        thumbs[indice].classList.add('ring-transparent');
        thumbs[indice].classList.remove('ring-amber-400');

        indice = (nuevoIndice + total) % total;

        slides[indice].classList.replace('opacity-0', 'opacity-100');
        thumbs[indice].classList.add('active');
        thumbs[indice].classList.remove('ring-transparent');
        thumbs[indice].classList.add('ring-amber-400');

        contador.textContent = indice + 1;
        reiniciarProgreso();
    }

    function siguiente() { mostrar(indice + 1); }
    function anterior() { mostrar(indice - 1); }

    function animarProgreso(timestamp) {
        if (!progresoInicio) progresoInicio = timestamp;
        const transcurrido = timestamp - progresoInicio;
        const porcentaje = Math.min((transcurrido / DURACION) * 100, 100);
        progressBar.style.width = porcentaje + '%';

        if (reproduciendo && transcurrido < DURACION) {
            progresoAnimId = requestAnimationFrame(animarProgreso);
        }
    }

    function reiniciarProgreso() {
        progresoInicio = null;
        progressBar.style.width = '0%';
        cancelAnimationFrame(progresoAnimId);
        if (reproduciendo) {
            progresoAnimId = requestAnimationFrame(animarProgreso);
        }
    }

    function iniciarAutoplay() {
        clearInterval(intervalId);
        intervalId = setInterval(siguiente, DURACION);
        reiniciarProgreso();
    }

    function detenerAutoplay() {
        clearInterval(intervalId);
        cancelAnimationFrame(progresoAnimId);
    }

    function alternarPlay() {
        reproduciendo = !reproduciendo;
        if (reproduciendo) {
            playIcon.innerHTML = '&#10074;&#10074;'; // pausa
            iniciarAutoplay();
        } else {
            playIcon.innerHTML = '&#9654;'; // play
            detenerAutoplay();
        }
    }

    // Controles
    btnNext.addEventListener('click', () => { siguiente(); if (reproduciendo) iniciarAutoplay(); });
    btnPrev.addEventListener('click', () => { anterior(); if (reproduciendo) iniciarAutoplay(); });
    btnPlay.addEventListener('click', alternarPlay);

    thumbs.forEach(t => {
        t.addEventListener('click', () => {
            mostrar(parseInt(t.dataset.idx, 10));
            if (reproduciendo) iniciarAutoplay();
        });
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { siguiente(); if (reproduciendo) iniciarAutoplay(); }
        if (e.key === 'ArrowLeft') { anterior(); if (reproduciendo) iniciarAutoplay(); }
    });

    // Pausa al pasar el mouse, reanuda al salir
    sliderEl.addEventListener('mouseenter', detenerAutoplay);
    sliderEl.addEventListener('mouseleave', () => { if (reproduciendo) iniciarAutoplay(); });

    // Gestos táctiles (swipe) para móviles
    let touchStartX = 0;
    sliderEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diferencia = touchEndX - touchStartX;
        if (Math.abs(diferencia) > 40) {
            diferencia < 0 ? siguiente() : anterior();
            if (reproduciendo) iniciarAutoplay();
        }
    }, { passive: true });

    // Inicio
    iniciarAutoplay();
});
