const hospital = {
  name: "St Felicia Medical Specialists Hospital",
  address: "No 1 Maurison Close, Sars Road, Port-Harcourt, Rivers State, Nigeria.",
  phone: "089087",
  email: "stfeliciamedicalspecialisthospital@gmail.com",
  hours: "Open all day",
  specialist: "Obstetrician and Gynaecologist",
  services: "Obstetric and gynaecologic services."
};

const nav = document.getElementById("mainNav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();

const overlay = document.getElementById("assistantOverlay");
const chat = document.getElementById("chat");
const input = document.getElementById("chatInput");

function openAssistant(question = "") {
  overlay.classList.add("open");
  setTimeout(() => input.focus(), 100);
  if (question) {
    addMessage(question, "user");
    setTimeout(() => addMessage(answer(question), "bot"), 250);
  }
}
function closeAssistant(){ overlay.classList.remove("open"); }
document.getElementById("assistantFab").addEventListener("click", () => openAssistant());
document.getElementById("openAssistantHero").addEventListener("click", () => openAssistant());
document.getElementById("closeAssistant").addEventListener("click", closeAssistant);
overlay.addEventListener("click", e => { if(e.target === overlay) closeAssistant(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeAssistant(); });

function addMessage(text, type){
  const el = document.createElement("div");
  el.className = `bubble ${type}`;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

function normalize(s){ return s.toLowerCase().replace(/[^\w\s]/g," "); }

function answer(q){
  const s = normalize(q);
  if (/(emergency|bleeding heavily|severe pain|unconscious|difficulty breathing|not breathing|seizure)/.test(s)) {
    return "If someone has a serious or life-threatening emergency, please seek urgent emergency medical care immediately or contact your local emergency service. This website assistant cannot assess or treat emergencies.";
  }
  if (/(where|location|address|located|find)/.test(s)) {
    return `St Felicia Medical Specialists Hospital is at ${hospital.address}`;
  }
  if (/(phone|call|number|contact)/.test(s)) {
    return `The hospital phone number provided is ${hospital.phone}. You can also email ${hospital.email}.`;
  }
  if (/(email|mail)/.test(s)) {
    return `The hospital email is ${hospital.email}.`;
  }
  if (/(hour|open|close|time)/.test(s)) {
    return `The hospital's listed opening hours are: ${hospital.hours}. Please contact the hospital to confirm service availability at a particular time.`;
  }
  if (/(service|offer|provide|treat)/.test(s)) {
    return `The hospital's core service is ${hospital.services} The listed specialist is an ${hospital.specialist}.`;
  }
  if (/(obstetric|pregnan|antenatal|maternity|childbirth|postnatal)/.test(s)) {
    return "The hospital provides obstetric care. For pregnancy-specific questions, the appropriate next step is to contact the hospital and arrange a consultation with the obstetrician and gynaecologist.";
  }
  if (/(gynaec|gynec|reproductive|period|fibroid|fertility)/.test(s)) {
    return "The hospital provides gynaecologic services. A clinician should assess individual symptoms and determine the appropriate evaluation or treatment.";
  }
  if (/(appointment|book|booking|consult|visit|schedule)/.test(s)) {
    return "You can use the Appointment Request form on this page. It prepares an email in your device's email client; the hospital must then confirm the appointment.";
  }
  if (/(who|doctor|specialist)/.test(s)) {
    return `The listed specialist is an ${hospital.specialist}.`;
  }
  if (/(hello|hi|hey|good morning|good evening)/.test(s)) {
    return "Hello! I can help with general information about St Felicia Medical Specialists Hospital, including services, location, hours, contact details and appointment requests.";
  }
  return "I can help with hospital information such as services, location, opening hours, contact details and appointment requests. For a medical concern, please contact the hospital for professional assessment rather than relying on this assistant.";
}

document.getElementById("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  const q = input.value.trim();
  if(!q) return;
  addMessage(q, "user");
  input.value = "";
  setTimeout(() => addMessage(answer(q), "bot"), 250);
});

document.querySelectorAll("[data-question]").forEach(btn => {
  btn.addEventListener("click", () => openAssistant(btn.dataset.question));
});

document.getElementById("appointmentForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const reason = document.getElementById("reason").value;
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  const body = [
    "Appointment Request — St Felicia Medical Specialists Hospital",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Preferred date: ${date}`,
    `Reason: ${reason}`,
    `Message: ${message || "No additional message."}`,
    "",
    "Please note: this is a request, not a confirmed appointment."
  ].join("\n");

  const mailto = `mailto:${hospital.email}?subject=${encodeURIComponent("Appointment Request - " + name)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  status.textContent = "Your email app should open with the appointment request. Please send it to the hospital.";
});
