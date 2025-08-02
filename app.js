const claveSupabase="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpc3Z5ZXpsaGd5b3ltZG5vc29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDEyOTYsImV4cCI6MjA2ODM3NzI5Nn0.7a9DIdo9bBWO1gGawJSZr8gQqaLW9lXlsMHTfd7Hkz8"
const urlSupabase="https://tisvyezlhgyoymdnosoe.supabase.co"


// Crear cliente de Supabase usando la variable global del CDN
const supabase = window.supabase.createClient(urlSupabase, claveSupabase);

async function crearTarea(titulo, descripcion = null, fecha_limite = null) {
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

async function configurarFormulario() {
  const formulario = document.getElementById("formulario")
  formulario.onsubmit = async function (e) {
    const titulo= formulario.titulo.value
    const descripcion= formulario.descripcion.value
    const fecha_limite= formulario.fecha_limite.value
    crearTarea(titulo, descripcion, fecha_limite)
  }
  




}

// Ejecutar al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.supabase == "undefined") {
    console.error("Supabase no está disponible. Verifica el enlace.");
    return;
  } else
  {console.log("supabase cargado exitosamente")}
configurarFormulario();
  console.log("Prueba Valentino")
});