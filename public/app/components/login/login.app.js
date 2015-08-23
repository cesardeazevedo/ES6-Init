
import { Module, Route, Component, View, Inject } from 'app/shared/decorators'

//start-non-standard
@Route('login', {
    url: '/login'
  , abstract: true
  , template: '<login></login>'
})
@Component({
    selector: 'login'
})
@View({
    templateUrl: 'login/views/login'
})
class login { }

@Route('login.signin', {
    url: '/signin'
  , template: '<signin></signin>'
})
@Component({
    selector: 'signin'
})
@View({
    templateUrl: 'login/views/signin'
})
class signin {
    signin () {
        console.log('Login')
    }
}

@Route('login.signup', {
    url: '/signup'
  , template: '<signup></signup>'
})
@Component({
    selector: 'signup'
})
@View({
    templateUrl: 'login/views/signup'
})
class signup {
    signup () {
        console.log('Sign Up')
    }
}

//end-non-standard
