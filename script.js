let zIndexCounter = 10;
function bringToFront(win) {
  win.style.zIndex = ++zIndexCounter;
}

function makeDraggable(popup, header) {
  let isDragging = false,
    startX = 0,
    startY = 0,
    origX = 0,
    origY = 0;

  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = popup.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    popup.style.position = "fixed";
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    popup.style.left = origX + dx + "px";
    popup.style.top = origY + dy + "px";
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
    document.body.style.userSelect = "";
  });
}

// Preloader Hider
window.addEventListener("DOMContentLoaded", function () {
  const preLoader = document.getElementById("pre-loader");
  if (preLoader) {
    setTimeout(() => {
      preLoader.classList.remove("opacity-100");
      preLoader.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => (preLoader.style.display = "none"), 300);
    }, 5000);
  }
});

// Popup Fullscreen/Partial Toggle
// document.getElementById("popup-min").addEventListener("click", function () {
//   const popup = document.getElementById("popup");
//   if (popup.dataset.state === "fullscreen") {
//     popup.classList.remove("w-full", "h-full", "inset-0");
//     popup.classList.add("w-[600px]", "h-[400px]");
//     popup.style.left = "calc(50% - 200px)";
//     popup.style.top = "calc(50% - 150px)";
//     popup.style.position = "fixed";
//     popup.dataset.state = "partial";
//   } else {
//     popup.classList.add("w-full", "h-full", "inset-0");
//     popup.classList.remove("w-[600px]", "h-[400px]");
//     popup.style.left = "";
//     popup.style.top = "";
//     popup.style.position = "absolute";
//     popup.dataset.state = "fullscreen";
//   }
// });

// Popup Open & Close
// const openWindow = document.querySelectorAll(".icon");
// openWindow.forEach((div) => {
//   div.addEventListener("click", function () {
//     const popup = document.getElementById("popup");
//     popup.classList.remove("hidden", "opacity-0", "scale-0");
//     setTimeout(() => {
//       popup.classList.add("opacity-100", "scale-100");
//     }, 10);
//   });
// });

// document.getElementById("popup-close").addEventListener("click", function () {
//   const popup = document.getElementById("popup");
//   popup.classList.remove("opacity-100", "scale-100");
//   popup.classList.add("opacity-0", "scale-95");
//   setTimeout(() => {
//     popup.classList.add("hidden");
//   }, 300);
// });

// Custom Right-Click Context Menu
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  document.getElementById("start-menu").classList.add("hidden");
  const menu = document.getElementById("context-menu");
  menu.classList.remove("hidden", "scale-0");
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
  setTimeout(() => {
    menu.classList.add("scale-100");
  }, 10);
});

document.addEventListener("click", function (e) {
  const contextMenu = document.getElementById("context-menu");
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.add("hidden", "scale-0");
    contextMenu.classList.remove("scale-100");
  }
});

// Hide context menu on resize or scroll
["resize", "scroll"].forEach((event) => {
  window.addEventListener(event, () => {
    const contextMenu = document.getElementById("context-menu");
    contextMenu.classList.add("hidden", "scale-95");
    contextMenu.classList.remove("scale-100");
  });
});

// Hide Start Menu if clicked outside
document.addEventListener("click", function (e) {
  const startMenu = document.getElementById("start-menu");
  const startButton = document.querySelector(".start-button");
  if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
    startMenu.classList.add("hidden");
  }
});

// Live Clock
function updateDateTime() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  document.getElementById("date-time").textContent = now.toLocaleString(
    undefined,
    options
  );
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Refresh Handler
const refreshDivs = document.querySelectorAll(".refresh");
refreshDivs.forEach((div) => {
  div.addEventListener("click", () => {
    location.reload();
  });
});

// Notification Register Button
document
  .querySelector(".register-button")
  .addEventListener("click", function () {
    createAppWindow("win-register", "Registrations", "register.html");

    const notification = document.getElementById("notification");
    notification.classList.add("hidden");
  });

