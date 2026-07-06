"use strict";

const $ = (selector) => document.querySelector(selector);
const form = $("#builderForm");
const controls = {
  teacherName: $("#teacherName"), teacherType: $("#teacherType"), nametagName: $("#nametagName"),
  uppercaseName: $("#uppercaseName"), hijabColor: $("#hijabColor"), hairStyle: $("#hairStyle"),
  blazerColor: $("#blazerColor"), studioBackground: $("#studioBackground"), imageStyle: $("#imageStyle"),
  pose: $("#pose"), removeGlassesReflection: $("#removeGlassesReflection")
};

const sliderConfig = [
  ["slim", "Slim muka dan badan", 0, 25, 10, "0% kekal asal, 10% sangat natural, 15% sederhana, 20% kemas tetapi masih realistik."],
  ["brightness", "Kecerahan", 0, 20, 10, "5% sedikit cerah, 10% seimbang, 15% studio look."],
  ["glow", "Glow wajah", 0, 20, 8, "Tambah tona wajah sihat dan berseri tanpa over-smooth."],
  ["sharpness", "Sharpness", 0, 30, 20, "Tajamkan mata, wajah, blazer dan tekstur fabrik."],
  ["makeup", "Makeup natural", 0, 15, 8, "Solekan ringan no-makeup makeup look."],
  ["formality", "Formality level", 50, 100, 90, "Semakin tinggi, semakin rasmi dan korporat."]
];

$("#sliders").innerHTML = sliderConfig.map(([id, label, min, max, value, help]) => `
  <label class="slider-item" for="${id}">
    <span class="slider-head"><span>${label}</span><output class="slider-value" id="${id}Value">${value}%</output></span>
    <input type="range" id="${id}" min="${min}" max="${max}" value="${value}">
    <small>${help}</small>
  </label>`).join("");

const sliders = Object.fromEntries(sliderConfig.map(([id]) => [id, $(`#${id}`)]));
const presets = {
  school:  { slim: 10, brightness: 10, glow: 8, sharpness: 20, makeup: 8, formality: 90, background: "Putih Studio Bersih", blazer: "Navy", style: "Rasmi Sekolah" },
  premium: { slim: 15, brightness: 12, glow: 10, sharpness: 25, makeup: 10, formality: 100, background: "Kelabu Studio Neutral", blazer: "Dark Grey", style: "Korporat Premium" },
  natural: { slim: 5, brightness: 5, glow: 5, sharpness: 15, makeup: 5, formality: 80, background: "Putih Studio Bersih", blazer: "Navy", style: "Natural Kemas" },
  clear:   { slim: 10, brightness: 12, glow: 8, sharpness: 30, makeup: 8, formality: 95, background: "Putih Studio Bersih", blazer: "Navy", style: "Rasmi Sekolah" }
};

let nameWasEdited = false;
let imageUrl = "";

function updateConditionalFields() {
  const isHijab = controls.teacherType.value === "hijab";
  $("#hijabColorField").hidden = !isHijab;
  $("#hairStyleField").hidden = isHijab;
}

function teacherText() {
  if (controls.teacherType.value === "hijab") {
    return `Gunakan tudung warna ${controls.hijabColor.value} yang formal dan profesional. Pastikan tudung kemas, sederhana, tidak terlalu besar, menutup rambut sepenuhnya dan sesuai untuk potret rasmi sekolah.`;
  }
  if (controls.teacherType.value === "female") {
    return `Kemaskan rambut secara profesional dan sederhana dengan gaya “${controls.hairStyle.value}”. Pastikan gaya rambut kekal sopan, formal dan sesuai untuk potret rasmi sekolah.`;
  }
  return `Kemaskan rambut dan penampilan secara profesional dengan gaya “${controls.hairStyle.value}”. Pastikan gaya keseluruhan sopan, formal dan sesuai untuk potret rasmi sekolah.`;
}

function poseText() {
  const poses = {
    front: "Gunakan pose menghadap hadapan dengan bahu seimbang dan postur tegak.",
    left: "Gunakan pose badan sedikit menghadap ke kiri sambil wajah kekal jelas menghadap kamera.",
    right: "Gunakan pose badan sedikit menghadap ke kanan sambil wajah kekal jelas menghadap kamera.",
    arms: "Gunakan pose peluk tubuh yang profesional, yakin dan sopan, dengan tangan kelihatan natural serta postur tegak."
  };
  return poses[controls.pose.value];
}

