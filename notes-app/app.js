const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')

yargs.version('1.1.0')

//Create add command 
yargs.command({
    command: 'add',
    describe: 'Add new notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of the message',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    builder: {
       title: {
           describe: 'Note title',
           demandOption: true,
           type: 'string',
       }
    },
    describe: 'Remove a note',
    handler(argv){
         notes.removeNote(argv.title)
    }
})


yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler() {
        console.log(chalk.green("Your notes"))
        notes.getNotes().forEach(note => {
            console.log(note.title+"|"+note.body)
        });
    }
})


yargs.command({
    command: 'read',
    describe: 'Reads a specific notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        const note = notes.findNote(argv.title)
        if(note === undefined) {
            console.log(chalk.red('Note not found'))
        }else{
            console.log(chalk.green(note.body))
        }
    }
})
// add, remove, read, list

yargs.parse()
console.log(chalk.red.inverse('For Elena with love <3'))