// Set the powerOn property of the ship on
function powerOn() {
  ship.powerOn = true;
}

// Return the number of available modules
function countModules() {
  return availableModules.length;
}

// Return the number of essential modules
function countEssential() {
  return availableModules.reduce((counter, module) => {
    return (module.essential === true ? ++counter : counter);
  },0);
}

// Load a module using the filter method
// function loadModule(index) {
//   let newModule = null;
//   availableModules.filter((module,modIndex) => {
//     if (index === modIndex)
//       newModule = module;
//   });
  
//   if (newModule !== null) {
//     ship.modules.push(newModule);
//     module.enabled = true;
//   }
    
// Load a module passed by index
function loadModule(index) {
  let module = null;
  for(let i = 0; i < availableModules.length; i++) {
    if(index === i) {
      module = availableModules[i];
    }
  }
  
  if (module !== null) {
    module.enabled = true;
    ship.modules.push(module);
  }
}

// Find the life-support module and returns its index
function findModule() {
  // availableModules.filter((module,modIndex) => {
  //   if (module.name === 'life-support')
  //     return modIndex;
  // });
  
  for(let i = 0; i < availableModules.length; i++) {
    if (availableModules[i].name === 'life-support')
      return i;
  }
}

// Find a module's index using its name and essential property
function findModuleIndex(name, ess) {
  // availableModules.filter((module,modIndex) => {
  //   if(module.name === name && module.hasOwnProperty("essential"))
  //     return modIndex;
  // });
  
  //let essModule = ess;
  
  for(let i = 0; i < availableModules.length; i++) {
    if (availableModules[i].name === name && availableModules[i].essential === ess)
      return i;
  }
}

// Test out the functions created above
loadModule(findModule());
loadModule(findModuleIndex("propulsion", true));
loadModule(findModuleIndex("navigation", true));
loadModule(findModuleIndex("communication", false));

// Reset Larry who has had some technical issues
function resetLARRY() {
  for (let i = 0; i < 10; i++) LARRY.quack();
}

resetLARRY();

// Set the navigation message in the radio
function setMessage() {
  radio.message = JSON.stringify(navigation);
}

setMessage();

// Activate the beacon property of the radio
function activateBeacon() {
  radio.beacon = true;
}

activateBeacon();

// Set the frequency of the radio
function setFrequency() {
  radio.frequency = (radio.range.low + radio.range.high)/2;
}

// Initialise the navigation properties
function initialize() {
  navigation.x = 0;
  navigation.y = 0;
  navigation.z = 0;
}

// Calibrate the navigation properties
function calibrateX() {
  var signal = null;
  for (let i = 0; i < 12; i++) {
    signal = checkSignal();
    if (signal !== undefined)
      navigation.x = signal;
  }
}

function calibrateY() {
  var signal = null;
  for (let i = 0; i < 60; i++) {
    signal = checkSignal();
    if (signal !== undefined)
      navigation.y = signal;
  }
}

function calibrateZ() {
  var signal = null;
  for (let i = 0; i < 60; i++) {
    signal = checkSignal();
    if (signal !== undefined)
      navigation.z = signal;
  }
}

function calibrate() {
  calibrateX();
  calibrateY();
  calibrateZ();
}

// Set the navigation speed according to the passed speed
function setSpeed(speed) {
  let speedInt = parseInt(speed);
  if (speedInt >= 0)
    navigation.speed = speedInt;
}

// Activate the ship's antenna
function activateAntenna() {
  ship.antenna['active'] = true;
}

// Sent the broadcast 100 times
function sendBroadcast() {
  for (let i = 0; i < 100; i++) 
    broadcast();
}

// Confirgurate the broadcast by using the methods above
function configureBroadcast() {
  setFrequency();
  activateAntenna();
  sendBroadcast();
}

configureBroadcast();

// Decode the received message
function decodeMessage(message) {
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };
  let decodedMessage = message.replaceAll('1','i').replaceAll('4', 'a').replaceAll('5', 'y').replaceAll('3', 'e').replaceAll('2', 'u').replaceAll('0', 'o');
  return decodedMessage;
}

// Return to earth using the broadcasted decoded coordinates
function returnToEarth() {
  var earthCoordX = broadcast('x');
  var earthCoordY = broadcast('y');
  var earthCoordZ = broadcast('z');
  
  navigation.x = parseInt(decodeMessage(earthCoordX), 16);
  navigation.y = parseInt(decodeMessage(earthCoordY), 16);
  navigation.z = parseInt(decodeMessage(earthCoordZ), 16);
}

returnToEarth();
