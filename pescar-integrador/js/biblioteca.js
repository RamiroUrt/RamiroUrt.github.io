async function cargar() {
    try {
        let response1 = await fetch('nav.html');
        let response2 = await fetch('footer.html');
        if (response1.ok && response2.ok) {
            let data1 = await response1.text();
            let data2 = await response2.text();
            document.querySelector('.nav').innerHTML = data1;
            document.querySelector('.footer').innerHTML = data2;
        } else {
            console.error('Error al cargar el archivo', response.statusText);
        }
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
    }
}
cargar();

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("json/productos.json");
        const data = await response.json();

        // Obtiene el contenedor de productos
        const productContainer = document.getElementById("product-container");

        // Itera sobre los datos del JSON y crea las tarjetas
        data.forEach(function (producto) {
            const cardHtml = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 d-flex flex-column">
                    <img src="${Array.isArray(producto.imagenes) ? producto.imagenes[0] : producto.imagenes}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text mb-4">${producto.descripcion}</p>
                        <a href="#" class="btn btn-primary mt-auto descargar-btn" data-product="${producto.id}">Descargar</a>
                    </div>
                </div>
            </div>
        `;
            // Agrega la tarjeta al contenedor de productos
            productContainer.innerHTML += cardHtml;




            // Obtén los elementos de los botones de descargar
            const descargarButtons = document.querySelectorAll('.descargar-btn');

            // Maneja el clic en los botones de descargar
            descargarButtons.forEach(function (button) {
                button.addEventListener('click', function (event) {
                    // Obtén el identificador del producto desde el atributo data-product
                    const productId = event.target.getAttribute('data-product');

                    // Redirige al usuario a la página de detalles del producto con el identificador del producto
                    window.location.href = `detallesProducto.html?id=${productId}`;
                });
            });
        });
    } catch (error) {
        console.error("Error al cargar los datos del JSON: ", error);
    }
});

function toggleDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown.style.display === 'flex') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'flex';
    }
}