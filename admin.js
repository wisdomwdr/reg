// Advertisement
function postAd() {
  const msg = document.getElementById("adMessage").value;
  const file = document.getElementById("adMedia").files[0];
  let preview = document.getElementById("preview");
  preview.innerHTML = `<h4>${msg}</h4>`;
  if (file) {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image")) {
      preview.innerHTML += `<img src="\${url}" width="200">`;
    } else if (file.type.startsWith("video")) {
      preview.innerHTML += `<video src="\${url}" controls width="250"></video>`;
    }
  }
}

// Programs
function addProgram() {
  const val = document.getElementById("newProgram").value.trim();
  if (!val) return;
  let programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs.push(val);
  localStorage.setItem("programs", JSON.stringify(programs));
  renderPrograms();
}
function renderPrograms() {
  const list = document.getElementById("programList");
  const select = document.getElementById("lockSelect");
  list.innerHTML = "";
  select.innerHTML = "";
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
    const opt = document.createElement("option");
    opt.value = opt.textContent = p;
    select.appendChild(opt);
  });
}

// Centers
function addCenter() {
  const val = document.getElementById("newCenter").value.trim();
  if (!val) return;
  let centers = JSON.parse(localStorage.getItem("centers") || "[]");
  centers.push(val);
  localStorage.setItem("centers", JSON.stringify(centers));
  renderCenters();
}
function renderCenters() {
  const list = document.getElementById("centerList");
  list.innerHTML = "";
  const centers = JSON.parse(localStorage.getItem("centers") || "[]");
  centers.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    list.appendChild(li);
  });
}

// Form Save
function saveForm() {
  const code = document.getElementById("formCode").value;
  localStorage.setItem("formTemplate", code);
  alert("Form saved!");
}

// Lock/Unlock
function toggleProgramLock() {
  const prog = document.getElementById("lockSelect").value;
  let lock = JSON.parse(localStorage.getItem("lockedPrograms") || "{}");
  lock[prog] = !lock[prog];
  localStorage.setItem("lockedPrograms", JSON.stringify(lock));
  document.getElementById("lockStatus").innerText = lock[prog] ? "Locked" : "Unlocked";
}

// Excel export (dummy)
function downloadExcel() {
  let data = [
    { name: "Aliya", age: 15, phone: "99999", place: "Town" },
    { name: "Rahul", age: 14, phone: "88888", place: "City" }
  ];
  let csv = "Name,Age,Phone,Place\n";
  data.forEach(d => {
    csv += `${d.name},${d.age},${d.phone},${d.place}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "registrations.csv";
  a.click();
}

window.onload = function() {
  renderPrograms();
  renderCenters();
};
