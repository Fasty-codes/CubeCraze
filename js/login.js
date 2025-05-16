// document.getElementById("loginForm").addEventListener("submit", function(e){
//     e.preventDefault();

//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const message = document.getElementById("message");

//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const user = users.find(u => u.username === username);

//    if (!user) {
//     message.textContent = "Username does not exist!";
//     message.style.color = "red";
//    } else if (user.password !== password) {
//     message.textContent = "Password is Incorrect!";
//     message.style.color = "red";
//    } else {
//     message.textContent = "Login successful!";
//     message.style.color = "green";
//     window.location.href = "index.html";
//    }
// });

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page reload

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.textContent = "";
    message.className = "msg";

    const storedPassword = localStorage.getItem(username);

    if (!storedPassword) {
        message.textContent = "Username does not exist.";
        message.classList.add("error");
        return;
    }

    if (storedPassword !== password) {
        message.textContent = "Incorrect password.";
        message.classList.add("error");
        return;
    }

    message.textContent = "Login successful! Redirecting...";
    message.classList.add("success");

    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});
