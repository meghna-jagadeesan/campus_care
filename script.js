const STORAGE_KEY = "campuscare_requests_v1";

const roleSelect = document.getElementById("roleSelect");
const form = document.getElementById("requestForm");
const requestList = document.getElementById("requestList");
const emptyState = document.getElementById("emptyState");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");

let requests = loadRequests();
let toastTimer;

function loadRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveRequests() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function getStatusClass(status) {
  if (status === "Resolved") return "status-resolved";
  if (status === "In Progress") return "status-progress";
  return "status-open";
}

function getPriorityClass(priority) {
  return "priority-" + String(priority).toLowerCase().replace(/\s+/g, "-");
}

function updateStats() {
  document.getElementById("totalCount").textContent = requests.length;
  document.getElementById("openCount").textContent = requests.filter(r => r.status === "Open").length;
  document.getElementById("progressCount").textContent = requests.filter(r => r.status === "In Progress").length;
  document.getElementById("resolvedCount").textContent = requests.filter(r => r.status === "Resolved").length;
}

function updateRoleUI() {
  const role = roleSelect.value;
  document.getElementById("welcomeTitle").textContent = `Hello, ${role} 👋`;
  const createPanel = document.getElementById("createPanel");
  const hint = document.getElementById("roleHint");

  createPanel.style.display = role === "Maintenance Staff" ? "none" : "block";

  const hints = {
    "Student": "As a Student, you can submit a request and track its status.",
    "Faculty": "As Faculty, you can submit requests and monitor issues reported on campus.",
    "Maintenance Staff": "As Maintenance Staff, update request statuses as you work on them.",
    "Administrator": "As Administrator, you can manage request statuses and delete demo records."
  };
  hint.textContent = hints[role];

  renderRequests();
}

function renderRequests() {
  const role = roleSelect.value;
  const selectedStatus = statusFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const visibleRequests = [...requests]
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter(request => selectedStatus === "All" || request.status === selectedStatus)
    .filter(request => {
      const searchable = [request.id, request.requester, request.department, request.category,
        request.location, request.title, request.description, request.status].join(" ").toLowerCase();
      return searchable.includes(query);
    });

  requestList.innerHTML = visibleRequests.map(request => {
    const canManage = role === "Maintenance Staff" || role === "Administrator";
    const canDelete = role === "Administrator";
    const date = new Date(request.createdAt).toLocaleString([], {
      dateStyle: "medium", timeStyle: "short"
    });
    const management = canManage ? `
      <div class="card-actions">
        <label for="status-${escapeHTML(request.id)}" class="sr-only">Update status</label>
        <select id="status-${escapeHTML(request.id)}" data-action="status" data-id="${escapeHTML(request.id)}">
          ${["Open", "In Progress", "Resolved"].map(status =>
            `<option ${request.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
        ${canDelete ? `<button class="small-btn delete" data-action="delete" data-id="${escapeHTML(request.id)}">Delete record</button>` : ""}
      </div>` : "";

    return `
      <article class="request-card">
        <div class="card-top">
          <div>
            <p class="ticket-id">${escapeHTML(request.id)} · ${escapeHTML(date)}</p>
            <h3>${escapeHTML(request.title)}</h3>
            <div class="meta">${escapeHTML(request.category)} · ${escapeHTML(request.department)} · ${escapeHTML(request.location)}</div>
          </div>
          <span class="pill ${getStatusClass(request.status)}">${escapeHTML(request.status)}</span>
        </div>
        <p class="description">${escapeHTML(request.description)}</p>
        <div class="meta">Reported by <strong>${escapeHTML(request.requester)}</strong>${request.contact ? " · Contact: " + escapeHTML(request.contact) : ""}</div>
        <div class="pills">
          <span class="pill ${getPriorityClass(request.priority)}">${escapeHTML(request.priority)} priority</span>
        </div>
        ${management}
      </article>`;
  }).join("");

  emptyState.style.display = visibleRequests.length ? "none" : "block";
  updateStats();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const request = {
    id: "CC-" + Date.now().toString().slice(-7),
    requester: data.get("requester").trim(),
    department: data.get("department").trim(),
    category: data.get("category"),
    location: data.get("location").trim(),
    title: data.get("title").trim(),
    description: data.get("description").trim(),
    priority: data.get("priority"),
    contact: data.get("contact").trim(),
    status: "Open",
    createdAt: Date.now()
  };

  if (!request.requester || !request.department || !request.category ||
      !request.location || !request.title || !request.description) {
    showToast("Please complete all required fields.");
    return;
  }

  requests.push(request);
  saveRequests();
  form.reset();
  statusFilter.value = "All";
  searchInput.value = "";
  renderRequests();
  showToast(`Request ${request.id} submitted successfully.`);
});

requestList.addEventListener("change", event => {
  const control = event.target.closest('[data-action="status"]');
  if (!control) return;
  if (!["Maintenance Staff", "Administrator"].includes(roleSelect.value)) return;

  const request = requests.find(item => item.id === control.dataset.id);
  if (!request) return;
  request.status = control.value;
  request.updatedAt = Date.now();
  saveRequests();
  renderRequests();
  showToast(`Status updated to "${request.status}".`);
});

requestList.addEventListener("click", event => {
  const button = event.target.closest('[data-action="delete"]');
  if (!button || roleSelect.value !== "Administrator") return;
  const request = requests.find(item => item.id === button.dataset.id);
  if (!request) return;

  if (confirm(`Delete request ${request.id}? This cannot be undone.`)) {
    requests = requests.filter(item => item.id !== request.id);
    saveRequests();
    renderRequests();
    showToast("Request deleted.");
  }
});

roleSelect.addEventListener("change", updateRoleUI);
statusFilter.addEventListener("change", renderRequests);
searchInput.addEventListener("input", renderRequests);

updateRoleUI();
