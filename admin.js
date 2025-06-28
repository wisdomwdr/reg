function postAd() {
  const msg = document.getElementById("adMessage").value;
  const fileInput = document.getElementById("adMedia");
  const file = fileInput.files[0];
  let preview = document.getElementById("preview");
  preview.innerHTML = `<h4>${msg}</h4>`;
  if (file && file.type.startsWith("image")) {
    preview.innerHTML += `<img src="${URL.createObjectURL(file)}" width="200">`;
  } else if (file && file.type.startsWith("video")) {
    preview.innerHTML += `<video src="${URL.createObjectURL(file)}" controls width="250"></video>`;
  }
}

function applyForm() {
  const code = document.getElementById("formCode").value;
  document.getElementById("formContainer").innerHTML = code;
}

let lockState = {};
function toggleLock(id) {
  const form = document.getElementById(id + 'Form');
  if (!lockState[id]) {
    form.style.display = 'none';
    lockState[id] = true;
  } else {
    form.style.display = 'block';
    lockState[id] = false;
  }
}

const data = [
  { name: "Rahul", age: 14, phone: "98765" },
  { name: "Amina", age: 13, phone: "87654" }
];
function downloadExcel() {
  let csv = "Name,Age,Phone\n";
  data.forEach(item => {
    csv += `${item.name},${item.age},${item.phone}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "registration_data.csv";
  link.click();
}
