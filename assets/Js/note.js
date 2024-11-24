document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("modal");
  const btnSubmit = document.getElementById("btnSubmit");
  const judulNote = document.getElementById("judulNote");
  const isiNote = document.getElementById("isiNote");
  const listItem = document.getElementById("listItem");
  const deleteSelectedBtn = document.getElementById("deleteSelected");
  const cancelSelectionBtn = document.getElementById("cancelSelection");
  const resetSelectionBtn = document.getElementById("resetSelection");
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const selectAllContainer = document.getElementById("selectAllContainer");
  const actionButtons = document.getElementById("actionButtons");

  let longPressTimer;

  // Fungsi untuk membuka modal
  openModal.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fungsi untuk menutup modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fungsi untuk membuat catatan baru
  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const judul = judulNote.value.trim();
    const isi = isiNote.value.trim();
    const date = new Date().toISOString().slice(0, 16).replace("T", " ");

    if (!judul && !isi) {
      alert("Judul dan Isi tidak boleh kosong");
      return;
    } else if (!judul ) {
      alert("Judul tidak boleh kosong");
      return;
    } else if (!isi ) {
      alert("Isi tidak boleh kosong");
      return;
    } else{
      alert("Form terisi");
      
    }

    const li = document.createElement("li");
    li.classList.add("list-items");

    li.innerHTML = `
      <input type="checkbox" class="checkbox" />
      <h1 class="judul">${judul}</h1>
      <p class="catat">${isi}</p>
      <span class="list-date">${date}</span>
    `;

    listItem.appendChild(li);

    // Reset input form
    judulNote.value = "";
    isiNote.value = "";

    // Tutup modal
    modal.style.display = "none";
  });

  // Fungsi tekan lama untuk masuk mode pemilihan
  listItem.addEventListener("mousedown", (event) => {
    const target = event.target.closest(".list-items");
    if (!target) return;

    longPressTimer = setTimeout(() => {
      enableSelectionMode();
    }, 1000); // 1 detik untuk mendeteksi tekan lama
  });

  listItem.addEventListener("mouseup", () => {
    clearTimeout(longPressTimer);
  });

  listItem.addEventListener("mouseleave", () => {
    clearTimeout(longPressTimer);
  });

  // Fungsi untuk mengaktifkan mode pemilihan
  function enableSelectionMode() {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.style.display = "flex";
    });

    selectAllContainer.style.display = "flex";
    actionButtons.style.display = "flex";
  }

  // Fungsi untuk keluar dari mode pemilihan
  cancelSelectionBtn.addEventListener("click", disableSelectionMode);

  function disableSelectionMode() {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.style.display = "none";
      checkbox.checked = false;
    });

    selectAllContainer.style.display = "none";
    actionButtons.style.display = "none";
    selectAllCheckbox.checked = false;
  }

  // Fungsi untuk "Pilih Semua"
  selectAllCheckbox.addEventListener("change", (e) => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  });

  // Fungsi untuk tombol Reset
  resetSelectionBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    selectAllCheckbox.checked = false;
  });

  // Fungsi untuk menghapus catatan yang dipilih
  deleteSelectedBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const li = checkbox.closest(".list-items");
        li.remove();
      }
    });

    disableSelectionMode();
  });
});
