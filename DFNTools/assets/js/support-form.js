(() => {
  "use strict";

  const supportForm = document.getElementById("support-form");
  const submitBtn = document.getElementById("submit-btn");
  const submitSpinner = document.getElementById("submit-spinner");
  const supportToastEl = document.getElementById("support-toast");
  const supportToastHeader = document.getElementById("support-toast-header");
  const toastBody = document.getElementById("toast-body");

  if (!supportForm || !submitBtn || !submitSpinner || !supportToastEl || !supportToastHeader || !toastBody) {
    return;
  }

  const supportToast = new bootstrap.Toast(supportToastEl);

  const showToast = (message, type = "primary") => {
    toastBody.textContent = message;

    supportToastHeader.classList.remove(
      "text-bg-success",
      "text-bg-danger",
      "text-bg-warning",
      "text-bg-secondary",
      "text-dark",
      "text-light"
    );

    if (type === "warning") {
      supportToastHeader.classList.add("text-bg-warning", "text-dark");
    } else if (type === "success") {
      supportToastHeader.classList.add("text-bg-success", "text-light");
    } else if (type === "danger") {
      supportToastHeader.classList.add("text-bg-danger", "text-light");
    } else {
      supportToastHeader.classList.add("text-bg-secondary", "text-light");
    }

    supportToast.show();
  };

  const setSubmitting = (isSubmitting) => {
    submitBtn.style.display = isSubmitting ? "none" : "inline-block";
    submitSpinner.style.display = isSubmitting ? "inline-block" : "none";
  };

  const clearFields = () => {
    document.getElementById("support-name").value = "";
    document.getElementById("support-email").value = "";
    document.getElementById("support-message").value = "";
  };

  emailjs.init("Dfy0lT2JFlcW4z4rV");

  supportForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const supportNameValue = document.getElementById("support-name").value.trim();
    const supportEmailValue = document.getElementById("support-email").value.trim();
    const supportMessageValue = document.getElementById("support-message").value.trim();

    if (!supportNameValue || !supportMessageValue) {
      showToast("Please fill in the required fields.", "warning");
      return;
    }

    const templateParams = {
      supportName: supportNameValue,
      supportEmail: supportEmailValue,
      supportMessage: supportMessageValue,
    };

    setSubmitting(true);

    try {
      const response = await emailjs.send("service_0el1plk", "template_jet4tj8", templateParams);
      console.log("SUCCESS!", response.status, response.text);
      showToast("Email sent successfully!", "success");
      clearFields();
    } catch (error) {
      console.log("FAILED!", error);
      showToast("Oops... Failed to send email.", "danger");
    } finally {
      setSubmitting(false);
    }
  });
})();