document.addEventListener('DOMContentLoaded', async function () {
    
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    await fetch('https://e-commerce-cac-backend.onrender.com/api/productos?categoria=destacado') 
        .then(response => response.json())
        .then(data => {    
            const swiper = document.querySelector (".swiper-wrapper")
            data.productos.forEach(producto => {
                const productoElement = document.createElement ('div');
                productoElement.className = 'swiper-slide'                

                productoElement.innerHTML = `<h4>${producto.nombre}</h4>
                        <img src="${producto.url}" alt="${producto.nombre}">
                        <p>Precio: ${producto.precio}</p>
                        <p class="descrip">Descripcion: ${producto.descripcion}</p>
                        <button class="agregarAlCarrito" data-name="${producto.nombre}"
                            data-price="${producto.precio}">Agregar 🛒</button>`;
                swiper.appendChild(productoElement)
            });

        })
        .catch(error => {
            console.error('Error:', error)
        })
});

