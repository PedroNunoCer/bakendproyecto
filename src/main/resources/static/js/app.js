let nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning')

// Ajustar tiempos dependiendo del tamaño de pantalla
let timeRunning = 3000
let timeAutoNext = 7000

// Función para ajustar tiempos en dispositivos móviles
function adjustTimesForMobile() {
    if (window.innerWidth <= 768) {
        timeRunning = 2000
        timeAutoNext = 5000
    } else {
        timeRunning = 3000
        timeAutoNext = 7000
    }
}

// Llamar al inicio y cuando cambie el tamaño de la ventana
adjustTimesForMobile()
window.addEventListener('resize', adjustTimesForMobile)

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)

function resetTimeAnimation() {
    // Ajustar tiempo de animación según tamaño de pantalla
    const animationDuration = window.innerWidth <= 768 ? '5s' : '7s'
    
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = `runningTime ${animationDuration} linear 1 forwards`
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)

    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation()
}

// Añadir eventos touch para dispositivos móviles
let touchStartX = 0
let touchEndX = 0

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
}, false)

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
}, false)

function handleSwipe() {
    // Umbral de deslizamiento (ajusta según necesidad)
    const swipeThreshold = 50
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe izquierda -> next slide
        nextBtn.click()
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe derecha -> prev slide
        prevBtn.click()
    }
}

// Función para ajustar altura del carrusel en dispositivos móviles
function adjustCarouselHeight() {
    const carousel = document.querySelector('.carousel')
    
    // En dispositivos móviles, ajustar altura para mejor visualización
    if (window.innerWidth <= 576) {
        carousel.style.height = '85vh'
    } else {
        carousel.style.height = '100vh'
    }
}

// Ajustar al cargar y al cambiar tamaño
window.addEventListener('load', adjustCarouselHeight)
window.addEventListener('resize', adjustCarouselHeight)

// Start the initial animation 
resetTimeAnimation()