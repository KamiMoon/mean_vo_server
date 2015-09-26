'use strict';

/**
Wrapper directive over angular and bootstrap form elements because they are way too verbose

*/

angular.module('meanVoServerApp')
    .directive('bInput', function($compile) {

        function getNameFromModelString(modelString) {
            return modelString.substr(modelString.indexOf('.') + 1);
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function getDefaultRequiredMessage(name) {
            return capitalizeFirstLetter(name) + ' is required.';
        }

        function getDefaultMinLengthMessage(name, minLength) {
            return capitalizeFirstLetter(name) + ' must be at least ' + minLength + ' characters.';
        }

        function getDefaultMaxLengthMessage(name, maxLength) {
            return capitalizeFirstLetter(name) + ' can only be ' + maxLength + ' characters.';
        }

        function getDefaultMinAndMaxLengthMessage(name, minLength, maxLength) {
            return capitalizeFirstLetter(name) + ' must be between ' + minLength + ' and ' + maxLength + ' characters.';
        }

        function getDefaultEmailFormatMessage() {
            return 'Invalid email.';
        }

        var getTemplate = function(attrs) {
            var html = '';

            if (attrs.type === 'submit') {
                html += '<button type="submit" class="btn btn-primary">' + attrs.label + '</button>';
            } else {

                html += '<div class="form-group';
                /*if (attrs.required) {
                    html += ' required';
                }*/
                html += '"';
                if (attrs.name) {
                    var someClass = "";
                    someClass += "{ 'has-success': form." + attrs.name + ".$valid && submitted,";
                    someClass += " 'has-error': form." + attrs.name + ".$invalid && submitted }";

                    html += ' ng-class="' + someClass + '"';
                }
                html += '>';
                html += '<label>' + attrs.label + '</label>';
                html += '<input type="' + attrs.type + '"';
                if (attrs.model) {
                    html += ' ng-model="' + attrs.model + '"';
                }
                html += ' class="form-control"';
                if (attrs.required) {
                    html += ' required="true" ';
                }
                if (attrs.name) {
                    html += ' name="' + attrs.name + '" ';
                }
                if (attrs.minlength) {
                    html += ' ng-minlength="' + attrs.minlength + '" ';
                }
                if (attrs.maxlength) {
                    html += ' ng-maxlength="' + attrs.maxlength + '" ';
                }

                html += '/>';
                if (attrs.name) {

                    if (attrs.required) {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.required && submitted">';
                        html += getDefaultRequiredMessage(attrs.name) + '</p>';
                    }

                    if (attrs.minlength && !attrs.maxlength) {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.minlength && submitted">';
                        html += getDefaultMinLengthMessage(attrs.name, attrs.minlength) + '</p>';
                    }

                    if (attrs.maxlength && !attrs.minlength) {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.maxlength && submitted">';
                        html += getDefaultMaxLengthMessage(attrs.name, attrs.maxlength) + '</p>';
                    }

                    if (attrs.maxlength && attrs.minlength) {
                        html += '<p class="help-block" ng-show="(form.' + attrs.name + '.$error.maxlength || form.' + attrs.name + '.$error.minlength) && submitted">';
                        html += getDefaultMinAndMaxLengthMessage(attrs.name, attrs.minlength, attrs.maxlength) + '</p>';
                    }

                    if (attrs.type === 'email') {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.email && submitted">';
                        html += getDefaultEmailFormatMessage() + '</p>';
                    }

                    html += '<p class="help-block" ng-if="errors.' + attrs.name + '">';
                    html += '{{errors.' + attrs.name + '}}</p>';
                }

                html += '</div>';
            }

            return html;
        };


        return {
            restrict: 'E',
            replace: true,
            scope: false,
            link: function(scope, element, attrs) {

                //default values
                attrs.label = attrs.label || '';
                attrs.type = attrs.type || 'text';

                var nameLabel = '';
                if (attrs.model) {
                    nameLabel = getNameFromModelString(attrs.model);
                }

                //get the name attribue from the model attribute if it is there and no name
                if (attrs.model && !attrs.name) {
                    attrs.name = nameLabel;
                }
                //get the label name from the model attribue if it is there and no label
                if (attrs.model && !attrs.label) {
                    attrs.label = capitalizeFirstLetter(nameLabel);
                }

                //default label for submit buttons
                if (attrs.type === 'submit' && !attrs.label) {
                    attrs.label = 'Submit';
                }

                element.html(getTemplate(attrs));

                $compile(element.contents())(scope);
            }
        };
    });