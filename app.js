document.addEventListener("DOMContentLoaded", () => {
    const inputAmigo = document.getElementById("amigo");
    const listaAmigos = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");

    let amigos = [];

    function agregarAmigo() {
        const nombre = inputAmigo.value.trim();

        if (nombre === "") {
            alert("Por favor, ingresa un nombre.");
            return;
        }
        if (amigos.includes(nombre)) {
            alert("Este nombre ya está en la lista.");
            return;
        }

        amigos.push(nombre);
        mostrarLista();
        inputAmigo.value = "";
    }

    function mostrarLista() {
        listaAmigos.innerHTML = "";
        amigos.forEach((amigo, index) => {
            const li = document.createElement("li");
            li.textContent = amigo;
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "❌";
            botonEliminar.onclick = () => eliminarAmigo(index);
            li.appendChild(botonEliminar);
            listaAmigos.appendChild(li);
        });
    }

    function eliminarAmigo(index) {
        amigos.splice(index, 1);
        mostrarLista();
    }

    function sortearAmigo() {
        if (amigos.length < 2) {
            alert("Debe haber al menos dos participantes.");
            return;
        }

        let asignaciones = [...amigos];
        do {
            asignaciones = asignaciones.sort(() => Math.random() - 0.5);
        } while (asignaciones.some((amigo, i) => amigo === amigos[i]));

        resultado.innerHTML = "";
        amigos.forEach((amigo, i) => {
            const li = document.createElement("li");
            li.textContent = `${amigo} → ${asignaciones[i]}`;
            resultado.appendChild(li);
        });
    }

    function reiniciarJuego() {
        amigos = [];
        listaAmigos.innerHTML = "";
        resultado.innerHTML = "";
    }

    // Eventos
    document.querySelector(".button-add").addEventListener("click", agregarAmigo);
    document.querySelector(".button-draw").addEventListener("click", sortearAmigo);

    // Crear botón de reinicio en el HTML dinámicamente
    const buttonReset = document.createElement("button");
    buttonReset.textContent = "Reiniciar";
    buttonReset.className = "button-reset";
    buttonReset.onclick = reiniciarJuego;
    document.querySelector(".button-container").appendChild(buttonReset);
});