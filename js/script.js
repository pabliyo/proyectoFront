function validarForm() {
    const name = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const birthday = document.getElementById('birthday').value;
    const question = document.getElementById('question').value;
  
    if (name === '' || email === '' || birthday === '' || question === '') {
      console.error('Por favor, complete todos los campos del formulario.');
      return false; 
    } else {
      console.log('Formulario enviado correctamente.');
      return true;
    }
}


const boton = document.getElementById("botonAg")

function resaltarBoton() {
    boton.style.backgroundColor = "green";
}
  
function quitarResaltado() {
    boton.style.backgroundColor = "blue";
}

function mostrarMensaje() {
  alert("¡Has hecho clic en el botón!");
}

function listarProductos() {
    fetch('/proyecto/json/datos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
            console.log(producto.nombre, producto.precio);
        });
  });
}

listarProductos();
    
function load() { // Función que establece el EventListener()
    
    boton.addEventListener("click", mostrarMensaje);
    boton.addEventListener("mouseover", resaltarBoton);
    boton.addEventListener("mouseout", quitarResaltado);
    
}

document.addEventListener("DOMContentLoaded", load, false)


function agregarProducto(event) {
  var producto = {
    id: event.target.getAttribute('id'),
    nombre: event.target.getAttribute('nombre'),
    precio: event.target.getAttribute('precio')
  };

  var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function agregarAlCarrito(producto) {
    // Obtener el carrito desde el LocalStorage o inicializarlo si no existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Agregar el producto al carrito
    carrito.push(producto);
  
    // Guardar el carrito actualizado en el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    // Actualizar la lista de productos en el HTML
    actualizarListaCarrito();
}
  
function actualizarListaCarrito() {
    // Obtener el elemento donde se mostrará la lista de productos
    const listaCarrito = document.getElementById('lista-carrito');
  
    // Limpiar la lista antes de agregar los nuevos productos
    listaCarrito.innerHTML = '';
  
    // Obtener el carrito actualizado del LocalStorage
    const carrito = JSON.parse(localStorage.getItem('carrito'));
  
    // Iterar sobre los productos del carrito y crear elementos HTML
    carrito.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = producto.nombre; // Asumiendo que el producto tiene una propiedad "nombre"
      listaCarrito.appendChild(li);
    });
  }