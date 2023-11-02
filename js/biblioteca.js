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
// funcioon barra de busqueda
function buscarPorNombre() {
    let input = document.getElementById("searchInput").value;
    /* Limpiamos el input | No case sensitive, No importa tildes */
    input = quitarTildes(input.toLowerCase());
    
    /* Quitamos lo que no coincide con la busqueda */
    const productContainer = document.getElementById("product-container");
    let productos = Array.from(productContainer.children);
    productos.forEach(p => {
        const productName = p.querySelector(".card-title").textContent;
        
        if (quitarTildes(productName.toLowerCase()).includes(input))
            p.classList.remove("d-none"); 
        else 
            p.classList.add("d-none");
    });
}

function quitarTildes(str){
    return str.normalize('NFD')
     .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
     .normalize();
} /* Source: https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos */

document.getElementById("applyFiltersBtn").addEventListener("click", buscarPorNombre);