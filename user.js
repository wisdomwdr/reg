// Splash timeout
window.onload = () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").style.display = "block";
    loadPrograms();
    loadAdMessage();
  }, 2000);
};

function loadAdMessage() {
  const ad = localStorage.getItem("adMessage") || "Register Now! CRE Open";
  document.getElementById("ad-message").innerText = ad;
}

function loadPrograms() {
  const programs = JSON.parse(localStorage.getItem("programs")) || [{name: "CRE", locked: false}];
  const container = document.getElementById("program-buttons");
  container.innerHTML = "";

  programs.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "program-btn";
    btn.innerText = p.name;
    btn.disabled = p.locked;
    btn.onclick = () => showForm(p.name);
    container.appendChild(btn);
  });
}

function showForm(programName) {
  const formHTML = localStorage.getItem(`form_${programName}`) || defaultForm();
  document.getElementById("form-container").innerHTML = `
    <h3>${programName} Registration</h3>
    <form onsubmit="saveData(event, '${programName}')">
      ${formHTML}
      <button type="submit">Submit</button>
    </form>
  `;
}

function saveData(e, programName) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    age: form.age.value,
    gender: form.gender.value,
    place: form.place.value,
    class: form.class.value,
    school: form.school.value,
    center: form.center.value
  };

  const key = `data_${programName}`;
  const all = JSON.parse(localStorage.getItem(key)) || [];
  all.push(data);
  localStorage.setItem(key, JSON.stringify(all));

  alert("Registration successful!");
  form.reset();
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
