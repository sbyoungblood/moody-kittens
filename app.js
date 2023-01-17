let kittens = [];
let mood = ""
let affection = 5
let kittenNames = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }

  let name = form.name.value;

  if (name == "") { alert("Your kitten needs a name!") }
  else if (kittenNames.includes(name)) { alert("This name is taken.") }
  else {
    kittens.push(kitten)
    kittenNames.push(name)
    saveKittens()

    form.reset()
    drawKittens()
  }
}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  window.localStorage.setItem("kittenNames", JSON.stringify(kittenNames))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
  let storedKittenHistory = JSON.parse(window.localStorage.getItem("kittenNames"))
  if (storedKittenHistory) {
    kittenNames = storedKittenHistory
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElement = document.getElementById("kittens")
  let kittensTemplate = ""

  kittens.forEach(kitten => {
    kittensTemplate += `
    
    <div class="card p-2 text-center w-50 kitten ${kitten.mood}">
        <img src="moody-logo.png" height="250" alt="Moody Kittens">
        
        <div class="mt-2">

          <div class="d-flex justify-content-center"> Name: ${kitten.name}</div>
          <div class="d-flex justify-content-center"> Mood: ${kitten.mood}</div>
          <div class="d-flex justify-content-center"> Affection: ${kitten.affection}</div>

          <div>
            <button onclick="pet('${kitten.id}')">Pet Kitten</button>
            <button onclick="catnip('${kitten.id}')">Give Catnip</button>
          </div>
        </div>
        <div class="d-flex justify-content-center">
        <i class="fa-solid fa-trash action button-large" id="delete-btn" onclick="deleteKitten('${kitten.id}')"></i>
        </div>
      </div>
    `
  })
  kittensElement.innerHTML = kittensTemplate
}


function deleteKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("Invalid ID")
  }
  kittens.splice(index, 1)

  let indexName = kittens.findIndex(kitten => kitten.name == name)
  if (index == -1) {
    throw new Error("Invalid ID")
  }
  kittenNames.splice(indexName, 1)

  saveKittens()

}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kittens => kittens.id == id)
}



/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > 0.5) {
    currentKitten.affection++;
    setKittenMood(currentKitten)
    saveKittens()
  }
  else currentKitten.affection--;
  setKittenMood(currentKitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "Tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)
  if (kitten.affection >= 6) { kitten.mood = "happy" }
  if (kitten.affection <= 5) { kitten.mood = "tolerant" }
  if (kitten.affection <= 3) { kitten.mood = "angry" }
  if (kitten.affection <= 0) { kitten.mood = "gone" }

  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  loadKittens()
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
