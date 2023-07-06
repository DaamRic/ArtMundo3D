var carrito = [];
var totalCarrito = 0;

function verCarrito() {
    var carritoContenido = document.getElementById("carrito-lista").innerHTML;
    alert("Contenido del carrito:\n\n" + carritoContenido);
}

function mostrarCarrito() {
    var carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.remove("hidden");
    actualizarCarrito();
}

function cerrarCarrito() {
    var carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.add("hidden");
}

function agregarAlCarrito(producto, precio, imagen) {
    carrito.push({ producto: producto, precio: precio, imagen: imagen });
    totalCarrito += precio;
    console.log("Producto agregado al carrito: " + producto);
    console.log("Contenido del carrito: " + JSON.stringify(carrito));
    actualizarCarrito();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'AGREGADO AL CARRITO',
        showConfirmButton: false,
        timer: 1500
    })
}

function finalizarPedido() {
    var carritoContainer = document.getElementById("carrito-container");
    var pedidoExitoContainer = document.getElementById("pedido-exito");
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

function verCarrito() {
    console.log("Contenido del carrito: " + carrito);
}

function removerDelCarrito(index) {
    var productoRemovido = carrito[index];
    totalCarrito -= productoRemovido.precio;
    carrito.splice(index, 1);
    console.log("Producto removido del carrito: " + index);
    console.log("Carrito actualizado: " + JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    var carritoLista = document.getElementById("carrito-lista");
    var carritoCantidad = document.getElementById("carrito-cantidad");
    var totalCarritoElement = document.getElementById("total-carrito");
    carritoLista.innerHTML = "";
    carritoCantidad.textContent = carrito.length;
    totalCarritoElement.textContent = "$" + totalCarrito.toFixed(2);
    for (var i = 0; i < carrito.length; i++) {
    var producto = carrito[i].producto;
    var precio = carrito[i].precio;
    var imagen = carrito[i].imagen;
    var li = document.createElement("li");
    li.textContent = producto + " - Precio: $" + precio.toFixed(2);
    var imagenElement = document.createElement("img");
    imagenElement.src = imagen;
    imagenElement.alt = "Imagen " + (i + 1);
    li.appendChild(imagenElement);
    var botonRemover = document.createElement("button");
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