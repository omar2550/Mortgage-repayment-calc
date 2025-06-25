const formEl = document.querySelector("form"),
  firstName = document.getElementById("first-name"),
  lastName = document.getElementById("last-name"),
  email = document.getElementById("email"),
  radio1 = document.getElementById("one"),
  radio2 = document.getElementById("two"),
  message = document.getElementById("message"),
  checkbox = document.getElementById("checkbox");

  formEl.addEventListener("submit", e => {

    e.preventDefault();

    checkInputs();

    if (checkInputs()) {
      document.querySelector(".pop-up").classList.add("show");

      setTimeout(() => {
        document.querySelector(".pop-up").classList.remove("show");

        firstName.value = "";
        lastName.value = "";
        email.value = "";
        message.value = "";
        radio1.checked = false;
        radio2.checked = false;
        checkbox.checked = false;

        document.querySelectorAll(".form-control").forEach(e => e.classList.remove("correct"));
      }, 3000);
    }
  });

  // Functions 

  function setError(element, message) {
    element.parentElement.querySelector("span.error").innerText = message;
    
    element.parentElement.querySelector("span.must").classList.add("red");
    element.parentElement.querySelector("span.must").classList.remove("green-600");

    element.classList.add("is-invalid");
    element.classList.remove("correct");
  }

  function setCorrect(element) {
    element.parentElement.querySelector("span.error").innerText = "";

    element.parentElement.querySelector("span.must").classList.add("green-600");
    element.parentElement.querySelector("span.must").classList.remove("red");


    element.classList.add("correct");
    element.classList.remove("error");
  }

  function checkInputs() {
    const firstNameVal = firstName.value.trim(),
      lastNameVal = lastName.value.trim(),
      emailVal = email.value.trim(),
      messageVal = message.value.trim();

      let fNameCheck = false,
        lNameCheck = false,
        emailCheck = false,
        messageCheck = false,
        radioCheck = false,
        checkboxCheck = false;

      if (firstNameVal === "") {
        setError(firstName, "This field is required");
      } else {
        setCorrect(firstName);
        fNameCheck = true;
      }

      if (lastNameVal === "") {
        setError(lastName, "This field is required");
      } else {
        setCorrect(lastName);
        lNameCheck = true;
      }

      if (emailVal === "") {
        setError(email, "This field is required");
      } else if (!/^[a-zA-Z0-9-_%\.+*]+@[a-zA-Z-_\.+*]+\.[a-zA-Z]+$/g.test(emailVal)) {
        setError(email, "Please enter a valid email address");
      } else {
        setCorrect(email);
        emailCheck = true;
      }

      if (!radio1.checked && !radio2.checked) {
        setError(radio1.parentElement.parentElement.parentElement, "Please select a query type");
      } else {
        setCorrect(radio1.parentElement.parentElement.parentElement);
        radioCheck = true;
      }

      if (messageVal === "") {
        setError(message, "This field is required");
      } else {
        setCorrect(message);
        messageCheck = true;
      }

      if (!checkbox.checked) {
        setError(checkbox.parentElement, "To submit this form, please consent to being contacted");
      } else {
        setCorrect(checkbox.parentElement);
        checkboxCheck = true;
      }

      if (fNameCheck && lNameCheck && emailCheck && radioCheck && messageCheck && checkboxCheck) {
        return true;
      }
  }