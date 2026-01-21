const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQmgdPM2XKOpgdM-tIySEcOuAXZqMUXrOv41VfjjQo0bzIIeGrAFwV3F2ChF2dIaY/exec";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("scoreForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

  const data = {
    event: EVENT_ID,
    id_member: idmember.value,
    nama_rek: namarek.value,
    norek: norek.value,
    whatsapp: whatsapp.value,
    skor1: skor1.value,
    skor2: skor2.value
  };


    fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      msg.textContent = "✅ Tebakan berhasil dikirim!";
      loadResult();
      form.reset();
    })
    .catch(() => {
      msg.textContent = "❌ Koneksi error";
    });
  });

  loadResult();
});

function loadResult() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      const table = document
        .getElementById("resultTable")
        .getElementsByTagName("tbody")[0];

      table.innerHTML = "";

      data.forEach(row => {
        const tr = table.insertRow();
        tr.insertCell(0).textContent = row.id;
        tr.insertCell(1).textContent = `${row.skor1} - ${row.skor2}`;
        tr.insertCell(2).textContent = row.waktu;
      });
    });
}
