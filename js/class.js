const cubes = [
    { name: '2x2 Cube', link: '#2x2' },
    { name: '3x3 Cube', link: '#3x3' },
    { name: '4x4 Cube', link: '#4x4' },
    { name: 'Pyraminx', link: '#pyraminx' },
    { name: 'Roux Method', link: '#megaminx' },
    { name: 'CFOP Method', link: '#skewb' },
    { name: 'Reduction Method', link: '#skewb' },
    { name: 'Cube Patterns', link: '#square1' }
];

const searchInput = document.getElementById('searchInput');
const searchIcon = document.getElementById('searchIcon');
const dropdown = document.getElementById('dropdown');
const cubeCards = document.getElementById('cubeCards');

// Show dropdown with filtered cubes
function showDropdown(filter = '') {
    dropdown.innerHTML = '';
    const filtered = cubes.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        dropdown.innerHTML = '<div class="dropdown-item" style="cursor: default; color: #999;">No results found</div>';
    } else {
        filtered.forEach(cube => {
            const div = document.createElement('div');
            div.className = 'dropdown-item';
            div.textContent = cube.name;
            div.addEventListener('click', () => {
                window.location.href = cube.link;
                dropdown.classList.remove('active');
                searchInput.value = cube.name;
                toggleIcon('x');
            });
            dropdown.appendChild(div);
        });
    }
    dropdown.classList.add('active');
}

// Toggle icon between search and x
function toggleIcon(state) {
    if (state === 'x') {
        searchIcon.classList.remove('bx-search');
        searchIcon.classList.add('bx-x');
    } else {
        searchIcon.classList.remove('bx-x');
        searchIcon.classList.add('bx-search');
    }
}

searchInput.addEventListener('focus', () => {
    showDropdown();
    toggleIcon('x');
});

searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    if (val) {
        showDropdown(val);
        toggleIcon('x');
    } else {
        showDropdown();
        toggleIcon('x');
    }
});

searchInput.addEventListener('blur', () => {
    // Delay hiding dropdown so click can register
    setTimeout(() => {
        dropdown.classList.remove('active');
        if (!searchInput.value) toggleIcon('search');
    }, 200);
});

searchIcon.addEventListener('click', () => {
    if (searchIcon.classList.contains('bx-x')) {
        searchInput.value = '';
        searchInput.focus();
        showDropdown();
        toggleIcon('x');
    } else {
        searchInput.focus();
        showDropdown();
        toggleIcon('x');
    }
});

// Clicking cube cards navigates to their links
cubeCards.querySelectorAll('.cube-card').forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = card.getAttribute('data-link');
    });
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
