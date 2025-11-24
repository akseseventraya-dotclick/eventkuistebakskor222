document.getElementById("scoreForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const msg = document.getElementById("msg");

  const id = this.idmember.value;
  const skor1 = this.skor1.value;
  const skor2 = this.skor2.value;
  const waktu = new Date().toLocaleString("id-ID");

  const table = document.getElementById("resultTable").getElementsByTagName("tbody")[0];
  const row = table.insertRow(0);
  row.insertCell(0).textContent = id;
  row.insertCell(1).textContent = `${skor1} - ${skor2}`;
  row.insertCell(2).textContent = waktu;

  msg.textContent = "✅ Tebakan berhasil dikirim!";
  this.reset();
});
