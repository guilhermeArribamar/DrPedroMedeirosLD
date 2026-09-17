const leadForm = document.getElementById("leadForm");
const feedback = document.getElementById("formFeedback");
const phone = document.getElementById("telefone");

phone.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  }
  event.target.value = value;
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("nome").value.trim();
  const rawPhone = phone.value.replace(/\D/g, "");

  if (rawPhone.length < 10) {
    feedback.textContent = "Confira o número de WhatsApp informado.";
    phone.focus();
    return;
  }

  const message = `Olá, gostaria de agendar uma avaliação com o Dr. Pedro Medeiros. Meu nome é ${name}.`;
  const whatsappNumber = "551150392258";

  feedback.textContent = "Abrindo o WhatsApp da equipe...";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

// Scroll reveal leve, sem biblioteca externa.
const revealItems = document.querySelectorAll(".symptom-card, .step, .location-card, .doctor-card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(14px)";
    item.style.transition = "opacity .5s ease, transform .5s ease";
    observer.observe(item);
  });
  document.head.insertAdjacentHTML("beforeend", `<style>.is-visible{opacity:1!important;transform:none!important}</style>`);
}
