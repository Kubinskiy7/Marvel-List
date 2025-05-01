const projectList = document.getElementById("projectList");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const modalData = document.getElementById("modalData");
const closeModal = document.getElementById("closeModal");
const themeToggle = document.getElementById("themeToggle");

// Load projects
fetch("projects.json")
  .then((res) => res.json())
  .then((data) => {
    data.projects.forEach((project, index) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.dataset.index = index;
      card.innerHTML = `<strong>${index + 1}. ${project.title}</strong><br><small>${project.date}</small>`;
      projectList.appendChild(card);
    });

    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
        const index = card.dataset.index;
        const p = data.projects[index];
        modalData.innerHTML = `
          <h2>${p.title}</h2>
          <p><strong>Дата:</strong> ${p.date}</p>
          <p><strong>Продолжительность:</strong> ${p.duration}</p>
          <p><strong>Режиссёр:</strong> ${p.director}</p>
          <p><strong>Озвучка:</strong> ${p.voice}</p>
          <p><strong>IMDb:</strong> ${p.imdb || "—"}</p>
          <p><strong>Кинопоиск:</strong> ${p.kp || "—"}</p>
        `;
        modal.style.display = "flex";
      });
    });
  });

// Search scroll
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".project-card");
  for (let card of cards) {
    const title = card.textContent.toLowerCase();
    if (title.includes(query)) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      break;
    }
  }
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
