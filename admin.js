function addProgram() {
  const name = document.getElementById("programName").value.trim();
  if (!name) return;
  let programs = JSON.parse(localStorage.getItem("programs") || "[]");
  if (!programs.includes(name)) programs.push(name);
  localStorage.setItem("programs", JSON.stringify(programs));
  renderPrograms();
}

function renderPrograms() {
  const list = document.getElementById("programList");
  const select = document.getElementById("programSelect");
  const lockSelect = document.getElementById("lockSelect");
  list.innerHTML = "";
  select.innerHTML = "";
  lockSelect.innerHTML = "";
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs.forEach(p => {
    list.innerHTML += `<li>${p}</li>`;
    select.innerHTML += `<option value="${p}">${p}</option>`;
    lockSelect.innerHTML += `<option value="${p}">${p}</option>`;
  });
}

function saveForm() {
  const prog = document.getElementById("programSelect").value;
  const code = document.getElementById("formEditor").value;
  let forms = JSON.parse(localStorage.getItem("forms") || "{}");
  forms[prog] = code;
  localStorage.setItem("forms", JSON.stringify(forms));
  alert("Form saved!");
}

function loadForm() {
  const prog = document.getElementById("programSelect").value;
  let forms = JSON.parse(localStorage.getItem("forms") || "{}");
  document.getElementById("formEditor").value = forms[prog] || "";
}

function saveAd() {
  const msg = document.getElementById("adText").value;
  localStorage.setItem("adText", msg);
  alert("Ad saved!");
}

function toggleLock() {
  const prog = document.getElementById("lockSelect").value;
  let lock = JSON.parse(localStorage.getItem("locked") || "{}");
  lock[prog] = !lock[prog];
  localStorage.setItem("locked", JSON.stringify(lock));
  showLockStatus();
}

function showLockStatus() {
  const prog = document.getElementById("lockSelect").value;
  let lock = JSON.parse(localStorage.getItem("locked") || "{}");
  document.getElementById("lockStatus").innerText = lock[prog] ? "Locked" : "Unlocked";
}

window.onload = renderPrograms;
