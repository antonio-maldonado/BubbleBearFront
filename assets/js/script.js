function dataValidation() {

  let message = [];

  const infoErrorBox = document.getElementById("form-error-info");
  const firstName = document.getElementById("validationName").value;
  const lastName = document.getElementById("validationLastName").value;
  const telNumber = document.getElementById("validationTel").value;
  const email = document.getElementById("validationEmail").value;
  const asunto = document.getElementById("validationAsunto").value;

  const nameRegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const numeroRegexp = /\d{10}/;

  if (!firstName) {
    message.push("<p class='alert'>Hace falta el nombre</p>");
  } else if (!nameRegExp.test(firstName)) {
    message.push(
      "<p class='alert'>Está mal el nombre, debe ser solo letras </p>"
    );
  }

  if (!lastName) {
    message.push("<p class='alert'>Hace falta el apellido</p>");
  } else if (!nameRegExp.test(lastName)) {
    message.push(
      "<p class='alert'>Está mal el apellido, debe ser solo letras </p>"
    );
  }

  if (!telNumber) {
    message.push("<p class='alert'>Hace falta el número de telefono</p>");
  } else if (!numeroRegexp.test(telNumber)) {
    message.push("<p class='alert'>El número debe ser diez dígitos</p>");
  }

  if (!email) {
    message.push("<p class='alert'>Hace falta el email</p>");
  } else if (!emailRegexp.test(email)) {
    message.push(
      "<p class='alert'>El email debe tener la forma: correo@correo.com</p>"
    );
  }

  if (!asunto) {
    message.push("<p class='alert'>Hace falta el asunto</p>");
  }

  message = message.join("");
  infoErrorBox.innerHTML = message;

  if (message) {
    return false;
  } else {
    infoErrorBox.innerHTML = "";
    return true;
  }
};

const btn = document.getElementById("form-button");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let message = dataValidation();
    if (message) {
      btn.value = "Sending...";
      const serviceID = "default_service";
      const templateID = "template_9d6ywk8";
      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          Swal.fire({
            icon: "success",
            text: "Mensaje enviado con éxito",
            showConfirmButton: true,
          });
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }
  });
