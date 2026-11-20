(function () {
  const container = document.getElementById("groups");
  const groupTemplate = document.getElementById("group-template");
  const linkTemplate = document.getElementById("link-template");

  for (const group of window.RESOURCES || []) {
    const groupNode = groupTemplate.content.cloneNode(true);
    groupNode.querySelector(".group-title").textContent = group.title;
    const list = groupNode.querySelector(".links");

    for (const entry of group.links || []) {
      const { url, label } = typeof entry === "string" ? { url: entry } : entry;
      const linkNode = linkTemplate.content.cloneNode(true);
      linkNode.querySelector(".link").href = url;
      linkNode.querySelector(".link-text").textContent = label || url;

      // Site icon. If it can't load, the beige box behind it shows instead.
      const icon = linkNode.querySelector(".icon");
      try {
        const host = new URL(url).hostname;
        icon.src = "https://www.google.com/s2/favicons?sz=64&domain=" + encodeURIComponent(host);
      } catch (e) {
        icon.remove();
      }
      icon.addEventListener("error", () => icon.remove());
      list.appendChild(linkNode);
    }

    container.appendChild(groupNode);
  }
})();

// Falling leaves -------------------------------------------------------------
(function () {
  const field = document.getElementById("leaves");
  if (!field) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const COUNT = 9;
  // Greens and yellows taken from the painting.
  const COLORS = ["#8fa88a", "#a3b597", "#7f9a7c", "#c8c78c", "#b9c4a0", "#d8bd7a"];
  const rand = (min, max) => min + Math.random() * (max - min);

  const leafSvg = (color) =>
    '<svg viewBox="0 0 20 11" aria-hidden="true">' +
    '<path d="M0 5.5C4 0.5 12 -0.5 20 5.5C12 11.5 4 10.5 0 5.5Z" fill="' + color + '"/>' +
    '<path d="M1.5 5.5H18" stroke="rgba(70,70,70,0.28)" stroke-width="0.6" fill="none"/>' +
    "</svg>";

  for (let i = 0; i < COUNT; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";
    const fallTime = rand(18, 30);
    const style = leaf.style;
    style.setProperty("--x", rand(4, 92).toFixed(1) + "%");
    style.setProperty("--size", rand(0.9, 1.6).toFixed(2));
    style.setProperty("--alpha", rand(0.55, 0.85).toFixed(2));
    style.setProperty("--drift", rand(-3, 3).toFixed(1) + "em");
    style.setProperty("--spin", rand(18, 45).toFixed(0) + "deg");
    style.setProperty("--fall-time", fallTime.toFixed(1) + "s");
    // Negative delays start each leaf partway down, so the loop never looks empty.
    style.setProperty("--fall-delay", (-rand(0, fallTime)).toFixed(1) + "s");
    style.setProperty("--sway-time", rand(3.2, 5.6).toFixed(1) + "s");
    style.setProperty("--sway-delay", (-rand(0, 4)).toFixed(1) + "s");
    leaf.innerHTML = leafSvg(COLORS[i % COLORS.length]);
    field.appendChild(leaf);
  }

  const setDistance = () =>
    field.style.setProperty("--fall-distance", field.clientHeight + 40 + "px");
  setDistance();
  window.addEventListener("resize", setDistance);
})();
