const validateHeight = (height) => { // Make sure height string is formatted correctly
  const regex1 = /[0-9]*\.[0-9]+\sm\s\([0-9]+′[0-9]+″\)/i; // Accept height as meters + ft/inches, or just metres
  const regex2 = /[0-9]*\.[0-9]+\sm/i;
  return (regex1.test(height) || regex2.test(height));
}

const validateWeight = (weight) => { // Make sure weight string is formatted correctly (formatted by the browser on the front end)
  const regex = /[0-9]*\.[0-9]+\skg\s\([0-9]*\.[0-9]+\slbs\)/i;
  return regex.test(weight);
}

const validateType = (type) => { // Make sure type is a valid pokemon type
  if (type === "Normal" || type === "Fire" ||
  type === "Water" || type === "Grass" || type === "Electric" ||
  type === "Ice" || type === "Fighting" || type === "Poison" || 
  type === "Ground" || type === "Flying" || type === "Psychic" || 
  type === "Bug" || type === "Rock" || type === "Ghost" || 
  type === "Dark" || type === "Dragon" || type === "Steel" || 
  type === "Fairy") {
      return true
  }
  return false
}

const validateAbility = (ability) => { 
  if (ability.length > 20) { 
      return false
  }
  return true
}

const validateDescription = (description) => { //
  if (description.length > 250) {
      return false
  }
  return true
}

const validateName = (name) => { 
  if (name.length > 30) {
      return false
  }
  return true
}

const validateStat = (stat) => {
  if (stat < 0 || stat > 999) {
    return false
  }
  return true
}

const validateImage = (image) => {
  const isImage = (image.includes('png') || image.includes('jpeg')  || image.includes('jpg'))
  return(isImage && image.length < 2049); // Make sure URL to image ends in proper file format
}

export const validatePokemon = (name,description,weight,height,type1,type2,ability1,ability2,image, hp, attack, defense, spatk, spdef, speed) => {
  
  if (!validateName(name)) {
    return new Error("Name must be 30 characters or less.")
  }

  if (description != null && !validateDescription(description)) {
      return new Error("Description must be 300 characters or less.")
  }

  if (!validateWeight(weight)) {
      return new Error("Weight not formatted correctly.")
  }

  if (!validateHeight(height)) {
      return new Error("Height not formatted correctly.")
  }

  if (!validateType(type1)) {
      return new Error("Type 1 must be one of: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dark, Dragon, Steel, Fairy")
  }

  if (type2 != null && !validateType(type2)) {
      return new Error("Type 2 must either be empty, or one of: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dark, Dragon, Steel, Fairy")
  }

  if (!validateAbility(ability1)) {
      return new Error("Ability 1 must be 20 characters or less.")
  }
  
  if (ability2 != null && !validateAbility(ability2)) {
      return new Error("Ability 2 must be 20 characters or less.")
  }

  if (!validateImage(image)) {
      return new Error("Image is invalid. Please send a URL leading to an image.")
  }
  if (!validateStat(hp) || !validateStat(attack) || !validateStat(defense) || !validateStat(spatk) || !validateStat(spdef) || !validateStat(speed)) {
    return new Error("All stat points must be between 0 and 999.")
  }
}

export const validateReport = (report) => {
  return !(report.length > 150)
}