function generatePrompt() {
  let nametag = controls.nametagName.value.trim() || controls.teacherName.value.trim() || "NAMA GURU";
  if (controls.uppercaseName.checked) nametag = nametag.toLocaleUpperCase("ms-MY");
  const style = controls.imageStyle.value;
  $("#finalPrompt").value = `Edit gambar guru yang dilampirkan menjadi potret studio rasmi sekolah bergaya ${style} yang kemas, elegan dan profesional.

WAJIB kekalkan wajah asal dan identiti sebenar guru tepat seperti gambar rujukan. Jangan ubah struktur atau geometri muka, bentuk dan jarak mata, kening, hidung, bibir, gigi, pipi, rahang, dagu, telinga, warna kulit, umur, tanda lahir atau ciri unik wajah. Jangan menggantikan wajah, mencipta wajah baharu, mencampurkan wajah dengan individu lain atau menjadikan guru kelihatan seperti orang lain. Kekalkan senyuman dan ekspresi asal. Semua kemasan mestilah minimum dan tidak menjejaskan pengecaman identiti. ${poseText()}

Jadikan gambar lebih clear, sharp, clean dan studio professional grade tanpa mengubah rupa wajah. Gunakan latar belakang ${controls.studioBackground.value} yang bersih dengan pencahayaan lembut seperti foto rasmi. Tingkatkan kecerahan sebanyak ${sliders.brightness.value}%, tambah tona wajah sihat dan berseri sebanyak ${sliders.glow.value}%, serta tajamkan butiran mata, wajah dan fabrik sebanyak ${sliders.sharpness.value}%. Elakkan beauty filter berlebihan, face reshaping, skin whitening, pertukaran tona kulit dan kesan wajah plastik.

Kemas dan sesuaikan blazer supaya nampak lebih fit, kurang bulky, elegan dan profesional. Gunakan blazer warna ${controls.blazerColor.value}. Kecilkan muka dan badan secara natural sekitar ${sliders.slim.value}% sahaja, tanpa mengubah identiti asal. Tambahkan solekan ringan gaya natural no-makeup makeup look sebanyak ${sliders.makeup.value}%.

${teacherText()}

${controls.removeGlassesReflection.checked ? "Jika guru memakai cermin mata, buang pantulan cahaya, silau dan glare pada kanta. Kekalkan bentuk bingkai serta rupa mata yang asli, jelas dan realistik." : "Jika guru memakai cermin mata, kekalkan keadaan cermin mata seperti dalam gambar asal."}

Pastikan keseluruhan gambar nampak seperti dirakam menggunakan lensa Sony G Master high precision, ultra HD, tajam, bersih dan premium.

Tambahkan nametag formal standard kakitangan kerajaan pada blazer: bahagian kiri nametag berlatar putih dengan Jata Negara Malaysia, bahagian kanan berlatar hitam dengan nama “${nametag}” dalam huruf putih besar, jelas dan kemas.

Tahap formaliti keseluruhan gambar ialah ${sliders.formality.value}%. Hasil akhir mestilah realistik, rasmi, elegan dan sesuai digunakan sebagai foto profil rasmi sekolah.`;
}

function updateAll() {
  updateConditionalFields();
  sliderConfig.forEach(([id]) => $(`#${id}Value`).textContent = `${sliders[id].value}%`);
  generatePrompt();
}

function setPhoto(file) {
  if (!file || !file.type.startsWith("image/")) return;
  if (imageUrl) URL.revokeObjectURL(imageUrl);
  imageUrl = URL.createObjectURL(file);
  $("#imagePreview").src = imageUrl;
  $("#previewBox").classList.add("has-image");
}

function removePhoto() {
  if (imageUrl) URL.revokeObjectURL(imageUrl);
  imageUrl = "";
  $("#photoInput").value = "";
  $("#imagePreview").removeAttribute("src");
  $("#previewBox").classList.remove("has-image");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

$("#photoInput").addEventListener("change", (event) => setPhoto(event.target.files[0]));
$("#removePhoto").addEventListener("click", removePhoto);
const dropZone = $("#dropZone");
["dragenter", "dragover"].forEach(type => dropZone.addEventListener(type, (event) => {
  event.preventDefault(); dropZone.classList.add("dragover");
}));
["dragleave", "drop"].forEach(type => dropZone.addEventListener(type, (event) => {
  event.preventDefault(); dropZone.classList.remove("dragover");
}));
dropZone.addEventListener("drop", (event) => setPhoto(event.dataTransfer.files[0]));

controls.teacherName.addEventListener("input", () => {
  if (!nameWasEdited) controls.nametagName.value = controls.teacherName.value;
  updateAll();
});
controls.nametagName.addEventListener("input", () => { nameWasEdited = true; updateAll(); });
form.addEventListener("input", (event) => {
  if (event.target !== controls.teacherName && event.target !== controls.nametagName) updateAll();
});
form.addEventListener("change", updateAll);

document.querySelectorAll("[data-preset]").forEach(button => button.addEventListener("click", () => {
  const preset = presets[button.dataset.preset];
  Object.keys(sliders).forEach(id => sliders[id].value = preset[id]);
  controls.studioBackground.value = preset.background;
  controls.blazerColor.value = preset.blazer;
  controls.imageStyle.value = preset.style;
  document.querySelectorAll("[data-preset]").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  updateAll();
}));

$("#copyPrompt").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("#finalPrompt").value);
  } catch {
    $("#finalPrompt").select();
    document.execCommand("copy");
  }
  showToast("Prompt berjaya disalin.");
});

$("#downloadPrompt").addEventListener("click", () => {
  const safeName = (controls.teacherName.value.trim() || "guru")
    .toLocaleLowerCase("ms-MY").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const blob = new Blob([$("#finalPrompt").value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `studio-guru-prompt-${safeName}.txt`;
  link.click();
  URL.revokeObjectURL(url);
});

$("#selectAll").addEventListener("click", () => {
  $("#finalPrompt").focus();
  $("#finalPrompt").select();
});

form.addEventListener("reset", () => window.setTimeout(() => {
  nameWasEdited = false;
  removePhoto();
  document.querySelectorAll("[data-preset]").forEach(item => item.classList.remove("active"));
  updateAll();
}, 0));

updateAll();
