var typed = new Typed('.text', {
    strings: ['CubeCraze!'],
    typeSpeed: 200,
    backSpeed:200,
  backDelay:1000,
    loop:true
  });

// window.addEventListener('DOMContentLoaded', () => {
//   const loggedInUser = localStorage.getItem("loggedInUser");

//   if(loggedInUser) {

//     const signUpBtn = document.getElementById('signup');
//     const loginBtn = document.getElementById('login');

//     if (signUpBtn) signUpBtn.remove();
//     if (loginBtn) loginBtn.remove();

//     const welcomeText =document.getElementById('welcome');
//     if(welcomeText) {
//       welcomeText.textContent = `Welcome, ${loggedInUser}!`;
//     }
//   }
// });

// Get button elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Check login status on page load
if (localStorage.getItem("isLoggedIn") === "true") {
  showLogout();
} else {
  showLoginSignup();
}

// Simulated login (you can replace this with real logic)
loginBtn.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "true");
  showLogout();
});

signupBtn.addEventListener("click", () => {
  // Simulated signup flow
  localStorage.setItem("isLoggedIn", "true");
  showLogout();
});

// Logout logic
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  showLoginSignup();
});

// Functions to update UI
function showLogout() {
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
}

function showLoginSignup() {
  loginBtn.style.display = "inline-block";
  signupBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
}
