function powerOn() {
  ship.powerOn = true;
}

function countModules() {
  return availableModules.length;
}

function countEssential() {
  return availableModules.reduce((counter, module) => {
    return (module.essential === true ? ++counter : counter);
  },0);
}

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

loadModule(findModule());
loadModule(findModuleIndex("propulsion", true));
loadModule(findModuleIndex("navigation", true));
loadModule(findModuleIndex("communication", false));

function resetLARRY() {
  for (let i = 0; i < 10; i++) LARRY.quack();
}

resetLARRY();

function setMessage() {
  radio.message = JSON.stringify(navigation);
}

setMessage();

function activateBeacon() {
  radio.beacon = true;
}

activateBeacon();

function setFrequency() {
  radio.frequency = (radio.range.low + radio.range.high)/2;
}

function initialize() {
  navigation.x = 0;
  navigation.y = 0;
  navigation.z = 0;
}

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

function setSpeed(speed) {
  let speedInt = parseInt(speed);
  if (speedInt >= 0)
    navigation.speed = speedInt;
}

function activateAntenna() {
  ship.antenna['active'] = true;
}

function sendBroadcast() {
  for (let i = 0; i < 100; i++) 
    broadcast();
}

function configureBroadcast() {
  setFrequency();
  activateAntenna();
  sendBroadcast();
}

configureBroadcast();

function decodeMessage(message) {
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };
  let decodedMessage = message.replaceAll('1','i').replaceAll('4', 'a').replaceAll('5', 'y').replaceAll('3', 'e').replaceAll('2', 'u').replaceAll('0', 'o');
  return decodedMessage;
}

function returnToEarth() {
  var earthCoordX = broadcast('x');
  var earthCoordY = broadcast('y');
  var earthCoordZ = broadcast('z');
  
  navigation.x = parseInt(decodeMessage(earthCoordX), 16);
  navigation.y = parseInt(decodeMessage(earthCoordY), 16);
  navigation.z = parseInt(decodeMessage(earthCoordZ), 16);
}

returnToEarth();