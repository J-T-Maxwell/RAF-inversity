// Array to store base information
var bases = [];

function calculateEffectiveness() {
  // Get information for the new base
  var base = {};
  base.name = prompt("Enter the name of the new base");
  // Check if the user pressed "Cancel" or entered an empty name
  if (base.name === null || base.name.trim() === "") {
    alert("Adding a new base canceled.");
    return;
  }

  base.proximity = prompt("Enter the distance of deployment range at " + base.name + " (in kilometres)");
  if (base.proximity === null) {
    alertMessage()
    return;
  }
  // Validate deployment range
  while (isNaN(base.proximity) || base.proximity < 0) {
    alert("Invalid deployment range for " + base.name + ".");
    base.proximity = prompt("Enter the distance of deployment range at " + base.name + " (in kilometres)");
    if (base.proximity === null) {
      alertMessage()
      return;
    }
  }

  base.security = prompt("Enter the security level of " + base.name + " (low, medium or high)");
  if (base.security === null) {
    alertMessage()
    return;
  }
  // Validate security grade
  while (base.security.toUpperCase() !== 'MEDIUM' && base.security.toUpperCase() !== 'LOW' && base.security.toUpperCase() !== 'HIGH') {
    alert("Invalid security level for " + base.name + ".");
    base.security = prompt("Enter the security level of " + base.name + " (low, medium or high)");
    if (base.security === null) {
      alertMessage()
      return;
    }
  }

  base.runwayLength = prompt("Enter the runway length of " + base.name + " (in meters)");
  if (base.runwayLength === null) {
    alertMessage()
    return;
  }
  while (isNaN(base.runwayLength) || base.runwayLength < 0) {
    alert("Please enter a valid numeric value for the runway length of " + base.name + ".");
    base.runwayLength = prompt("Enter the runway length of " + base.name + " (in meters)");
    if (base.runwayLength === null) {
      alertMessage()
      return;
    }
  }

  base.personnel = prompt("Enter the number of personnel at " + base.name);
  if (base.personnel === null) {
    alertMessage()
    return;
  }
  while (isNaN(base.personnel) || base.personnel < 0) {
    alert("Please enter a valid numeric value for the personnel at " + base.name + ".");
    base.personnel = parseInt(prompt("Enter the number of personnel at " + base.name));
    if (base.personnel === null) {
      alertMessage()
      return;
    }
  }

  base.planes = prompt("Enter the number of planes at " + base.name);
  if (base.planes === null) {
    alertMessage()
    return;
  }
  while (isNaN(base.planes) || base.planes < 0) {
    alert("Please enter a valid numeric value for the number of planes at " + base.name + ".");
    base.planes = parseInt(prompt("Enter the number of planes at " + base.name));
    if (base.planes === null) {
      alertMessage()
      return;
    }
  }

  base.equipment = prompt("Enter the quality of equipment at " + base.name + " (on a scale of 0 to 100)");
  if (base.equipment === null) {
    alertMessage()
    return;
  }
  while (isNaN(base.equipment) || base.equipment < 0 || base.equipment > 100) {
    alert("Please enter a number that is between 0 and 100 " + base.name + ".");
    base.equipment = parseInt(prompt("Enter the quality of equipment at " + base.name + " (on a scale of 0 to 100)"));
    if (base.equipment === null) {
      alertMessage()
      return;
    }
  }

  base.fuel = prompt("How good is the fuel supply " + base.name + " (low, medium or high)");
  if (base.fuel === null) {
    alertMessage()
    return;
  }
  // Validate fuel grade
  while (base.fuel.toUpperCase() !== 'MEDIUM' && base.fuel.toUpperCase() !== 'LOW' && base.fuel.toUpperCase() !== 'HIGH') {
    alert("Invalid fuel level for " + base.name + ".");
    base.fuel = prompt("How good is the fuel supply " + base.name + " (low, medium or high)");
    if (base.fuel === null) {
      alertMessage()
      return;
    }
  }

  base.food = prompt("How good is the food supply " + base.name + " (low, medium or high)");
  if (base.food === null) {
    alert("Adding a new base has been cancelled");
    return;
  }
  while (base.food.toUpperCase() !== 'MEDIUM' && base.food.toUpperCase() !== 'LOW' && base.food.toUpperCase() !== 'HIGH') {
    alert("Invalid food level for " + base.name + ".");
    base.food = prompt("How good is the food supply " + base.name + " (low, medium or high)");
    if (base.food === null) {
      alert("Adding a new base has been cancelled");
      return;
    }
  }

  // Add the new base to the list
  bases.push(base);

  // Create and display the table
  createTable(bases);
}
function createTable(bases) {
    var tableBody = document.querySelector('#baseTable tbody');
    tableBody.innerHTML = '';
  
    bases.forEach(function (base) {
      var row = tableBody.insertRow();
      var cellIndex = 0;
  
      // Insert data into cells
      row.insertCell(cellIndex++).textContent = base.name;
      var proximityCell = row.insertCell(cellIndex++)
      proximityCell.textContent = base.proximity;
      var securityCell = row.insertCell(cellIndex++)
      securityCell.textContent = base.security;
      var runwayLengthCell = row.insertCell(cellIndex++)
      runwayLengthCell.textContent = base.runwayLength;
      var personnelCell = row.insertCell(cellIndex++)
      personnelCell.textContent = base.personnel;
      var planesCell = row.insertCell(cellIndex++)
      planesCell.textContent = base.planes;
      var equipmentCell = row.insertCell(cellIndex++)
      equipmentCell.textContent = base.equipment;
      var fuelCell = row.insertCell(cellIndex++)
      fuelCell.textContent = base.fuel;
      var foodCell = row.insertCell(cellIndex++)
      foodCell.textContent = base.food;
  
      // Calculate and display the effectiveness
      var effectiveness = calculateBaseEffectiveness(base);
      var effectivenessCell = row.insertCell(cellIndex++);
      
  
      // Apply color coding based on the effectiveness
      effectivenessCell.className = getColorClassForEffectiveness(effectiveness);
      securityCell.className = getCellColour(base.security);
      fuelCell.className = getCellColour(base.fuel);
      foodCell.className = getCellColour(base.food);
      runwayLengthCell.className = getCellColourForRLAndProximity(base.runwayLength);
      proximityCell.className = getCellColourForRLAndProximity(base.proximity);
      planesCell.className = getCellColourForPersonnelPlanesAndEquipment(base.planes);
      personnelCell.className = getCellColourForPersonnelPlanesAndEquipment((base.personnel / 10));
      equipmentCell.className = getCellColourForPersonnelPlanesAndEquipment(base.equipment);
    });
  }
  
  function calculateBaseEffectiveness(base) {
    // Define weights for each factor (you can adjust these as needed)
    var weights = {
      proximity: 0.1,
      security: 0.1,
      runwayLength: 0.2,
      personnel: 0.15,
      planes: 0.15,
      equipment: 0.1,
      fuel: 0.1,
      food: 0.1,
    };
  
    // Convert all non numeric values to a numeric grade
    var securityGrade = convertToGrade(base.security);
    var foodGrade = convertToGrade(base.food);
    var fuelGrade = convertToGrade(base.fuel);
  
    // Calculate the weighted sum of factors
    var weightedSum = (base.proximity / 1000) * weights.proximity +
                      securityGrade * weights.security +
                      (base.runwayLength / 1000) * weights.runwayLength +
                      (base.personnel / 100) * weights.personnel +
                      (base.planes / 100) * weights.planes +
                      (base.equipment / 10) * weights.equipment +
                      fuelGrade * weights.fuel +
                      foodGrade * weights.food;
  
    // Calculate the effectiveness
    var effectiveness = weightedSum / Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  
    return effectiveness;
  }
  
  // Function to determine colour class based on the effectiveness
  function getColorClassForEffectiveness(effectiveness) {
    if (effectiveness >= 6) {
      return 'high-priority'; // High priority (sufficient resources)
    } else if (effectiveness >= 4) {
      return 'medium-priority'; // Medium priority (moderate resources)
    } else {
      return 'low-priority'; // Low priority (in need of resources)
    }
  }

  // Function to determine the colour class based on whether the food, security and fuel are low, medium or high
  function getCellColour(item) {
    if (item == 'high') {
      return 'high-priority'
    } else if (item == 'medium') {
      return 'medium-priority';
    } else {
      return 'low-priority';
    }
  }

  function getCellColourForRLAndProximity(item) {
    if (item >= 2000) {
      return 'high-priority';
    } else if (item >= 300) {
      return 'medium-priority';
    } else {
      return 'low-priority';
    }
  }

  function getCellColourForPersonnelPlanesAndEquipment(item) {
    if (item >= 65) {
      return 'high-priority';
    } else if (item >= 35) {
      return 'medium-priority';
    } else {
      return 'low-priority';
    }
  }

  // Function to convert the low, medium or high inputs to integers
  function convertToGrade(item) {
    switch (item.toLowerCase()) {
      case 'low':
        return 2;
      case 'medium':
        return 5;
      case 'high':
        return 8;
    }
  }
  
  function alertMessage() {
      alert("Adding a new base canceled.");
  }
  // Initial call to set up the table
  createTable(bases);