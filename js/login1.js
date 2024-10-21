const wrapper = document.querySelector(".wrapper")
const loginLink = document.querySelector(".login-link")
const registerLink = document.querySelector(".register-link")
const btnPopup = document.querySelector(".btnlogin-popup")
const iconClose = document.querySelector(".icon-close")
registerLink.addEventListener("click", () => {
  wrapper.classList.add("active")
})

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active")
})

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup")
})
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup")
})

function logar() {
  const mail = document.getElementById("login-mail").value.trim();

  if (!mail || mail.length == 0) {
    document.getElementsByClassName("msg-erro")[0].innerText = "Forneça o e-mail";
    document.getElementsByClassName("msg-erro")[0].style.display = "flex";
  } else {
    document.getElementsByClassName("msg-erro")[0].style.display = "none";
    const usuario = { mail };

    // Configuração da requisição
    const url = `${urlbase}/login`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    };

    // Submete a requisição
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          document.getElementsByClassName("msg-erro")[0].innerText = "Erro na requisição";
          document.getElementsByClassName("msg-erro")[0].style.display = "flex";
        }
        return response.json();
      })
      .then((data) => {
        if (data.tbusuario) {
          salvarLogin(data);
          window.location.href = "./questionario.html";
        }
        else{
          document.getElementsByClassName("msg-erro")[0].innerText = data.erro;
          document.getElementsByClassName("msg-erro")[0].style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementsByClassName("msg-erro")[0].innerText = error;
        document.getElementsByClassName("msg-erro")[0].style.display = "flex";
      });
  }
}

// Salvar dados de login
function salvarLogin(objeto) {
  // JSON.stringify() é usado para converter de objeto JS em string JSON
  localStorage.setItem("usuario", JSON.stringify(objeto));
}
