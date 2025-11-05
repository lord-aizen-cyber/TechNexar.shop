// Handler upload bukti
document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let file = document.getElementById('buktiPembayaran').files[0];
  let buyer = document.getElementById('namaPembeli').value;
  if(!file) return;
  let reader = new FileReader();
  reader.onload = function(ev) {
    let img = ev.target.result;
    let history = JSON.parse(localStorage.getItem('buktiBayar') || "[]");
    let date = new Date().toLocaleString();
    history.unshift({buyer, img, date});
    localStorage.setItem('buktiBayar', JSON.stringify(history));
    document.getElementById('uploadStatus').innerHTML = '<span style="color:#24e372">Upload Sukses!</span>';
    displayHistory();
    document.querySelector('.after-payment').style.display = 'block';
    setTimeout(()=>{document.getElementById('uploadStatus').innerHTML="";}, 3200);
  };
  reader.readAsDataURL(file);
  this.reset();
});

// Tampil history bukti pembayaran legal
function displayHistory(){
  let el = document.getElementById('history-list');
  let history = JSON.parse(localStorage.getItem('buktiBayar') || "[]");
  if(!history.length){
    el.innerHTML = "<p>Belum ada bukti pembayaran.</p>";
    return;
  }
  el.innerHTML = "";
  history.forEach(h => {
    let d = `<div class="payment-proof">
      <img src="${h.img}" alt="Bukti Bayar">
      <div class="info">
        <span class="buyer">${h.buyer}</span>
        <span class="date">${h.date}</span>
      </div>
    </div>`;
    el.innerHTML += d;
  });
}
displayHistory();