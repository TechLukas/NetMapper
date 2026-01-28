const ping_sweep_form = document.getElementById("ping_sweep_form");
const pingResults = document.getElementById("ping_results");
const submitButton = ping_sweep_form.querySelector('input[type="submit"]');

ping_sweep_form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.value = "Scanning...";

  const formData = new FormData(ping_sweep_form);
  const jsonData = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/ping_sweep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid response from server");
    }

    pingResults.innerHTML = "";

    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent =
        typeof item === "string" ? item : `${item.ip}: ${item.status}`;
      pingResults.appendChild(li);
    });
  } catch (err) {
    pingResults.innerHTML = `<li style="color:red">Error: ${err.message}</li>`;
  } finally {
    submitButton.disabled = false;
    submitButton.value = "Scan!";
  }
});
