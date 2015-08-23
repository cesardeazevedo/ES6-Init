
import { Module, Component, View } from 'app/shared/decorators'

Module('app.shared.components')

//start-non-standard
@Component({
    selector: 'btn'
})
@View({
    template: `
        <span>
        <button
        class="button button--wayra button--border-thin button--round-s">
            {{ btn.name }}
        </button>
        </span>
    `
  , replace: true
  , bindToController: {
        name: '@'
    }
})
class btn {
    constructor () {
    }
}
//end-non-standard

