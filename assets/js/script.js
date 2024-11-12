"use strict";

// Function to check if the screen is fullscreen or resized
function checkFullScreen() {
  const sidebar = document.querySelector(".sidebar");
  const fullScreenWidth = window.innerWidth;
  const isWideScreen = fullScreenWidth >= 1400;

  // Automatically close the sidebar on small screens by toggling the 'active' class
  if (!isWideScreen && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    sidebar.style.height = 'auto'; // Reset height for smaller screens
  } else if (isWideScreen && !sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
    sidebar.style.height = 'auto'; // Reset height for larger screens
  }

  // Update sidebar height for larger screens
  if (isWideScreen) {
    sidebar.style.minHeight = `${window.innerHeight}px`; // Set min-height to the height of the window
  } else {
    sidebar.style.minHeight = '0'; // Remove min-height on smaller screens
  }
}

// Add event listener for window resize
window.addEventListener("resize", checkFullScreen);

// Initial check when the page loads
checkFullScreen();

// Add event listener for window resize
window.addEventListener("resize", checkFullScreen);
const yourName = "Jericah Reign";

function updateTitle(event) {
  const buttonText = event.target.textContent; // Get the text of the clicked button
  document.title = `${yourName} | ${buttonText}`; // Update the page title with your name and button text

  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".navbar-link");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Add active class to the clicked button
  event.target.classList.add("active");
}

const navLinks = document.querySelectorAll("[data-nav-link]");
navLinks.forEach((link) => {
  link.addEventListener("click", updateTitle);
});

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

document
  .getElementById("locationButton")
  .addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const googleMapsUrl = `https://www.google.com/maps/place/Gravador+Apartments/@14.4135869,121.0487311,17z/data=!3m1!4b1!4m6!3m5!1s0x3397d16aff2a218b:0xc0d8ee8cb3993523!8m2!3d14.4135869!4d121.0487311!16s%2Fg%2F11p5j3xpm9!5m1!1e2?entry=ttu&g_ep=EgoyMDI0MTAyMC4wIKXMDSoASAFQAw%3D%3D`;
  window.open(googleMapsUrl, "_blank");
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.querySelectorAll("[data-nav-link]").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll("[data-page]").forEach((page) => {
      page.classList.remove("fadeIn");
    });
    setTimeout(() => {
      document
        .querySelector(`[data-page="${this.innerText.toLowerCase()}"]`)
        .classList.add("fadeIn");
    }, 200);
  });
});

// Add fadeIn animation to new page
document.querySelectorAll("[data-page]").forEach((page) => {
  page.classList.add("fadeIn");
});








