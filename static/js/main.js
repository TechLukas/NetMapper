// ===== DOM CACHE =====
const pingSweepForm = document.getElementById("ping_sweep_form");
const pingResults = document.getElementById("ping_results");
const submitButton = pingSweepForm.querySelector('input[type="submit"]');

// ===== EVENT BINDING =====
pingSweepForm.addEventListener("submit", handlePingSweepSubmit);

// ===== HANDLERS =====
async function handlePingSweepSubmit(event) {
  event.preventDefault();
  setLoadingState(true);

  try {
    const payload = getFormDataAsJSON(pingSweepForm);
    const data = await pingSweep(payload);

    validateArrayResponse(data);
    renderPingResults(data);
  } catch (err) {
    renderError(err.message);
  } finally {
    setLoadingState(false);
  }
}

async function handlePortScan(ip, portRange, parentLi) {
  try {
    const payload = {
      ip,
      port_range: portRange,
    };

    const data = await portScan(payload);

    validateArrayResponse(data);
    renderPortScan(data, parentLi);
  } catch (err) {
    console.error("Port scan failed:", err);
  }
}

// ===== API =====
async function pingSweep(payload) {
  const res = await fetch("/api/ping_sweep", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Ping sweep request failed");
  }

  return res.json();
}

async function portScan(payload) {
  const res = await fetch("/api/port_scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Port scan request failed");
  }

  return res.json();
}

// ===== RENDERING =====
function renderPingResults(results) {
  pingResults.innerHTML = "";

  results.forEach((item) => {
    pingResults.appendChild(createResultItem(item));
  });
}

function renderPortScan(results, parentLi) {
  const existing = parentLi.querySelector(".port-results");
  if (existing) existing.remove();

  const ul = document.createElement("ul");
  ul.classList.add("port-results");

  results.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = typeof item === "string" ? item : `Port ${item}: open`;

    ul.appendChild(li);
  });

  parentLi.appendChild(ul);
}

function createResultItem(item) {
  const li = document.createElement("li");
  li.classList.add("result-item");

  const ip = typeof item === "string" ? item : item.ip;
  const statusText =
    typeof item === "string" ? item : `${item.ip}: ${item.status}`;

  const controls = document.createElement("div");
  controls.classList.add("scan-controls");

  const portInput = document.createElement("input");
  portInput.type = "number";
  portInput.min = "1";
  portInput.value = "1024";
  portInput.classList.add("port-input");

  const scanButton = document.createElement("button");
  scanButton.classList.add("scan-btn");
  scanButton.textContent = "Scan ports!";

  scanButton.addEventListener("click", () => {
    handlePortScan(ip, portInput.value, li);
  });

  controls.append(portInput, scanButton);
  li.append(createResultText(statusText), controls);

  return li;
}

function createResultText(text) {
  const span = document.createElement("span");
  span.classList.add("result-text");
  span.textContent = text;
  return span;
}

function renderError(message) {
  pingResults.innerHTML = `<li style="color:red">Error: ${message}</li>`;
}

// ===== UI HELPERS =====
function setLoadingState(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.value = isLoading ? "Scanning..." : "Scan!";
}

// ===== UTILITIES =====
function getFormDataAsJSON(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function validateArrayResponse(data) {
  if (!Array.isArray(data)) {
    throw new Error("Invalid response from server");
  }
}
