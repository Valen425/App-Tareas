const claveSupabase="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpc3Z5ZXpsaGd5b3ltZG5vc29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDEyOTYsImV4cCI6MjA2ODM3NzI5Nn0.7a9DIdo9bBWO1gGawJSZr8gQqaLW9lXlsMHTfd7Hkz8"
const urlSupabase="https://tisvyezlhgyoymdnosoe.supabase.co"


// Crear cliente de Supabase usando la variable global del CDN
const supabase = window.supabase.createClient(urlSupabase, claveSupabase);

async function crearTarea(titulo, descripcion = "Descripción no especificada.", fecha_limite = null) {
  const { data, error } = await supabase
    .from("tareas")
    .insert([{ titulo, descripcion, fecha_limite }]);

  if (error) {
    console.log("Error al crear la tarea: " + error);
    return null;
  } else {
    console.log("Tarea registrada exitosamente");
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
  ("lista-tareas");
  listaTareas.innerHTML = ""; // Limpiar la lista antes de mostrar las ta
}



// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.supabase == "undefined") {
    console.error("Supabase no está disponible. Verifica el enlace.");
    return;
  } else
  {console.log("supabase cargado exitosamente")}

  configurarFormulario();

  const tareas = obtenerTareas();
});