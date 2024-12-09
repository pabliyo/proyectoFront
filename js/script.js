let carrito = [];

const btnCarrito = document.getElementById('btn-carrito');
const modal = document.getElementById('carritoModal');

btnCarrito.addEventListener('click', () => {
    modal.classList.toggle('active');
});



//funcion valida el formulario de contacto que no este vacio ningun campo
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



function crearYMostrarProductos() {
  fetch('https://github.com/pabliyo/proyectoFront/blob/master/json/productos.json')
    .then(response => response.json())
    .then(data => {
      const contenedorProductos = document.getElementById('contenedorItems');
      const tarjetas = crearTarjetas(data, contenedorProductos);
      agregarEventosATarjetas(tarjetas);
    });
}

crearYMostrarProductos();

function crearTarjetas(data, contenedor) {
  const tarjetas = [];
  data.forEach(producto => {
    const plantillaProducto = `
      <div class="item">
        <div class="contenedorTituloItem">
          <h2 class="tituloItem">${producto.nombre}</h2>
        </div>
        <img class="imgItem" src="img/${producto.imagen}" alt="${producto.nombre}">
        <p class="descripcionItem">${producto.descripcion}</p>
        <span class="precioItem">$${producto.precio}</span>
        <div class="contenedorPrecioItem">
          <h2 class="precioItemRebajado">$${producto.precioRebajado}</h2>
          <h2 class="precioItemOff">${producto.descuento}% OFF</h2>
        </div>
        <button class="agregarCarrito" id="${producto.id}">AGREGAR</button>
      </div>
    `;

    const elementoTarjeta = document.createElement('div');
    elementoTarjeta.innerHTML = plantillaProducto;
    contenedor.appendChild(elementoTarjeta);
    tarjetas.push(elementoTarjeta);
  });
  return tarjetas;
}

function agregarEventosATarjetas(tarjetas) {
  tarjetas.forEach(card => {
    const img = card.querySelector('img');
    const descripcion = card.querySelector('.descripcionItem');
    const botonAgregar = card.querySelector('.agregarCarrito');
    const producto = { 
      nombre: card.querySelector('.tituloItem').textContent,
      precio: card.querySelector('.precioItemRebajado').textContent,
    };

    let isDescriptionVisible = false;
    
    card.addEventListener('click', () => {
      isDescriptionVisible = !isDescriptionVisible;
      img.style.opacity = isDescriptionVisible ? 0.5 : 1;
      descripcion.style.display = isDescriptionVisible ? 'block' : 'none';
      descripcion.style.opacity = isDescriptionVisible ? 1 : 0;
    });

    botonAgregar.addEventListener('click', () => {
      agregarAlCarrito(producto);
    });
  
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}


function actualizarCarrito() {
  const carritoContainer = document.getElementById('listaProductos');
  carritoContainer.innerHTML = '';

  // Iterar sobre los productos en el carrito y crear elementos HTML
  carrito.forEach(producto => {
    const productoEnCarrito = document.createElement('div');
    productoEnCarrito.textContent = `${producto.nombre} - ${producto.precio}`;
    carritoContainer.appendChild(productoEnCarrito);
  });
}