// Notification Close Button
document.querySelector(".notif-close").addEventListener("click", function () {
  const notif = document.getElementById("notification");
  notif.classList.remove("opacity-100", "scale-100");
  notif.classList.add("opacity-0", "scale-95");
});

// Utility to load HTML into popup-content
function loadPopupContent(url, title) {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  const popupTitle = document.getElementById("popup-title");
  popupContent.innerHTML =
    '<div class="text-center my-8 text-white">Loading...</div>';
  popup.classList.remove("hidden", "opacity-0", "scale-0");
  setTimeout(() => {
    popup.classList.add("opacity-100", "scale-100");
  }, 10);
  popupTitle.textContent = title || "";

  // Create a taskbar item if not already present
  const taskbar = document.getElementById("taskbar-apps");
  const existingTaskItem = document.querySelector(`[data-task="${title}"]`);

  if (!existingTaskItem) {
    const taskItem = document.createElement("button");
    taskItem.innerText = title;
    taskItem.dataset.task = title;
    taskItem.className =
      "bg-gray-200 border mx-1 px-2 hover:bg-blue-700 hover:text-white font-mono text-sm";

    taskItem.onclick = () => {
      const popup = document.getElementById("popup");
      if (popup.classList.contains("hidden")) {
        // Show popup
        popup.classList.remove(
          "hidden",
          "opacity-0",
          "scale-0",
          "w-full",
          "h-full",
          "inset-0"
        );
        popup.classList.add("w-[600px]", "h-[400px]");
        popup.style.left = "calc(50% - 300px)";
        popup.style.top = "calc(50% - 200px)";
        popup.style.position = "fixed";
        popup.dataset.state = "partial";

        // Animate appearance
        setTimeout(() => {
          popup.classList.add("opacity-100", "scale-100");
        }, 10);
      } else {
        popup.classList.remove("opacity-100", "scale-100");
        popup.classList.add("opacity-0", "scale-95");
        setTimeout(() => popup.classList.add("hidden"), 300);
      }
    };

    taskbar.appendChild(taskItem);
  }

  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      popupContent.innerHTML = html;
    })
    .catch(() => {
      popupContent.innerHTML =
        '<div class="text-red-500 p-4">Failed to load content.</div>';
    });
}

// Map icons to pages and titles
const iconMap = [
  {
    selector: 'img[alt="About"]',
    url: "about.html",
    title: "About MLSC",
    id: "win-about",
  },
  {
    selector: 'img[alt="Registrations"]',
    url: "register.html",
    title: "Registrations",
    id: "win-register",
  },
  {
    selector: 'img[alt="Users"]',
    url: "team.html",
    title: "Meet the Team",
    id: "win-team",
  },
  {
    selector: 'img[alt="Timeline"]',
    url: "timeline.html",
    title: "Sacred Timeline",
    id: "win-timeline",
  },
  {
    selector: 'img[alt="Globe"]',
    url: "lore.html",
    title: "The Lore",
    id: "win-lore",
  },
];

iconMap.forEach(({ selector, url, title, id }) => {
  const el = document.querySelector(selector);
  if (el) {
    el.parentElement.addEventListener("click", () => {
      createAppWindow(id, title, url);
    });
  }
});

// Popup close button (with animation)
document.getElementById("popup-close").onclick = function () {
  const popup = document.getElementById("popup");
  popup.classList.remove("opacity-100", "scale-100");
  popup.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    popup.classList.add("hidden");

    // Remove taskbar item
    const title = document.getElementById("popup-title").textContent;
    const taskItem = document.querySelector(`[data-task="${title}"]`);
    if (taskItem) taskItem.remove();
  }, 300);
};

