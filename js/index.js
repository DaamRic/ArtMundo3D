let carrito = [];
let totalCarrito = 0;

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    totalCarrito = parseFloat(localStorage.getItem("totalCarrito")) || 0;
}

function verCarrito() {
    let carritoContenido = document.getElementById("carrito-lista").innerHTML;
    alert("Contenido del carrito:\n\n" + carritoContenido);
}

function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.remove("hidden");
    actualizarCarrito();
}

function cerrarCarrito() {
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.add("hidden");
}

function agregarAlCarrito(producto, precio, imagen) {
    carrito.push({ producto: producto, precio: precio, imagen: imagen });
    totalCarrito += precio;
    console.log("Producto agregado al carrito: " + producto);
    console.log("Contenido del carrito: " + JSON.stringify(carrito));
    actualizarCarrito();
    guardarEnLocalStorage();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'AGREGADO AL CARRITO',
        showConfirmButton: false,
        timer: 1500
    })
}

function removerDelCarrito(index) {
    let productoRemovido = carrito[index];
    totalCarrito -= productoRemovido.precio;
    carrito.splice(index, 1);
    console.log("Producto removido del carrito en el índice: " + index);
    console.log("Contenido del carrito actualizado: " + JSON.stringify(carrito));
    actualizarCarrito();
    guardarEnLocalStorage();
}


function realizarPedido(){
    document.body.innerHTML = 
    ` 
    <header>
        <div>
        <h1><a class="titulo" href="../index.html">ArtMundo3D</a></h1>
        </div>
            <div>
                <nav>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="pages/categoria.html">Filamento</a></li>
                        <li><a href="pages/acercade.html">Acerca De</a></li>
                        <li><a href="pages/contacto.html">Contacto</a></li>
                    </ul>
                </nav>
                <button id="ver-carrito" onclick="mostrarCarrito()">Ver Carrito (<span id="carrito-cantidad">0</span>)</button>
            </div>
    </header>

    <section id="formulario-pedido">
    <h2 style="text-align:center; margin-top:20px">Realizar Pedido</h2>
    <div id="formulario-container">
    <form onsubmit="finalizarPedidoFormulario(event)">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" required><br>
        <label for="numero-tarjeta">Número de Tarjeta:</label>
        <input type="text" id="numero-tarjeta" required><br>
        <label for="fecha-vencimiento">Fecha de Vencimiento:</label>
        <input type="text" id="fecha-vencimiento" required><br>
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" required><br>
        <button onclick="finalizarPedi()">Finalizar Pedido</button>
    </form>
    </div>
</section>

    <footer>
            <div>
                <h2><a class="titulo" href="index.html">ArtMundo3D</a></h2>
            </div>
            <div>
                <p>Proyecto Curso Coderhouse</p>
            </div>
            <div>
                <p>Proyecto Realizado por:</p>
                <p>Damian Ricardi®</p>
            </div>
        </footer>`;
}
function finalizarPedi() {
    let carritoContainer = document.getElementById("carrito-container");
    let pedidoExitoContainer = document.getElementById("pedido-exito");
    carritoContainer.classList.add("hidden");
    pedidoExitoContainer.classList.remove("hidden");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'PEDIDO FINALIZADO',
        showConfirmButton: false,
        timer: 2500
    }).then(function () {
        carrito = [];
        totalCarrito = 0;
        guardarEnLocalStorage();
    })
}

function finalizarPedidos() {
    let carritoContainer = document.getElementById("carrito-container");
    let pedidoExitoContainer = document.getElementById("pedido-exito");
    carritoContainer.classList.add("hidden");
    pedidoExitoContainer.classList.remove("hidden");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'PEDIDO FINALIZADO',
        showConfirmButton: false,
        timer: 1500
    })
    carrito = [];
    totalCarrito = 0;
    actualizarCarrito();
}

function actualizarCarrito() {
    let carritoLista = document.getElementById("carrito-lista");
    let carritoCantidad = document.getElementById("carrito-cantidad");
    let totalCarritoElement = document.getElementById("total-carrito");
    carritoLista.innerHTML = "";
    carritoCantidad.textContent = carrito.length;
    totalCarritoElement.textContent = "$" + totalCarrito.toFixed(2);
    for (let i = 0; i < carrito.length; i++) {
    let producto = carrito[i].producto;
    let precio = carrito[i].precio;
    let imagen = carrito[i].imagen;
    let li = document.createElement("li");
    li.textContent = producto + " - Precio: $" + precio.toFixed(2);
    let imagenElement = document.createElement("img");
    imagenElement.src = imagen;
    imagenElement.alt = "Imagen " + (i + 1);
    li.appendChild(imagenElement);
    let botonRemover = document.createElement("button");
    botonRemover.textContent = "Remover";
    botonRemover.onclick = (function(index) {
    return function() {
    removerDelCarrito(index);
    };
    })(i);
li.appendChild(botonRemover);
carritoLista.appendChild(li);
}
}

function guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalCarrito", totalCarrito.toString());
}