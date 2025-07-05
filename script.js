// Preloader Hider
window.addEventListener('DOMContentLoaded', function () {
  const preLoader = document.getElementById('pre-loader');
  if (preLoader) {
    setTimeout(() => {
      preLoader.classList.remove('opacity-100');
      preLoader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => preLoader.style.display = 'none', 300);
    }, 5000);
  }
});

// Popup Fullscreen/Partial Toggle
document.getElementById("popup-min").addEventListener("click", function () {
  const popup = document.getElementById("popup");
  if (popup.dataset.state === "fullscreen") {
    popup.classList.remove("w-full", "h-full", "inset-0");
    popup.classList.add("w-[600px]", "h-[400px]");
    popup.style.left = "calc(50% - 200px)";
    popup.style.top = "calc(50% - 150px)";
    popup.style.position = "fixed";
    popup.dataset.state = "partial";
  } else {
    popup.classList.add("w-full", "h-full", "inset-0");
    popup.classList.remove("w-[600px]", "h-[400px]");
    popup.style.left = "";
    popup.style.top = "";
    popup.style.position = "absolute";
    popup.dataset.state = "fullscreen";
  }
});

// Popup Open & Close
const openWindow = document.querySelectorAll(".icon");
openWindow.forEach(div => {
  div.addEventListener("click", function () {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden", "opacity-0", "scale-0");
    setTimeout(() => {
      popup.classList.add("opacity-100", "scale-100");
    }, 10);
  });
});

document.getElementById("popup-close").addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.classList.remove("opacity-100", "scale-100");
  popup.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    popup.classList.add("hidden");
  }, 300);
});

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
["resize", "scroll"].forEach(event => {
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
  document.getElementById("date-time").textContent = now.toLocaleString(undefined, options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Refresh Handler
const refreshDivs = document.querySelectorAll(".refresh");
refreshDivs.forEach(div => {
  div.addEventListener('click', () => {
    location.reload();
  });
});

// Notification Register Button
document.querySelector(".register-button").addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden", "opacity-0", "scale-0");
  setTimeout(() => {
    popup.classList.add("opacity-100", "scale-100");
  }, 10);

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
          const popup = document.getElementById('popup');
          const popupContent = document.getElementById('popup-content');
          const popupTitle = document.getElementById('popup-title');
          popupContent.innerHTML = '<div class="text-center my-8 text-white">Loading...</div>';
          popup.classList.remove('hidden', 'opacity-0', 'scale-0');
          setTimeout(() => {
            popup.classList.add('opacity-100', 'scale-100');
          }, 10);
          popupTitle.textContent = title || '';
          fetch(url)
            .then(res => res.text())
            .then(html => {
              popupContent.innerHTML = html;
            })
            .catch(() => {
              popupContent.innerHTML = '<div class="text-red-500 p-4">Failed to load content.</div>';
            });
        }

        // Map icons to pages and titles
        const iconMap = [
          { selector: 'img[alt="About"]', url: 'about.html', title: 'About MLSC' },
          { selector: 'img[alt="Registrations"]', url: 'register.html', title: 'Registrations', fit: true },
          { selector: 'img[alt="Users"]', url: 'team.html', title: 'Meet the Team' },
          { selector: 'img[alt="Timeline"]', url: 'timeline.html', title: 'Sacred Timeline' },
          { selector: 'img[alt="Globe"]', url: 'lore.html', title: 'The Lore' }
        ];

        iconMap.forEach(item => {
          const el = document.querySelector(item.selector);
          if (el) {
            el.parentElement.addEventListener('click', () => {
              loadPopupContent(item.url, item.title);
            });
          }
        });

        // Popup close button (with animation)
        document.getElementById('popup-close').onclick = function() {
          const popup = document.getElementById('popup');
          popup.classList.remove('opacity-100', 'scale-100');
          popup.classList.add('opacity-0', 'scale-95');
          setTimeout(() => {
            popup.classList.add('hidden');
          }, 300);
        };


// Dragging popup (yet to smoothen out)
(function() {
        const popup = document.getElementById('popup');
        const header = document.getElementById('popup-header');
        let isDragging = false, startX = 0, startY = 0, origX = 0, origY = 0;
        let lastX = 0, lastY = 0, animating = false;

        function animate() {
          if (!isDragging) {
        animating = false;
        return;
          }
          popup.style.left = lastX + 'px';
          popup.style.top = lastY + 'px';
          popup.style.right = 'auto';
          popup.style.bottom = 'auto';
          popup.style.position = 'fixed';
          requestAnimationFrame(animate);
        }

        header.addEventListener('mousedown', function(e) {
          if (popup.classList.contains('hidden')) return;
          isDragging = true;
          startX = e.clientX;
          startY = e.clientY;
          const rect = popup.getBoundingClientRect();
          origX = rect.left;
          origY = rect.top;
          document.body.style.userSelect = 'none';
          lastX = origX;
          lastY = origY;
          if (!animating) {
        animating = true;
        requestAnimationFrame(animate);
          }
        });

        document.addEventListener('mousemove', function(e) {
          if (!isDragging) return;
          let dx = e.clientX - startX;
          let dy = e.clientY - startY;
          lastX = origX + dx;
          lastY = origY + dy;
        });

        document.addEventListener('mouseup', function() {
          isDragging = false;
          document.body.style.userSelect = '';
        });
      })();