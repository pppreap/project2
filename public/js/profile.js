'use strict';
// Define variables for range sliders
// Weight variables
var weightSlider = document.getElementById("myWeight");
var weightOutput = document.getElementById("inputWeight");
// Height variables
var heightSlider = document.getElementById("myHeight");
var heightOutput = document.getElementById("inputHeight");
// Display slider value
weightOutput.innerHTML = weightSlider.value;
heightOutput.innerHTML = heightSlider.value;
// Update sliders in real time while dragging it
weightSlider.oninput = function () {
  weightOutput.innerHTML = this.value;
}
heightSlider.oninput = function () {
  heightOutput.innerHTML = this.value;
}
// Change weight-slider value on weight-number input
function showValWeight(newVal) {
  weightSlider.value=newVal;
};
// Change height-slider value on height-number input
function showValHeight(newVal) {
  heightSlider.value=newVal;
};
// *** Change number input when dragging slider ***
// Add 2 eventListeners for weight and input sliders
weightSlider.addEventListener("input", updateValueWeight);
heightSlider.addEventListener("input", updateValueHeight);
function updateValueWeight(e) {
  weightOutput.value = e.srcElement.value;
}
function updateValueHeight(e) {
  heightOutput.value = e.srcElement.value;
}
// Calculate BMI
function calculateBmi() {
  var weight = document.bmiForm.realweight.value;
  var height = (document.bmiForm.realheight.value)/100;
  var realbmi = (weight)/Math.pow(height, 2);
  var realbmiOutput = document.getElementById("yourbmi");
  var messageOutput = document.getElementById("Message");
  var roundedBmi = realbmi.toFixed(1);
  messageOutput.innerHTML = ""; // Clear message before calculating new BMI
  realbmiOutput.innerHTML = " " + roundedBmi; // Print BMI
  // Appropriate message for your BMI rating
  if (roundedBmi > 26) {
    messageOutput.innerHTML = "Overweight";
  } else {
    messageOutput.innerHTML = "Not Overweight";
  }
  // Console loggings
  console.log('Weight: ' + weight + " kg");
  console.log('Height: ' + height + " m");
  console.log('BMI: ' + realbmi);
}


const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#goal-name').value.trim();
    const description = document.querySelector('#goal-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/goals`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create goal');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete goal');
      }
    }
  };
  
  document
    .querySelector('.new-goal-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.goal-list')
    .addEventListener('click', delButtonHandler);
