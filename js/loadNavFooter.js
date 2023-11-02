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
//funcion esconder nav
function toggleDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (window.innerWidth < 880) {
        if (dropdown.style.display === 'flex') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'flex';
        }
    }
}

cargar();