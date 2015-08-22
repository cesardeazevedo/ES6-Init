'use strict'

import angular from 'angular'
import _ from 'ng-lodash'

var app = angular.module('app', [
    'ui.router'
  , 'ngLodash'
  , 'ngInput'
])

function Module(name, modules) {
    app = angular.module(name, modules || [])
    angular.module('app').requires.push(name)
}

function Run() {
    return (target, key, descriptor) => {
        app.run(descriptor.value)
    }
}

function Config() {
    return (target, key, descriptor) => {
        app.config(descriptor.value)
    }
}

function Inject(...dependencies){
    return (target) => {
        target.$inject = dependencies
    }
}

function Route(stateName, options){
    return (target) => {
        app.config(['$stateProvider', ($stateProvider) => {
            //Add baseUrl
            options.templateUrl = `app/components/${options.templateUrl}`
            $stateProvider.state(stateName, Object.assign({
                controller: target
              , controllerAs: target.name.toLowerCase()
            }, options))
        }])
        app.controller(target.name, target)
    }
}

function Service(options){
    return (target) => {
        if (!options.serviceName) {
            throw new Error('@Service() must contains serviceName property!')
        }
        app.service(options.serviceName, target)
    }
}

function Directive(options){
    return (target) => {
        const directiveName = _.camelCase(options.selector);
        app.directive(directiveName, target.directiveFactory);
    }
}

export default app
export { Module, Run, Config, Route, Inject, Service, Directive }
