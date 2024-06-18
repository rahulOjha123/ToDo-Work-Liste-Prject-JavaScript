let checkBoxList = document.querySelectorAll(".custom-checkbox");
let error_lable = document.querySelector(".error-lable");
let inputFields = document.querySelectorAll(".input");
let progress_bar = document.querySelector(".progress-bar");
let progress_values = document.querySelector(".progress-value");

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGalsCount = Object.values(allGoals).filter((goal) => {
  return goal.completed.length;
});
progress_values.style.width = `${(completedGalsCount / 3) * 100}%`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    console.log("check box clickd");
    let allGoalAdded;
    allGoalAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalAdded) {
      checkbox.parentElement.classList.toggle("completed");
      progress_values.style.width = `${(completedGalsCount / 3) * 100}%`;

      const inutId = checkbox.nextElementSibling.id;
      allGoals[input.Id].completed = !allGoals[input.Id].completed;

      completedGalsCount = Object.values(allGoals).filter((goal) => {
        return goal.completed.length;
      });
    } else {
      progress_bar.classList.add("show-error");
    }
  });
});
inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    progress_bar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    allGoals[input.id] = input.value;
    localStorage.setItem("allgoals", JSON.stringify(allGoals));
    console.log(allGoals);
  });
});
