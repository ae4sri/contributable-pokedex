export const checkUniqueQuery = "SELECT count(*) FROM pokemon WHERE name=? COLLATE NOCASE"  // Returns # of pokemon with a certain name. Used to check whether a name has already been used.

export const addPokemonQuery = `INSERT INTO pokemon
(id, name, description, height, weight, ability1, ability2, type1, type2, hp, attack, defense, spatk, spdef, speed, image)
VALUES
(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)` // Insert new pokemon into table

export const createSearchQuery = ({ // Dynamically generate a query to return the Pokemon whose traits that satisfy the conditions given by the user
    name, hpLowerBound, hpUpperBound, attackLowerBound, attackUpperBound, defenseLowerBound, defenseUpperBound, 
    type1, type2, ability1, ability2, speedLowerBound, speedUpperBound, spatkLowerBound, spatkUpperBound, spdefLowerBound, spdefUpperBound,
    indexLowerBound, indexUpperBound 
    }) => {
    let searchQuery = "SELECT * FROM pokemon WHERE 1=1 "
    if (name) {
        searchQuery += `AND name LIKE '%${name}%' `
    }
    if (hpLowerBound) {
        searchQuery += `AND hp >= ${hpLowerBound} `
    }
    if (hpUpperBound) {
        searchQuery += `AND hp <= ${hpUpperBound} `
    }
    if (attackLowerBound) {
        searchQuery += `AND attack >= ${attackLowerBound} `
    }
    if (attackUpperBound) {
        searchQuery += `AND attack <= ${attackUpperBound} `
    }
    if (defenseLowerBound) {
        searchQuery += `AND defense >= ${defenseLowerBound} `
    }
    if (defenseUpperBound) {
        searchQuery += `AND defense <= ${defenseUpperBound} `
    }
    if (type1) {
        searchQuery += `AND type1='${type1}' COLLATE NOCASE `
    }
    if (type2) {
        searchQuery += `AND type2='${type2}' COLLATE NOCASE `
    }
    if (ability1) {
        searchQuery += `AND ability1='${ability1}' COLLATE NOCASE `
    }
    if (ability2) {
        searchQuery += `AND ability2='${ability2}' COLLATE NOCASE `
    }
    if (speedLowerBound) {
        searchQuery += `AND speed >= ${speedLowerBound} `
    }
    if (speedUpperBound) {
        searchQuery += `AND speed <= ${speedUpperBound} `
    }
    if (spatkLowerBound) {
        searchQuery += `AND spatk >= ${spatkLowerBound} `
    }
    if (spatkUpperBound) {
        searchQuery += `AND spatk <= ${spatkUpperBound} `
    }
    if (spdefLowerBound) {
        searchQuery += `AND spdef >= ${spdefLowerBound} `
    }
    if (spdefUpperBound) {
        searchQuery += `AND spdef <= ${spdefUpperBound} `
    }
    if (indexLowerBound) {
        searchQuery += `AND id >= ${indexLowerBound} `
    }
    if (indexUpperBound) {
        searchQuery += `AND id <= ${indexUpperBound}`
    }
    return searchQuery
}

export const numRowsQuery = 'SELECT COUNT(*) FROM pokemon' // Get # of Pokemon

export const addReportQuery = 'INSERT INTO reports (pokemonReported, reportDescription, id) VALUES (?, ?, ?)' // Insert report into table

export const allReportsQuery = 'SELECT * FROM reports' // Return all reports

export const removePokemonQuery = 'DELETE FROM pokemon WHERE name=? COLLATE NOCASE' // Delete a specified Pokemon from the table

export const removeReportQuery = 'DELETE FROM reports WHERE id=?' // Delete a report with a specified ID

export const reportInDBQuery = `SELECT count(*) FROM reports WHERE id=?` // Get # of reports

export const removeReportsForPokemonQuery = 'DELETE FROM reports WHERE pokemonReported=? COLLATE NOCASE' // Removes all reports about a specified pokemon

export const updateTableAfterDeletionQuery = 'UPDATE pokemon SET id = id-1 WHERE id > (SELECT id FROM pokemon WHERE name=?)' // Make sure there are no gaps between indexes after removing a Pokemon

