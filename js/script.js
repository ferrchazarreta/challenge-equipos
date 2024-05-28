// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Funcion para actualizar un jugador en el localStorage
const actualizarJugadorLocalStorage = (jugador) => {
    const jugadores = obtenerJugadoresLocalStorage();
    const jugadorActualizado = jugadores.findIndex((j) => j.id === jugador.id);
    jugadores[jugadorActualizado] = jugador;
    guardarJugadoresLocalStorage(jugadores);
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const estado = prompt("Ingrese el estado del jugador (Titular/Suplente/Lesionado): ");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ nombre, edad, posicion, estado });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};


// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    try {
        let plantilla = document.getElementById('plantilla')
        // Implementación para listar todos los jugadores
        plantilla.innerHTML = '';
        let jugadores = obtenerJugadoresLocalStorage();
        //mostrar jugadores
        jugadores.forEach(jugador => {
            const jugador_li = document.createElement('li')
            jugador_li.className = 'jugador';
            jugador_li.innerHTML = `
        <div class="card mt-3">
            <h5 class="card-header">Nombre: ${jugador.nombre}</h5>
            <div class="card-body">
                <p class="card-text">Edad: ${jugador.edad}</p>
                <p class="card-text">Posicion: ${jugador.posicion}</p>
                <p class="card-text">Estado: ${jugador.estado}</p>
                <button onclick="asignarPosicion(${jugador.id})"
                type="button"
                class="btn btn-success"
            >
                Cambiar Posicion
            </button>
            </div>
        </div>
    `;
            plantilla.appendChild(jugador_li)
        });
        await new Promise(resolve => setInterval(resolve, 1000));
    } catch (error) {
        console.error('Error:', error.message);
    }

};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (jugadorID) => {
    try {
        // Implementación para asignar una nueva posición a un jugador
        let jugadores = obtenerJugadoresLocalStorage();
        let jugador = jugadores.find(jugador => jugador.id === jugadorID);
        nuevaPosicion = prompt('Ingresa la nueva posicion')
        jugador.posicion = nuevaPosicion;
        actualizarJugadorLocalStorage(jugador);
        listarJugadores();
        await new Promise(resolve => setInterval(resolve, 1000));
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async () => {
    try {
        // Implementación para realizar un cambio durante un partido
        let plantilla = document.getElementById('plantilla')
        // Implementación para listar todos los jugadores
        plantilla.innerHTML = '';
        let jugadores = obtenerJugadoresLocalStorage();
        let jugadoresTitulares = jugadores.filter((jugador) => jugador.estado === 'Titular')
        let jugadoresSuplentes = jugadores.filter((jugador) => jugador.estado === 'Suplente')

        const selectTitulares = document.createElement('select')
        selectTitulares.id = 'selectTitulares';
        selectTitulares.className = 'form-select m-3'
        plantilla.appendChild(selectTitulares)

        jugadoresTitulares.forEach(jugador => {
            const jugadorTitular = document.createElement('option')
            jugadorTitular.setAttribute('value',`${jugador.id}`)
            jugadorTitular.innerHTML = `${jugador.nombre}`
            selectTitulares.appendChild(jugadorTitular)
        })

        const selectSuplentes = document.createElement('select')
        selectSuplentes.id = 'selectSuplentes';
        selectSuplentes.className = 'form-select m-3'
        plantilla.appendChild(selectSuplentes)
        jugadoresSuplentes.forEach(jugador => {
            const jugadorSuplente = document.createElement('option')
            jugadorSuplente.setAttribute('value',`${jugador.id}`)
            jugadorSuplente.innerHTML = (`<option>${jugador.nombre}</option>`)
            selectSuplentes.appendChild(jugadorSuplente)
        })

        const button = document.createElement('button')
        button.innerHTML = 'Realizar Cambio';
        button.className = 'btn btn-success mt-3';
        button.onclick = confirmarCambio;
        plantilla.appendChild(button);

    } catch (error) {
        console.error('Error:', error.message)
    }

};

const confirmarCambio = async () => {
    try {
        let selectTitulares = document.getElementById('selectTitulares');
        let selectSuplentes = document.getElementById('selectSuplentes');
        
        const jugadorEntranteID = parseInt(selectSuplentes.value);
        const jugadorSalienteID = parseInt(selectTitulares.value);

        let jugadores = obtenerJugadoresLocalStorage();

        let jugadorEntrante = jugadores.find(jugador => jugador.id === jugadorEntranteID);
        let jugadorSaliente = jugadores.find(jugador => jugador.id === jugadorSalienteID);
        jugadorEntrante.estado = 'Titular';
        jugadorSaliente.estado = 'Suplente';
        actualizarJugadorLocalStorage(jugadorEntrante);
        actualizarJugadorLocalStorage(jugadorSaliente);

        await listarPlantilla();
    } catch (error) {
        console.error('Error:', error.message)
    }
}

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
