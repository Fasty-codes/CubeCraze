var typed = new Typed('.text', {
    strings: ['CubeCraze!'],
    typeSpeed: 200,
    backSpeed:200,
  backDelay:1000,
    loop:true
  });

window.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if(loggedInUser) {

    const signUpBtn = document.getElementById('signup');
    const loginBtn = document.getElementById('login');

    if (signUpBtn) signUpBtn.remove();
    if (loginBtn) loginBtn.remove();

    const welcomeText =document.getElementById('welcome');
    if(welcomeText) {
      welcomeText.textContent = `Welcome, ${loggedInUser}!`;
    }
  }
});
