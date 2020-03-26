// const square = function(x) {
//     return x*x;
// }

// const square = (x) => {
//     return x*x;
// }

// const square = (x) => x*x

// console.log(square(2))

const event = {
    name: 'BDay part',
    guestList: ['AK','Elena'],
    printGuestList(){
        console.log("Guest list for " + this.name)
        this.guestList.forEach( (guest) => console.log(guest))
    }
}

event.printGuestList()