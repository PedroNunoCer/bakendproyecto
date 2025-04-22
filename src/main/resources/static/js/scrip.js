// Script para animaciones en la plantilla de recetas
// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la biblioteca de animaciones AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
  
    // Animación para las tarjetas de recetas cuando aparecen en el viewport
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.recipe-image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.recipe-image img').style.transform = 'scale(1)';
        });
    });
  
    // Animación para las categorías
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
  
    // Función para mostrar mensaje al hacer clic en "Me gusta"
    const heartIcons = document.querySelectorAll('.fa-heart');
    heartIcons.forEach(icon => {
        icon.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el número actual de likes
            let likesText = this.textContent.trim();
            let likes = parseInt(likesText);
            
            // Incrementar likes y actualizar texto
            likes += 1;
            this.innerHTML = '<i class="far fa-heart"></i> ' + likes;
            
            // Mostrar notificación temporal
            showNotification('¡Gracias por tu like!');
        });
    });
  
    // Función para mostrar notificación
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
  
    // Efecto de desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
  
    // Cambiar la apariencia del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.classList.remove('scrolled');
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
  });