//Set Variables
const formEl = document.querySelector("form");

//Set Cleare All Button 
document.querySelector(".clear-all").addEventListener("click", () => {

  //Reset The Form Inputs
  formEl.reset();

  //Remove All Classes And Error Message
  document.querySelectorAll(".input").forEach( e => {
    e.classList.remove("correct");
    e.classList.remove("error");
  });

  document.querySelectorAll(".sign").forEach( e => {
    e.classList.remove("correct");
    e.classList.remove("error");
  });
  
  document.querySelectorAll(".input-box").forEach( e => {
    e.querySelector("div.error").innerText = "";
  });

  document.querySelector('[for="repay"]').classList.remove("checked");
  document.querySelector('[for="inter"]').classList.remove("checked");
  
  //Remove The Result 
  document.querySelector(".result-sec").innerHTML =`
    <div class="text-center">
      <img src="assets/images/illustration-empty.svg" alt="">
      <h3 class="text-light mt-3 mb-2">Results shown here</h3>
      <p class="text-white-50 m-0">
        Complete the form and click “calculate repayments” to see what 
        your monthly repayments would be.
      </p>
    </div>
  `;
  document.querySelector(".result-sec").classList.add("align-content-center");

});

//Form Control
formEl.addEventListener("submit", e => {
  
  e.preventDefault();

  const formData = new FormData(e.target),
    data = Object.fromEntries(formData.entries());

  checkInputs(data);
 
  if (checkInputs(data) === 4) {
    mortgageCalc(data);
  }
});

//Radio Buttons Control 
document.querySelector("label[for='repay']").addEventListener("click", e => {

  document.querySelector("label[for='inter']").classList.remove("checked");
  e.target.classList.add("checked");
});

document.querySelector("label[for='inter']").addEventListener("click", e => {

  document.querySelector("label[for='repay']").classList.remove("checked");
  e.target.classList.add("checked");
});

//Functions
function setCorrect(element) {

  element.querySelector("div.error").innerText = "";
  
  if (element.querySelector(".input")) {
    element.querySelector(".input").classList.add("correct");
    element.querySelector(".sign").classList.add("correct");
    element.querySelector(".sign").classList.remove("error");
  }
}

function setError(element,message) {

  element.querySelector("div.error").innerText = message;
  if (element.querySelector(".sign")) {
    element.querySelector(".sign").classList.add("error");
    element.querySelector(".input").classList.remove("correct");
    element.querySelector(".sign").classList.remove("correct");
  }
}

function checkInputs(data) {

  let correctCount = 0;

    if (data.amount === "") {
      setError(document.querySelector(`[name="amount"]`).closest(".input-box"), "This field is required");
    } else if (isNaN(data.amount)) {
      setError(document.querySelector(`[name="amount"]`).closest(".input-box"), "Enter valid amount");
    } else {
      setCorrect(document.querySelector(`[name="amount"]`).closest(".input-box"));
      correctCount++;
    }

    if (data.term === "") {
      setError(document.querySelector(`[name="term"]`).closest(".input-box"), "This field is required");
    } else if (isNaN(data.term)) {
      setError(document.querySelector(`[name="term"]`).closest(".input-box"), "Enter valid term");
    } else {
      setCorrect(document.querySelector(`[name="term"]`).closest(".input-box"));
      correctCount++;
    }

    if (data.rate === "") {
      setError(document.querySelector(`[name="rate"]`).closest(".input-box"), "This field is required");
    } else if (isNaN(data.rate)) {
      setError(document.querySelector(`[name="rate"]`).closest(".input-box"), "Enter valid rate");
    } else {
      setCorrect(document.querySelector(`[name="rate"]`).closest(".input-box"));
      correctCount++;
    }

    if (data['m-type'] === "on") {
      setCorrect(document.querySelector(`[name="m-type"]`).closest("label").parentElement);
      correctCount++;
    } else {
      setError(document.querySelector(`[name="m-type"]`).closest(".input-box"), "This field is required");
    }

    return correctCount;
} 

function mortgageCalc(data) {

  //If He Wants To Show The Total Repayment
  if (document.getElementById("repay").checked) {
    
    let r = (parseFloat(data.rate) / 12) / 100,
    monthlyRepay = parseFloat(data.amount) * ( r * Math.pow(r + 1, parseFloat(data.term) * 12)) / (Math.pow(r + 1, parseFloat(data.term) * 12) - 1);

   let result = `
   <h4 class="text-light">Your results</h4>
    <p>
      Your results are shown below based on the information you provided. 
      To adjust the results, edit the form and click “calculate repayments” again.
    </p>
    <div class="result-box mt-5 mx-auto p-4">
      <div class="pb-3 border-bottom">
        <span class="d-block">Your monthly repayments</span>
        <h1 class="lime mt-2">$${monthlyRepay.toFixed(2)}</h1>
      </div>
      <div class="pt-3">
        <span class="d-block">Total you'll repay over the term</span>
        <h2 class="text-light mt-2">$${(monthlyRepay * parseFloat(data.term) * 12).toFixed(2)}</h2>
      </div>
      </div>
      `;
      document.querySelector(".result-sec").classList.remove("align-content-center");
      document.querySelector(".result-sec").innerHTML = result;
    }

    //If He Wants To Show The Interest Only
  if (document.getElementById("inter").checked) {

    let monthlyInterest = (parseFloat(data.amount) *  (parseFloat(data.rate)/100)) / 12;

   let result = `
   <h4 class="text-light">Your results</h4>
    <p>
      Your results are shown below based on the information you provided. 
      To adjust the results, edit the form and click “calculate repayments” again.
    </p>
    <div class="result-box mt-5 mx-auto p-4">
      <div class="pb-3 border-bottom">
        <span class="d-block">Your monthly interest</span>
        <h1 class="lime mt-2">$${monthlyInterest.toFixed(2)}</h1>
      </div>
      <div class="pt-3">
        <span class="d-block">Total interest over the term</span>
        <h2 class="text-light mt-2">$${(monthlyInterest * parseFloat(data.term) * 12).toFixed(2)}</h2>
      </div>
      </div>
      `;
      document.querySelector(".result-sec").classList.remove("align-content-center");
      document.querySelector(".result-sec").innerHTML = result;
  }
}