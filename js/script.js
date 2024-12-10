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
  fetch('data/productos.json')
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
          <span class="moneda">$</span>
          <span class="precioItemRebajado">${producto.precioRebajado}</span>
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
  carrito.push({...producto, cantidad: 1 }); // Clonar el producto y agregar cantidad
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoContainer = document.getElementById('listaProductos');
  const totalElement = document.getElementById('total');
  carritoContainer.innerHTML = '';

  carrito.forEach(producto => {
    const productoEnCarrito = document.createElement('li');
    productoEnCarrito.innerHTML = `
      ${producto.nombre} - ${producto.precio} x ${producto.cantidad}
      <button class="restar">-</button>
      <button class="agregar">+</button>
      <button class="eliminar">Eliminar</button>
    `;
    carritoContainer.appendChild(productoEnCarrito);

    // Agregar event listeners a los botones
    const restarBtn = productoEnCarrito.querySelector('.restar');
    const agregarBtn = productoEnCarrito.querySelector('.agregar');
    const eliminarBtn = productoEnCarrito.querySelector('.eliminar');

    restarBtn.addEventListener('click', () => {
      // Buscar el producto en el carrito y disminuir la cantidad
      const index = carrito.findIndex(item => item.nombre === producto.nombre);
      if (index !== -1 && carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarCarrito();
      }
    });

    agregarBtn.addEventListener('click', () => {
      // Buscar el producto en el carrito y aumentar la cantidad
      const index = carrito.findIndex(item => item.nombre === producto.nombre);
      if (index !== -1) {
        carrito[index].cantidad++;
        actualizarCarrito();
      } else {
        // Si el producto no existe, agregarlo al carrito
        agregarAlCarrito(producto);
      }
    });
  

    eliminarBtn.addEventListener('click', () => {
      // Eliminar el producto del carrito
      const index = carrito.findIndex(item => item.nombre === producto.nombre);
      if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
      }
    });
  });
  calcularTotal();
}

function calcularTotal() {
  let total = 0;
  const totalElement = document.getElementById('total');

  carrito.forEach(producto => {
    const precio = parseFloat(producto.precio);
    const cantidad = parseInt(producto.cantidad);
    total += precio * cantidad;
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}