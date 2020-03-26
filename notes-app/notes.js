
const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return loadNotes()
}

const findNote = (title) => {
    const notes = loadNotes()
    return notes.find((note) => (note.title == title))
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title )

    if (duplicateNote === undefined) {
        notes.push({ title: title, body: body })
        saveNotes(notes)
        console.log('Note added')
    } else {
        console.log('Note title taken')
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title != title)

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red("Note with title " + title + " not found"))
    } else {
        console.log(chalk.green("Note " + title + " removed"))
        saveNotes(notesToKeep)
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    findNote: findNote
}