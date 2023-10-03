const form = document.getElementById("formSubject");

form.addEventListener("submit", function(event) {
  const infoErrorBox = document.getElementById("form-error-info");
  let message = [];

  const name = document.getElementById("nombre");  // Cambié "name" por "nombre" para que coincida con tu HTML
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const description = document.getElementById("description");
  const time = document.getElementById("time");

  if (!name.value) {
    const errorMessage = document.getElementById('error-name');
        errorMessage.innerHTML = "<p class='alert mt-3 my-alert'>El nombre es un campo obligatorio:</p>";
    message.push("error-name");
  }
  
  if (!email.value) {
    const errorMessage = document.getElementById('error-email');
        errorMessage.innerHTML = "<p class='alert mt-3 my-alert'>El correo es obligatorio:</p>";
    message.push("error-email");
  }

  if (!subject.value) {
    const errorMessage = document.getElementById('error-subject');
    errorMessage.innerHTML = "<p class='alert mt-3 my-alert'>El asunto es un obligatorio:</p>";
message.push("error-subject");
  }

  if (!description.value) {
    const errorMessage = document.getElementById('error-description');
    errorMessage.innerHTML = "<p class='alert mt-3 my-alert'>La descripcion es obligatoria para poder entender:</p>";
message.push("error-description");
  }

  if (!time.value) {
    const errorMessage = document.getElementById('error-time');
    errorMessage.innerHTML = "<p class='alert mt-3 my-alert'>Falta especificar la hora:</p>";
message.push("error-time");
  }

  if (message.length > 0) {
    event.preventDefault();
  }
});






