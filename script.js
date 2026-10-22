
const productos = [
    {
        id: 1,
        nombre: "Teclado Mecánico RGB",
        categoria: "Teclados",
        precio: 3495,
        imagen: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
        descripcion: "Iluminación RGB y respuesta rápida."
    },
    {
        id: 2,
        nombre: "Mouse Gamer RGB",
        categoria: "Accesorios",
        precio: 1995,
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
        descripcion: "Precisión y comodidad para jugar."
    },
    {
        id: 3,
        nombre: "Audífonos Gamer",
        categoria: "Audio",
        precio: 2495,
        imagen: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
        descripcion: "Sonido envolvente para cada partida."
    },
    {
        id: 4,
        nombre: "Control Gamer",
        categoria: "Controles",
        precio: 2995,
        imagen: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80",
        descripcion: "Diseñado para jugar con comodidad."
    }
];

let carrito = [];

const listaProductos = document.getElementById("listaProductos");
const contador = document.getElementById("contador");
const btnCarrito = document.getElementById("btnCarrito");

const formatoPrecio = precio =>
    precio.toLocaleString("es-DO", {
        style: "currency",
        currency: "DOP",
        maximumFractionDigits: 0
    });

function mostrarProductos() {
    listaProductos.innerHTML = productos.map(producto => `
        <article class="product-card">
            <div class="product-image">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.insertAdjacentHTML('beforeend','<span style=&quot;font-size:48px&quot;>🎮</span>')"
                >
            </div>

            <p class="category">${producto.categoria}</p>
            <h3>${producto.nombre}</h3>
            <p class="description">${producto.descripcion}</p>

            <div class="product-bottom">
                <span class="product-price">
                    ${formatoPrecio(producto.precio)}
                </span>
            </div>

            <button
                class="add-button"
                onclick="agregarAlCarrito(${producto.id})"
            >
                ♡ Agregar al carrito
            </button>
        </article>
    `).join("");
}

function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);

    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarContador();

    alert(`${producto.nombre} se agregó al carrito 💗`);
}

function actualizarContador() {
    const totalUnidades = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    contador.textContent = totalUnidades;
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. ¡Vamos a elegir algo bonito! 💗");
        return;
    }

    const detalle = carrito.map(item =>
        `${item.nombre} x${item.cantidad} — ${formatoPrecio(item.precio * item.cantidad)}`
    ).join("\n");

    const total = carrito.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    alert(
        `🛍️ TU CARRITO WALKIRIA\n\n${detalle}\n\nTOTAL: ${formatoPrecio(total)}\n\n¡Gracias por comprar en Walkiria! 💗`
    );
}

btnCarrito.addEventListener("click", mostrarCarrito);

mostrarProductos();
