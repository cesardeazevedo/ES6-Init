'use strict'


import HomeController from './controllers/home.controller'
import AboutController  from './controllers/about.controller'
import { Module, Route, Inject } from 'app/shared/decorators'

Module('app.home')

//start-non-standard
@Route('home', {
    url: '/'
  , templateUrl: 'home/views/home'
})
@Inject('$state')
class home extends HomeController {}

@Route('about', {
    url: '/about'
  , templateUrl: 'home/views/about'
})
@Inject()
//end-non-standard
class about extends AboutController {}

