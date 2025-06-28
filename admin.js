window.onload = () => {
  const password = prompt("Enter admin password:");
  if (password !== "1234") {
    alert("Access denied");
    window.close();
    return;
  }

  document.getElementById('admin-section').classList.remove('hidden');
  loadData();
};

function saveAd() {
  const ad = document.getElementById("adText").value;
  localStorage.setItem("ad", ad);
  alert("Ad updated!");
}

function addProgram() {
  const name = document.getElementById("newProgram").value;
  if (!name) return;
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs.push({ name, locked: false });
  localStorage.setItem("programs", JSON.stringify(programs));
  document.getElementById("newProgram").value = "";
  loadData();
}

function addCenter() {
  const name = document.getElementById("newCenter").value;
  if (!name) return;
  const centers = JSON.parse(localStorage.getItem("centers") || "[]");
  centers.push(name);
  localStorage.setItem("centers", JSON.stringify(centers));
  document.getElementById("newCenter").value = "";
  loadData();
}

function toggleLock(index) {
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs[index].locked = !programs[index].locked;
  localStorage.setItem("programs", JSON.stringify(programs));
  loadData();
}

function deleteProgram(index) {
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs.splice(index, 1);
  localStorage.setItem("programs", JSON.stringify(programs));
  loadData();
}

function deleteCenter(index) {
  const centers = JSON.parse(localStorage.getItem("centers") || "[]");
  centers.splice(index, 1);
  localStorage.setItem("centers", JSON.stringify(centers));
  loadData();
}

function loadData() {
  // Load Ad
  document.getElementById("adText").value = localStorage.getItem("ad") || "";

  // Programs
  const programList = document.getElementById("programList");
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programList.innerHTML = "";
  programs.forEach((prog, i) => {
    programList.innerHTML += `<li>
      ${prog.name} - <b>${prog.locked ? "🔒" : "✅"}</b>
      <span>
        <button onclick="toggleLock(${i})">Lock/Unlock</button>
        <button onclick="deleteProgram(${i})">❌</button>
      </span>
    </li>`;
  });

  // Centers
  const centerList = document.getElementById("centerList");
  const centers = JSON.parse(localStorage.getItem("centers") || "[]");
  centerList.innerHTML = "";
  centers.forEach((center, i) => {
    centerList.innerHTML += `<li>${center} <button onclick="deleteCenter(${i})">❌</button></li>`;
  });
}

function clearData() {
  if (confirm("Are you sure you want to reset all admin data?")) {
    localStorage.removeItem("programs");
    localStorage.removeItem("centers");
    localStorage.removeItem("ad");
    loadData();
  }
}
