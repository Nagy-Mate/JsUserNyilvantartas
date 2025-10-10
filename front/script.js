const baseUrl = "http://localhost:3000";

document.getElementById("showLogin").addEventListener("click", function () {
  changeBoxVisibility("loginBox", "registerBox");
});

document.getElementById("showRegister").addEventListener("click", function () {
  changeBoxVisibility("registerBox", "loginBox");
});

document
  .getElementById("loginBtn")
  .addEventListener("click", async function () {
    const emailInputLogin = document
      .getElementById("emailInputLogin")
      .value.trim();
    const pwdInputLogin = document.getElementById("pwdInputLogin").value.trim();

    if (!valid(emailInputLogin) || !emailInputLogin.trim()) {
      showAlerts("wrongEmail");
    } else if (!pwdInputLogin) {
      showAlerts("wrongPwd2");
    } else {
      clearInputs();
      changeBoxVisibility("loginBox", "registerBox");

      const res = await login(emailInputLogin, pwdInputLogin);
      console.log(res);
      console.log(res.body);
      if (res.ok) {
        showAlerts("sLogin");
      }
    }
  });

document.getElementById("registerBtn").addEventListener("click", function () {
  const emailInputRegister =
    document.getElementById("emailInputRegister").value;

  if (!valid(emailInputRegister) || !emailInputRegister.trim()) {
    showAlerts("wrongEmail");
  } else if (
    document.getElementById("pwdInputRegister1").value !==
    document.getElementById("pwdInputRegister2").value
  ) {
    showAlerts("wrongPwd1");
  } else if (!document.getElementById("pwdInputRegister1").value.trim()) {
    showAlerts("wrongPwd2");
  } else {
    clearInputs();
    changeBoxVisibility("registerBox", "loginBox");
    showAlerts("sRegister");
  }
});

function valid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function clearInputs() {
  document.getElementById("emailInputLogin").value = "";
  document.getElementById("pwdInputLogin").value = "";
  document.getElementById("emailInputRegister").value = "";
  document.getElementById("pwdInputRegister1").value = "";
  document.getElementById("pwdInputRegister2").value = "";
}

function changeBoxVisibility(toShow, toRemove) {
  document.getElementById(toRemove).style.display = "none";
  let box = document.getElementById(toShow);
  box.style.display = box.style.display === "none" ? "block" : "none";
  document.getElementById("wrongPwd1").style.display = "none";
  document.getElementById("wrongPwd1").classList.remove("show");
  document.getElementById("wrongPwd2").style.display = "none";
  document.getElementById("wrongPwd2").classList.remove("show");
  document.getElementById("wrongEmail").style.display = "none";
  document.getElementById("wrongEmail").classList.remove("show");
  document.getElementById("sLogin").style.display = "none";
  document.getElementById("sLogin").classList.remove("show");
  document.getElementById("sRegister").style.display = "none";
  document.getElementById("sRegister").classList.remove("show");
  clearInputs();
}

function showAlerts(alertId) {
  const element = document.getElementById(alertId);
  element.style.display = "block";
  element.classList.add("show");
  setTimeout(() => {
    element.classList.remove("show");

    setTimeout(() => {
      element.style.display = "none";
    }, 5000);
  }, 2000);
}

async function login(email, password) {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res;
}
