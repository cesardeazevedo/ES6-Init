
import { Config, Inject } from '../decorators'

class config {

    //start-non-standard
    @Config()
    @Inject('$urlRouterProvider')
    //end-non-standard
    config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/')
    }
}
