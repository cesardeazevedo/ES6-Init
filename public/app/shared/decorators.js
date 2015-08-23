'use strict'

import angular from 'angular'
import _ from 'lodash'

import 'ng-input'
import 'angular-ui-router'

const baseName = 'app'

var app = angular.module('app', [
    'ui.router'
  , 'ngInput'
])

function Module(name, modules) {
    app = angular.module(name, modules || [])
    angular.module(baseName).requires.push(name)
}

function Bootstrap() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, [baseName])
    })
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
            if(options.templateUrl)
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

function Component(component){
    return (target) => {
        if(!_.isObject(component))
            throw new Error('@Component must be defined')

        if (target.$initView)
            target.$initView(component.selector)
    }
}

function View(view) {

    let options = view

    const defaults = {
        template: options.template
      , restrict: 'E'
      , bindToController: true
    }

    return (target) => {
        if (target.$isComponent)
            throw new Error('@View() must be placed after @Component()!')

        target.$initView = function(directiveName) {
            if (_.isObject(directiveName)) {
                options = directiveName
                directiveName = _.camelCase(target.name)
            } else
                directiveName = _.camelCase(directiveName)

            directiveName = _.camelCase(directiveName)


            options = options || (options = {})
            options.bindToController = options.bindToController || options.bind || {}

            defaults.controllerAs = directiveName

            if(options.templateUrl)
                options.templateUrl = `app/components/${options.templateUrl}`

            app.directive(directiveName, function() {
                return _.assign(defaults, { controller: target }, options)
            });
        };
    }
}

function Directive(options){
    return (target) => {
        const directiveName = _.camelCase(options.selector);
        app.directive(directiveName, target.directiveFactory);
    }
}

export default app
export { Module, Bootstrap, Run, Config, Route, Inject, Service, Component, View }
