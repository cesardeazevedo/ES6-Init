'use strict'

import angular  from 'angular'

import 'angular-ui-router'
import 'ng-input'

import modules from './shared/decorators'

import './shared/config/routes'
import './components/components'

// Styless
import './styles'

angular.element(document).ready(function() {
    angular.bootstrap(document, [modules.name])
});
