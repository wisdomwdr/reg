window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('main').classList.remove('hidden');
  }, 2000);
};

function openForm(type) {
  const formWindow = window.open('', '_blank', 'width=360,height=680,scrollbars=yes');
  let html = '';

  if (type === 'cre') {
    html = `
      <html><head><title>CRE Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css">
      </head><body>
      <form>
        <img src="wisdomwandoor.png" alt="Logo" class="form-logo">
        <h2>CRE Registration</h2>
        <input type="text" placeholder="Name" required>
        <input type="number" placeholder="Age" required>
        <select required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input type="text" placeholder="Phone Number" required>
        <input type="text" placeholder="Place" required>
        <input type="text" placeholder="Class" required>
        <input type="text" placeholder="School / College" required>
        <label>Choose CRE Center</label>
        <select required>
          <option value="">Select Center</option>
          <option>Vaniyambalam</option>
          <option>Thodikappulam</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      </body></html>
    `;
  } else if (type === 'summer') {
    html = `
      <html><head><title>Summerise Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css">
      </head><body>
      <form>
        <img src="wisdomwandoor.png" alt="Logo" class="form-logo">
        <h2>Summerise Moral School</h2>
        <input type="text" placeholder="Name" required>
        <input type="text" placeholder="Phone Number" required>
        <input type="number" placeholder="Age" required>
        <select required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input type="text" placeholder="Place" required>
        <input type="text" placeholder="Class" required>
        <input type="text" placeholder="School" required>
        <button type="submit">Submit</button>
      </form>
      </body></html>
    `;
  }

  formWindow.document.open();
  formWindow.document.write(html);
  formWindow.document.close();
}
