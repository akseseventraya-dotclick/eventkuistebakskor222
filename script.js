const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby591jg_6s4k1-zhhFW7zwBNLjtg0SusMskOg_Pi1mL1L3orN-QsaDegKElG1xDMLo/exec";

let CURRENT_EVENT_ID = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scoreForm");
  const msg = document.getElementById("msg");

  /* =========================
     LOAD EVENT AKTIF
  ========================= */
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      const event = data.event;

      CURRENT_EVENT_ID = event.event_id;

      document.querySelector(".subtitle").innerHTML =
        `${event.liga}<br>Pekan Ke-${event.pekan}`;

      document.querySelector(".match").innerHTML = `
        <span>${event.home}</span>
        <span class="vs">VS</span>
        <span>${event.away}</span>
      `;

      loadResult();
    })
    .catch(() => {
      msg.textContent = "❌ Gagal load event";
    });

  /* =========================
     SUBMIT FORM
  ========================= */
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!CURRENT_EVENT_ID) {
      msg.textContent = "❌ Event belum siap";
      return;
    }

    const payload = {
      event_id: CURRENT_EVENT_ID,
      id_member: form.idmember.value,
      nama_rek: form.namarek.value,
      norek: form.rekening.value,
      whatsapp: form.whatsapp.value,
      skor1: form.skor1.value,
      skor2: form.skor2.value
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          msg.textContent = "❌ " + res.error;
          return;
        }

        msg.textContent = "✅ Tebakan berhasil dikirim";
        form.reset();
        loadResult();
      })
      .catch(() => {
        msg.textContent = "❌ Koneksi error";
      });
  });
});

/* =========================
   LOAD RESULT
========================= */
function loadResult() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#resultTable tbody");
      tbody.innerHTML = "";

      data.result.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.skor}</td>
          <td>${new Date(row.waktu).toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta"
          })}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}
