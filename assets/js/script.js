const listaDeTareas = document.querySelector("#listaTareas")
const inputTareas = document.querySelector("#tareas")
const botonAgregar = document.querySelector("#agregarTarea")
const contar = document.querySelector("#cuantasTareas")
const tareasCompletadas = document.querySelector("#tareasCompletadas");
const tareasNoCompletadas = document.querySelector("#tareasNoCompletadas");
const tareas = [
    { id: 3, nombre: "johan"},
    {id: 2, nombre: "cristal"},
    {id: 1, nombre: "Nathan"},
]

// función actualizar la lista para llamar despues
function actualizarLista() {
    let html = "";
    tareas.forEach((tarea, index) => {
        html += `
            <li class="tarea-no-completada">
                <input type="checkbox" class="checkboxTarea" data-index="${index}">
                ID: ${tarea.id} - ${tarea.nombre}
                <button onclick="eliminarTarea(${index})">Eliminar</button>
            </li>`;
    });

    listaDeTareas.innerHTML = html;
    contar.innerHTML = "Tareas total: " + tareas.length;

    
    document.querySelectorAll('.checkboxTarea').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarConteo);
        checkbox.addEventListener('change', actualizarEstilo);
    });
}


//evento para boton agregar la tarea, para actualizar lista y conteo
botonAgregar.addEventListener("click", () => {
    const nuevaTareaNombre = inputTareas.value.trim();
    if (nuevaTareaNombre === "") {
        alert("Por favor, ingrese una tarea válida.");
        return;
    }

   // Buscar si ya existe una tarea 
   const tareaExistente = tareas.find(tarea => tarea.nombre.toLowerCase() === nuevaTareaNombre.toLowerCase());
    
   let nuevaTarea;
   if (tareaExistente) {
       // Si existe, usa el mismo ID
       nuevaTarea = { id: tareaExistente.id, nombre: nuevaTareaNombre };
   } else {
       // Si no existe se generara un nuevo ID
       const maxId = tareas.length > 0 ? Math.max(...tareas.map(tarea => tarea.id)) : 0;
       nuevaTarea = { id: maxId + 1, nombre: nuevaTareaNombre };
   }

    tareas.unshift(nuevaTarea);
    inputTareas.value = "";

    actualizarLista(); 
    actualizarConteo();
});


//funcion para actualizar el conteo
function actualizarConteo() {
    const checkboxes = document.querySelectorAll('.checkboxTarea');
    let completadas = 0;
    let noCompletadas = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            completadas++;
        } else {
            noCompletadas++;
        }
    });

    tareasCompletadas.innerHTML = completadas;
    tareasNoCompletadas.innerHTML = noCompletadas;
}


//funcion para actualizar el estilos de los checkBox
function actualizarEstilo() {
    const checkboxes = document.querySelectorAll('.checkboxTarea');

    checkboxes.forEach(checkbox => {
        const li = checkbox.parentElement;

        if (checkbox.checked) {
            li.classList.add('tarea-completada');
            li.classList.remove('tarea-no-completada');
        } else {
            li.classList.add('tarea-no-completada');
            li.classList.remove('tarea-completada');
        }
    });
}


//funcion para Elimina la tarea de la lista
function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarLista(); 
    actualizarConteo();
}


//funcion para mostrar 3 tareas al principio
document.addEventListener("DOMContentLoaded", () => {
    actualizarLista();
    actualizarConteo();
});







/*
function actualizarLista() {
    let html = "";
    tareas.forEach((tarea, index) => {
        html += `
            <li class="tarea-no-completada">
                <input type="checkbox" class="checkboxTarea" data-index="${index}">
                ${tarea}
                <button onclick="eliminarTarea(${index})">Eliminar</button>
            </li>`;
    });

    listaDeTareas.innerHTML = html;
    contar.innerHTML = "Tareas total: " + tareas.length;

    // Añadir el evento de cambio a los checkboxes para actualizar el conteo y el estilo
    document.querySelectorAll('.checkboxTarea').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarConteo);
        checkbox.addEventListener('change', actualizarEstilo);
    });
}
*/
