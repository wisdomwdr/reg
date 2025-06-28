function checkLogin() {
  const pass = document.getElementById("admin-pass").value;
  if (pass === "admin123") {
    document.getElementById("login").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    loadEverything();
  } else {
    alert("Wrong password");
  }
}

function loadEverything() {
  document.getElementById("adMessage").value = localStorage.getItem("adMessage") || "";
  updateLockList();
  updateProgramDropdown();
  updateCenters();
}

function saveAd() {
  const ad = document.getElementById("adMessage").value;
  localStorage.setItem("adMessage", ad);
  alert("Ad saved!");
}

function addProgram() {
  const name = document.getElementById("programName").value;
  const form = document.getElementById("formHTML").value || defaultForm();
  const programs = JSON.parse(localStorage.getItem("programs")) || [];

  const exists = programs.find(p => p.name === name);
  if (exists) {
    exists.locked = false;
  } else {
    programs.push({ name, locked: false });
  }

  localStorage.setItem(`form_${name}`, form);
  localStorage.setItem("programs", JSON.stringify(programs));
  updateLockList();
  updateProgramDropdown();
  alert("Program saved!");
}

function updateLockList() {
  const programs = JSON.parse(localStorage.getItem("programs")) || [];
  const list = document.getElementById("lockList");
  list.innerHTML = "";

  programs.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.innerText = p.locked ? "Unlock" : "Lock";
    btn.onclick = () => toggleLock(i);
    list.innerHTML += `${p.name} ${btn.outerHTML}<br>`;
  });
}

function toggleLock(index) {
  const programs = JSON.parse(localStorage.getItem("programs")) || [];
  programs[index].locked = !programs[index].locked;
  localStorage.setItem("programs", JSON.stringify(programs));
  updateLockList();
}

function addCenter() {
  const center = document.getElementById("creCenter").value;
  if (!center) return;
  const centers = JSON.parse(localStorage.getItem("creCenters")) || [];
  centers.push(center);
  localStorage.setItem("creCenters", JSON.stringify(centers));
  updateCenters();
}

function updateCenters() {
  const list = document.getElementById("centerList");
  const centers = JSON.parse(localStorage.getItem("creCenters")) || ["Vaniyambalam", "Thodikappulam"];
  list.innerHTML = centers.map(c => `<div>${c}</div>`).join("");
}

function updateProgramDropdown() {
  const select = document.getElementById("programSelect");
  const programs = JSON.parse(localStorage.getItem("programs")) || [];
  select.innerHTML = programs.map(p => `<option value="${p.name}">${p.name}</option>`).join("");
}

function downloadExcel() {
  const program = document.getElementById("programSelect").value;
  const data = JSON.parse(localStorage.getItem(`data_${program}`)) || [];

  if (data.length === 0) return alert("No data to export!");

  let csv = "Name,Phone,Age,Gender,Place,Class,School,Center\n";
  data.forEach(d => {
    csv += `${d.name},${d.phone},${d.age},${d.gender},${d.place},${d.class},${d.school},${d.center}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${program}_data.csv`;
  a.click();
}

function defaultForm() {
  return `
    <input name="name" type="text" placeholder="Name" required>
    <input name="phone" type="tel" placeholder="Phone Number" required>
    <input name="age" type="number" placeholder="Age" required>
    <select name="gender" required>
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
    </select>
    <input name="place" type="text" placeholder="Place" required>
    <input name="class" type="text" placeholder="Class" required>
    <input name="school" type="text" placeholder="School/College" required>
    <select name="center" required>
      <option value="">Choose CRE Center</option>
      <option>Vaniyambalam</option>
      <option>Thodikappulam</option>
    </select>
  `;
}
