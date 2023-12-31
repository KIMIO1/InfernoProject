document.addEventListener("DOMContentLoaded", mostrarCatalogo);

function mostrarCatalogo() {
    const catalogo = document.getElementById("catalog");
    catalogo.innerHTML = "";

    // Recupera los productos del almacenamiento local
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.forEach((producto, index) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("product");

        const img = document.createElement("img");
        img.src = producto.imagen;
        divProducto.appendChild(img);

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;
        divProducto.appendChild(nombre);

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;
        divProducto.appendChild(precio);

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;
        divProducto.appendChild(descripcion);

        // Agrega el botón de modificar
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.addEventListener("click", () => abrirModalModificar(index));
        divProducto.appendChild(btnModificar);

        // Agrega el botón de eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarProducto(index));
        divProducto.appendChild(btnEliminar);

        catalogo.appendChild(divProducto);
    });
}

function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));
    const descripcion = prompt("Ingrese la descripción del producto:");
    const imagen = prompt("Ingrese la URL de la imagen del producto:");

    // Obtiene los productos actuales del almacenamiento local
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Agrega el nuevo producto a la lista
    productos.push({ nombre, precio, descripcion, imagen });

    // Guarda la lista actualizada en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(productos));

    // Actualiza la visualización del catálogo
    mostrarCatalogo();
}

function eliminarProducto(index) {
    // Obtiene los productos actuales del almacenamiento local
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Elimina el producto del array
    productos.splice(index, 1);

    // Guarda la lista actualizada en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(productos));

    // Actualiza la visualización del catálogo
    mostrarCatalogo();
}
