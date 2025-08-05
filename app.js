const claveSupabase="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpc3Z5ZXpsaGd5b3ltZG5vc29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDEyOTYsImV4cCI6MjA2ODM3NzI5Nn0.7a9DIdo9bBWO1gGawJSZr8gQqaLW9lXlsMHTfd7Hkz8"
const urlSupabase="https://tisvyezlhgyoymdnosoe.supabase.co"


// Crear cliente de Supabase usando la variable global del CDN
const supabase = window.supabase.createClient(urlSupabase, claveSupabase);

async function crearTarea(titulo, descripcion = "Descripción no especificada.", fecha_limite = null) {
  const { data, error } = await supabase
    .from("tareas")
    .insert([{ titulo, descripcion, fecha_limite }]);

  if (error) {
    alert("Error al crear la tarea: " + error.message);
    return null;

  } else {
    alert("Tarea registrada exitosamente");
    
    const tareas = await obtenerTareas();
    mostrarTareas(tareas);
  }



  return data;
}

async function obtenerTareas() {
  const { data, error } = await supabase.from("tareas").select("*");
  if (error) {
    console.error("Error al obtener las tareas: " + error.message);
    return [];
  } else {
    console.log("Tareas obtenidas exitosamente" + data);
    return data;
  }
}

//Eliminar una tarea por ID
async function eliminarTarea(id) {
  const { error } = await supabase.from("tareas").delete().eq("id", id);
  if (error) {
    alert("Error al eliminar la tarea: " + error.message);
  } else {
    alert("Tarea eliminada exitosamente");
    const tareas = await obtenerTareas();
    mostrarTareas(tareas);
  }
  return true;
}

async function configurarFormulario() {
  const formulario = document.getElementById("formulario")
  formulario.onsubmit = async function (e) {
    e.preventDefault();
    const titulo = formulario.elements["titulo"].value;
    const descripcion = formulario.elements["descripcion"].value;
    const fecha_limite = formulario.elements["fecha_limite"].value;
    crearTarea(titulo, descripcion, fecha_limite);
  }
  




}

function mostrarTareas(tareas) {
  const contenedorTareas = document.getElementById
  ("contenedor-tareas");

  contenedorTareas.innerHTML = ""; 

  if (tareas.length === 0) {
    contenedorTareas.innerHTML = "<p>No tienes tareas.</p>";
    return;
  }

  tareas.forEach((tarea) => {
    const div = document.createElement("div");
    div.className = "tarea";
    div.innerHTML = `
      <strong>${tarea.titulo}</strong>
      <small>${tarea.descripcion || ""}</small><br />

      <span class="${tarea.completada ? "completada" : "pendiente"}">
        ${tarea.completada ? "✔ Completada" : "⏳ Pendiente"}
      </span>

      <small>${tarea.fecha_limite || ""}</small>

      <button type="button" class="boton-eliminar" data-id="${
        tarea.id
      }">Eliminar</button>
      
       <button type="button" class="boton-editar" data-id="${
        tarea.id
      }">Editar</button>

    `;

    contenedorTareas.appendChild(div);
    
  })
  contenedorTareas.querySelectorAll(".boton-eliminar").forEach((boton) => {
    boton.onclick = async function () {
      const id = parseInt(boton.getAttribute("data-id"));
      if (confirm("¿Estás seguro de eliminar esta tarea?")) {
        await eliminarTarea(id);
      }
    };
  });
}


// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.supabase == "undefined") {
    console.error("Supabase no está disponible. Verifica el enlace.");
    return;
  } else
  {console.log("supabase cargado exitosamente")}

  configurarFormulario();

  const tareas = await obtenerTareas();

  mostrarTareas(tareas);
});