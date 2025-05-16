 function signup() {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const message = document.getElementById("message");

      // Clear previous message
      message.textContent = "";
      message.style.color = "red";
      message.style.fontWeight = "600";

      if (!username || !password || !confirmPassword) {
        message.textContent = "Please fill in all fields.";
        return;
      }

      if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
      }

      if (localStorage.getItem(username)) {
        message.textContent = "Username already exists.";
        return;
      }

      localStorage.setItem(username, password);
      alert("Signup successful! You can now log in.");

      // Optional: Redirect to login page
      // window.location.href = "login.html";
      setTimeout(function() {
        window.location.href = "login.html"
      })
    }
