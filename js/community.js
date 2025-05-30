let users = JSON.parse(localStorage.getItem("users")) || [];
let records = JSON.parse(localStorage.getItem("records")) || [];
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const uploadBtn = document.getElementById("uploadBtn");
const cubeType = document.getElementById("cubeType");
const recordInput = document.getElementById("recordInput");
const recordList = document.getElementById("recordList");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchIcon = document.getElementById("searchIcon");

function showPopup(id) {
    document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

function renderAvatars() {
    const avatarSelect = document.getElementById("avatarSelect");
    for (let i = 1; i <= 10; i++) {
        const img = document.createElement("img");
        img.src = `images/avatars/avatar${i}.png`;
        img.onclick = () => {
            document.querySelectorAll("#avatarSelect img").forEach(img => img.classList.remove("selected"));
            img.classList.add("selected");
        };
        avatarSelect.appendChild(img);
    }
}

function registerUser() {
    const name = document.getElementById("usernameInput").value.trim();
    const region = document.getElementById("regionInput").value;
    const selectedAvatar = document.querySelector("#avatarSelect img.selected");

    if (!name || !selectedAvatar) return;

    const user = {
        name,
        avatar: selectedAvatar.src,
        region,
    };

    loggedInUser = user;
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    closePopup("registerPopup");
    updateUI();
}

function updateUI() {
    if (loggedInUser) {
        registerBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        uploadBtn.disabled = false;
        renderLeaderboard();
    } else {
        registerBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        uploadBtn.disabled = true;
        recordList.innerHTML = "";
    }
}

function renderLeaderboard(filteredRecords = records) {
    const type = document.querySelector(".tabs button.active")?.dataset.cube || "2x2";
    const visibleRecords = filteredRecords.filter(r => r.cube === type);
    visibleRecords.sort((a, b) => a.record - b.record);

    let html = `
    <div class="record-entry" style="font-weight:bold;">
      <div>#</div>
      <div>Name</div>
      <div>Region</div>
      <div>Record</div>
      <div>Time</div>
      <div></div>
    </div>
  `;

    visibleRecords.forEach((rec, i) => {
        const canDelete = loggedInUser && rec.name === loggedInUser.name && rec.region === loggedInUser.region && rec.avatar === loggedInUser.avatar;
        html += `
      <div class="record-entry">
        <div>${i + 1}</div>
        <div><img src="${rec.avatar}" /> ${rec.name}</div>
        <div>${rec.region}</div>
        <div>${rec.record}s</div>
        <div>${rec.timestamp}</div>
        <div>
         ${canDelete ? `<i class="bx bx-trash delete-icon" onclick="promptDelete(${records.indexOf(rec)})"></i>` : ""}
        </div>
      </div>
    `;
    });

    recordList.innerHTML = html;
}

let deleteIndex = null;

function promptDelete(index) {
  deleteIndex = index;
  document.getElementById("deletePopup").style.display = "flex";
}

function closeDeletePopup() {
  document.getElementById("deletePopup").style.display = "none";
  deleteIndex = null;
}

document.getElementById("confirmDeleteBtn").onclick = function () {
  if (deleteIndex !== null) {
    const records = JSON.parse(localStorage.getItem("records") || "[]");
    records.splice(deleteIndex, 1);
    localStorage.setItem("records", JSON.stringify(records));
    updateLeaderboard();
    closeDeletePopup();
  }
};

function uploadFlow() {
    const record = parseFloat(recordInput.value);
    if (!loggedInUser || isNaN(record)) return;

    showPopup("realPopup");
}

function confirmRealRecord() {
    closePopup("realPopup");
    showPopup("proofPopup");
}

function finalizeUpload() {
    closePopup("proofPopup");
    const cube = cubeType.value;
    const record = parseFloat(recordInput.value);
    const file = document.getElementById("proofFile").files[0];
    const timestamp = new Date().toLocaleString();

    records.push({
        name: loggedInUser.name,
        avatar: loggedInUser.avatar,
        region: loggedInUser.region,
        cube,
        record,
        timestamp,
        proof: file ? file.name : null
    });

    localStorage.setItem("records", JSON.stringify(records));
    renderLeaderboard();
    recordInput.value = "";
    document.getElementById("proofFile").value = "";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    loggedInUser = null;
    updateUI();
    showPopup("registerPopup");
}

function filterByCube(type) {
    document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.tabs button[data-cube="${type}"]`).classList.add("active");
    renderLeaderboard();
}

function handleSearch() {
    const term = searchInput.value.toLowerCase();
    clearSearch.style.display = term ? "inline" : "none";
    searchIcon.style.display = term ? "none" : "inline";

    const filtered = records.filter(r => r.name.toLowerCase().includes(term));
    renderLeaderboard(filtered);
}

// Event Listeners
logoutBtn.onclick = logout;
uploadBtn.onclick = uploadFlow;
searchInput.oninput = handleSearch;
clearSearch.onclick = () => {
    searchInput.value = "";
    handleSearch();
};

document.querySelectorAll(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => filterByCube(btn.dataset.cube));
});

if (!loggedInUser) showPopup("registerPopup");
renderAvatars();
updateUI();


