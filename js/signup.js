document.getElementById("signUpForm").addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    if (!username || !password || !confirmPassword) {
        message.textContent = "Please fill all fields!";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let userExists = users.some(user => user.username === username);

    if(userExists) {
        message.style.color = "red";
        message.textContent = "Username already exists!";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "lime";
    message.textContent = "SignUp successful!";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});


localStorage.setItem("loggedInUser", username);