// Dragging popup (yet to smoothen out)
(function () {
  const popup = document.getElementById("popup");
  const header = document.getElementById("popup-header");
  let isDragging = false,
    startX = 0,
    startY = 0,
    origX = 0,
    origY = 0;
  let lastX = 0,
    lastY = 0,
    animating = false;

  function animate() {
    if (!isDragging) {
      animating = false;
      return;
    }
    popup.style.left = lastX + "px";
    popup.style.top = lastY + "px";
    popup.style.right = "auto";
    popup.style.bottom = "auto";
    popup.style.position = "fixed";
    requestAnimationFrame(animate);
  }

  header.addEventListener("mousedown", function (e) {
    if (popup.classList.contains("hidden")) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = popup.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    document.body.style.userSelect = "none";
    lastX = origX;
    lastY = origY;
    if (!animating) {
      animating = true;
      requestAnimationFrame(animate);
    }
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    lastX = origX + dx;
    lastY = origY + dy;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
    document.body.style.userSelect = "";
  });
})();

function createAppWindow(id, title, url) {
  // 1. Check if window already exists
  let existing = document.getElementById(id);
  if (existing) {
    if (existing.classList.contains("hidden")) {
      existing.classList.remove("hidden");
    }
    bringToFront(existing);
    return;
  }

  // 2. Create window container
  const popup = document.createElement("div");
  popup.id = id;
  popup.className =
    "popup fixed bg-slate-600 border-2 border-slate-100 transition-all duration-300 scale-95 opacity-0 w-[600px] h-[400px]";
  popup.dataset.state = "partial";
  popup.style.left = "calc(50% - 300px)";
  popup.style.top = "calc(50% - 200px)";
  popup.style.zIndex = ++zIndexCounter;

  // 3. Window header
  const header = document.createElement("div");
  header.className =
    "header flex justify-between items-center px-1 py-1 bg-slate-100 cursor-move select-none";
  header.innerHTML = `
    <div class="ml-2 text-black font-semibold">${title}</div>
    <div class="flex gap-1">
      <button title="Toggle Size" class="minimize-btn w-6 h-6 bg-slate-400 hover:bg-slate-700 text-sm font-bold border">▭</button>
      <button title="Close" class="close-btn w-6 h-6 bg-slate-400 hover:bg-slate-700 text-sm font-bold border">X</button>
    </div>
  `;

  // 4. Window content
  const content = document.createElement("div");
  content.className =
    "w-full h-[calc(100%-2.5rem)] overflow-auto text-white p-2";
  content.innerHTML = `<div class="text-center mt-16">Loading...</div>`;
  fetch(url)
    .then((res) => res.text())
    .then((html) => (content.innerHTML = html))
    .catch(
      () =>
        (content.innerHTML =
          "<div class='text-red-400'>Failed to load content.</div>")
    );

  // 5. Assemble popup
  popup.appendChild(header);
  popup.appendChild(content);
  document.body.appendChild(popup);

  // 6. Animate in
  setTimeout(() => {
    popup.classList.add("opacity-100", "scale-100");
  }, 10);

  // 7. Add to taskbar
  const taskbar = document.getElementById("taskbar-apps");
  const taskBtn = document.createElement("button");
  taskBtn.textContent = title;
  taskBtn.className =
    "bg-gray-300 text-black px-2 py-1 rounded-sm text-xs hover:bg-gray-400 border border-gray-400";
  taskBtn.onclick = () => {
    if (popup.classList.contains("hidden")) {
      popup.classList.remove("hidden");
      bringToFront(popup);
    } else {
      popup.classList.add("hidden");
    }
  };
  taskbar.appendChild(taskBtn);

  // 8. Bring to front on click
  popup.addEventListener("mousedown", () => bringToFront(popup));

  // 9. Close button
  header.querySelector(".close-btn").onclick = () => {
    popup.remove();
    taskBtn.remove();
  };

  // 10. Minimize/restore button
  header.querySelector(".minimize-btn").onclick = () => {
    if (popup.dataset.state === "fullscreen") {
      popup.style.left = "calc(50% - 300px)";
      popup.style.top = "calc(50% - 200px)";
      popup.style.width = "600px";
      popup.style.height = "400px";
      popup.dataset.state = "partial";
    } else {
      popup.style.left = "0";
      popup.style.top = "0";
      popup.style.width = "100vw";
      popup.style.height = "100vh";
      popup.dataset.state = "fullscreen";
    }
  };

  // 11. Make draggable
  makeDraggable(popup, header);
}
