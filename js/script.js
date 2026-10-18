"use strict";

/* =====================================
   ALERIC MEDICAL - COMPLETE JAVASCRIPT
   ===================================== */


/* 1. MOBILE NAVIGATION MENU */

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    });
  });

  // Close the mobile menu when switching to a wide screen.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    }
  });
}


/* 2. AUTOMATIC FOOTER YEAR */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* 3. DATE VALIDATION */

const dateInput = document.getElementById("date");

function getLocalDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

if (dateInput) {
  dateInput.min = getLocalDate();
}


/* 4. DOCTOR PROFILE APPOINTMENT BUTTONS */

const doctorLinks = document.querySelectorAll(".doctor-link");
const departmentSelect = document.getElementById("department");

doctorLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const selectedDoctorDepartment = link.dataset.doctor;

    if (departmentSelect && selectedDoctorDepartment) {
      const matchingOption = Array.from(
        departmentSelect.options
      ).find((option) => option.value === selectedDoctorDepartment ||
        option.textContent.trim() === selectedDoctorDepartment);

      if (matchingOption) {
        departmentSelect.value = matchingOption.value;
      }
    }
  });
});


/* 5. APPOINTMENT FORM VALIDATION */

const appointmentForm = document.getElementById("appointment-form");
const formMessage = document.getElementById("form-message");

if (appointmentForm && formMessage) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message";

    // Check required fields and input formats.
    if (!appointmentForm.checkValidity()) {
      appointmentForm.reportValidity();
      return;
    }

    // Prevent selecting a past date.
    if (dateInput && dateInput.value < getLocalDate()) {
      formMessage.textContent =
        "Please select today or a future date.";

      formMessage.classList.add("error");

      dateInput.focus();
      return;
    }

    // Read the patient's name for a demo confirmation.
    const nameInput = document.getElementById("full-name");
    const patientName = nameInput
      ? nameInput.value.trim()
      : "Patient";

    if (patientName.length < 2) {
      formMessage.textContent =
        "Please enter your full name.";

      formMessage.classList.add("error");

      if (nameInput) {
        nameInput.focus();
      }

      return;
    }

    // Display confirmation on the page.
    // This does not send data to a real clinic.
    formMessage.textContent =
      `Thank you, ${patientName}! Your demo appointment request ` +
      "has been validated, but it has NOT been sent to a clinic.";

    formMessage.classList.add("success");

    // Reset the form after displaying the message.
    appointmentForm.reset();

    if (dateInput) {
      dateInput.min = getLocalDate();
    }
  });
}


/* 6. BACK-TO-TOP BUTTON */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  function updateBackToTopButton() {
    backToTop.classList.toggle(
      "visible",
      window.scrollY > 350
    );
  }

  window.addEventListener(
    "scroll",
    updateBackToTopButton,
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateBackToTopButton();
}


/* 7. SMOOTH SCROLL FOR INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Update the URL hash without jumping instantly.
      if (window.location.hash !== targetId) {
        history.replaceState(null, "", targetId);
      }
    }
  });
});


/* 8. BASIC IMAGE FALLBACK */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-unavailable");
    image.alt = "Image unavailable. Please check the image file.";
  });
});