
//funcion valida el formilario de contacto que no este vacio ningun campo
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

/*
//funcion listar los productos por consola 
function listarProductos() {
  fetch('/proyecto/json/productos.json')
      .then(response => response.json())
      .then(data => {
          data.forEach(producto => {
          console.log(producto.nombre, producto.precio);
      });
});
}

listarProductos();
*/

/*
//Crea las cards reemplazando los valores de las etiquetas a partir de un json
function crearYMostrarProductos() {
  fetch('/proyecto/json/productos.json')
    .then(response => response.json())
    .then(data => {
      const contenedorProductos = document.getElementById('contenedorItems');
      const plantillaProducto = `
        <div class="item">
          <div class="contenedorTituloItem">
            <h2 class="tituloItem">${nombre}</h2>
          </div>
          <img src="img/${imagen}" alt="${nombre}" class="imgItem">
          <span class="precioItem">${precio}</span>
          <div class="contenedorPrecioItem">
            <h2 class="precioItemRebajado">${precioRebajado}</h2>
            <h2 class="precioItemOff">${descuento}% OFF</h2>
          </div>
          <button class="agregarCarrito" id="botonAg">AGREGAR</button>
        </div>
      `;

      data.forEach(producto => {
        const nuevaTarjeta = plantillaProducto
          .replace('${nombre}', producto.nombre)
          .replace('${imagen}', producto.imagen)
          .replace('${precio}', producto.precio)
          .replace('${precioRebajado}', producto.precioRebajado)
          .replace('${descuento}', producto.descuento);

        const elementoTarjeta = document.createElement('div');
        elementoTarjeta.innerHTML = nuevaTarjeta;
        contenedorProductos.appendChild(elementoTarjeta);
      });
    });
}

crearYMostrarProductos();
*/
function crearYMostrarProductos() {
  fetch('/proyecto/json/productos.json')
    .then(response => response.json())
    .then(data => {
      const contenedorProductos = document.getElementById('contenedorItems');

      data.forEach(producto => {
        const plantillaProducto = `
          <div class="item">
            <div class="contenedorTituloItem">
              <h2 class="tituloItem">${producto.nombre}</h2>
            </div>
            <img src="img/${producto.imagen}" alt="${producto.nombre}" class="imgItem">
            <span class="precioItem">${producto.precio}</span>
            <div class="contenedorPrecioItem">
              <h2 class="precioItemRebajado">${producto.precioRebajado}</h2>
              <h2 class="precioItemOff">${producto.descuento}% OFF</h2>
            </div>
            <button class="agregarCarrito" id="botonAg">AGREGAR</button>
          </div>
      `;

        const { nombre, imagen, precio, precioRebajado, descuento } = producto;
        
        const nuevaTarjeta = plantillaProducto
          .replace('${nombre}', nombre)
          .replace('${imagen}', imagen)
          .replace('${precio}', producto.precio)
          .replace('${precioRebajado}', producto.precioRebajado)
          .replace('${descuento}', producto.descuento);

        const elementoTarjeta = document.createElement('div');
        elementoTarjeta.innerHTML = nuevaTarjeta;
        contenedorProductos.appendChild(elementoTarjeta);
      });
    });
}

crearYMostrarProductos();

//funcionalidad del boton AGREGAR de las cards
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


/*
// Función que establece el EventListener() a los botones
function load() { 
    
  boton.addEventListener("click", mostrarMensaje);
  boton.addEventListener("mouseover", resaltarBoton);
  boton.addEventListener("mouseout", quitarResaltado);
  
}

document.addEventListener("DOMContentLoaded", load, false) 
*/


//funcion agregar productos al carrito
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