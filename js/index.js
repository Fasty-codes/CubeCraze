var typed = new Typed('.text', {
  strings: ['CubeCraze!'],
  typeSpeed: 200,
  backSpeed: 200,
  backDelay: 1000,
  loop: true
});

window.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {

    const signUpBtn = document.getElementById('signupbtn');
    const loginBtn = document.getElementById('loginbtn');

    if (signUpBtn) signUpBtn.remove();
    if (loginBtn) loginBtn.remove();

  }
});

window.addEventListener('DOMContentLoaded', () => {
  const signUpBtn = document.getElementById('signupbtn');
  const loginBtn = document.getElementById('loginbtn');
  const logoutBtn = document.getElementById('logoutbtn');

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    if (signUpBtn) signUpBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      localStorage.setItem("loggedInUser", "true");
      signUpBtn.style.display = "none";
      loginBtn.style.display = "none";
      logoutBtn.style.display = "block";
    });
  };

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.reload();
      logoutBtn.style.display = "none";
      signUpBtn.style.display = "block"; 
      loginBtn.style.display = "block";
    });
  }
});


