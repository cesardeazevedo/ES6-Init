'use strict'

//start-non-standard
class HomeController {
    constructor($state) {
        this.router = $state
        console.log(this.router.get())
    }

    click() {
        console.log('Clicked')
    }
}

export default HomeController

//end-non-standard
