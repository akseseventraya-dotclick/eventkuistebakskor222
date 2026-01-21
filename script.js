const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydWwnW_wgVnlc2Qeup4WWZpQY7SZEkUP8o_yEw2R9ZF-jiG_TnSvqVPS-MM3q192w/exec";

let CURRENT_EVENT = null;

document.addEventListener("DOMContentLoaded", () => {
  loadEvent();
  document.getElementById("scoreForm").addEventListener("submit", submitForm);
});

function loadEvent() {
  fetch(SCRIPT_URL)
    .then(r => r.json())
    .then(d => {
      CURRENT_EVENT = d.event;
      document.querySelector(".subtitle").innerHTML =
        `${d.event.liga}<br>Pekan Ke-${d.event.pekan}`;

      document.querySelector(".match").innerHTML =
        `${d.event.home} <span class="vs">VS</span> ${d.event.away}`;

      renderResult(d.result);
    });
}

function submitForm(e) {
  e.preventDefault();
  const f = e.target;

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_member: f.idmember.value,
      nama_rek: f.namarek.value,
      norek: f.rekening.value,
      whatsapp: f.whatsapp.value,
      skor1: f.skor1.value,
      skor2: f.skor2.value
    })
  })
    .then(r => r.json())
    .then(res => {
      document.getElementById("msg").textContent =
        res.error ? "❌ " + res.error : "✅ Berhasil";
      loadEvent();
      f.reset();
    });
}

function renderResult(rows) {
  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";
  rows.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.id}</td>
        <td>${r.skor}</td>
        <td>${new Date(r.waktu).toLocaleString("id-ID",{timeZone:"Asia/Jakarta"})}</td>
      </tr>`;
  });
}
