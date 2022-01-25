import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3'
import { createSearchQuery, checkUniqueQuery, addPokemonQuery, 
    numRowsQuery, addReportQuery, allReportsQuery, removePokemonQuery, 
    removeReportQuery, reportInDBQuery, removeReportsForPokemonQuery,
    updateTableAfterDeletionQuery
} from './sqlQueries.js';

import { validatePokemon, validateReport } from '../utils/parsing.js';

import * as uuid from 'uuid'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database('./pokemon.db'); // Connect pre-existing database to application

const checkUnique = db.prepare(checkUniqueQuery) 
const addPokemon = db.prepare(addPokemonQuery)
const numRows = db.prepare(numRowsQuery)
const addReport = db.prepare(addReportQuery)
const allReports = db.prepare(allReportsQuery)
const removePokemon = db.prepare(removePokemonQuery)
const removeReport = db.prepare(removeReportQuery)
const reportInDB = db.prepare(reportInDBQuery)
const removeReportsForPokemon = db.prepare(removeReportsForPokemonQuery)
const updateTableAfterDeletion = db.prepare(updateTableAfterDeletionQuery)

// Create a new Pokemon
export const createPokemon = ({ name, hp, attack, defense, type1, type2, ability1, ability2, speed, spatk, spdef, description, height, weight, image }) => {
  
    const inDatabase = checkUnique.get(name)['count(*)'] // Get num of instances this name has appeared in the db (should be 0)
    
    if (inDatabase > 0) {
        return new Error(`A pokemon with the name ${name} has already been found in the database!`)
    }

    // Validate the given data
    const createError = validatePokemon(name,description,weight,height,type1,type2,ability1,ability2,image, hp, attack, defense, spatk, spdef, speed)
    
    if (createError instanceof Error) return createError
    
    const index = numRows.get()['COUNT(*)'] + 1
    addPokemon.run(index, name, description, height, weight, ability1, ability2, type1, type2, hp, attack, defense, spatk, spdef, speed, image)
    
    return {id: index, name, description, height, weight, ability1, ability2, type1, type2, hp, attack, defense, spatk, spdef, speed, image }
}

// Search through the database
export const searchPokemon = (searchData) => {
    const query = createSearchQuery(searchData)
    const searchQuery = db.prepare(query)
    const searchResults = searchQuery.all()
    return searchResults
}

// Return the number of Pokemon in the database
export const numberOfPokemon = () => {
    return numRows.get()['COUNT(*)']
}

// Create a new Report
export const createReport = ({ reportDescription, pokemonReported }) => {

    if (!validateReport(reportDescription)) {
        return new Error("Report description is too long.")
    }

    const inDatabase = checkUnique.get(pokemonReported)['count(*)'] 

    // Confirm the Pokemon being reported is within the database
    if (inDatabase === 0) {
        return new Error(`${pokemonReported} does not exists within the database.`)
    }

    const query = db.prepare("SELECT id,name FROM pokemon WHERE name=? COLLATE NOCASE")
    const reportedID = query.get(pokemonReported)['id']
    const reportedName = query.get(pokemonReported)['name'] // Return pokemon name in error message in proper capitalization if necessary

    if (reportedID < 899) { // If the index of the reported Pokemon is below 899, it is an official pokemon that wasn't added by a user.
        return new Error(`${reportedName} cannot be reported as it is not a user created Pokemon.`)
    }

    addReport.run(pokemonReported, reportDescription, uuid.v4() )

    return "Report successfully gone through."
}

// View all reports (requires admin keyu)
export const seeAllReports = () => {
    return allReports.all()
}

// Delete a pokemon (reqires admin key)
export const deletePokemon = ({ name }) => {
    const inDatabase = checkUnique.get(name)['count(*)']
    if (inDatabase === 0) {
        return new Error(`${name} does not exist in the database.`)
    }
    // Subtract 1 from the id of every Pokemon with an id larger than the Pokemon to be deleted, so that there aren't gaps within indexes
    updateTableAfterDeletion.run(name)
    removePokemon.run(name)
    removeReportsForPokemon.run(name)

    return "Pokemon successfully removed."
}

// Delete a report (requires admin key)
export const deleteReport = ({ id }) => {
    const inDB = reportInDB.get(id)['count(*)']
    if (inDB === 0) {
        return new Error("Report not found in database.")
    }
    removeReport.run(id)
    return "Report removed successfully."
}
