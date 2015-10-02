'use strict';

/**
Wrapper directive over angular and bootstrap form elements because they are way too verbose

*/

angular.module('meanVoServerApp')
    .directive('bInput', function($compile, InputService) {

        function getNameFromModelString(modelString) {
            var index = modelString.indexOf('.');

            if (index !== -1) {
                return modelString.substr(index + 1);
            }

            //there was no '.' so just use directly
            return modelString;
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

        function wrapInBoostrapForm(attrs, inputHtml) {
            var html = '';

            html += '<div class="form-group">';
            html += '<label class="col-lg-2 control-label">' + attrs.label + '</label>';
            html += '<div class="col-lg-10">';
            html += inputHtml;
            html += '</div></div>';

            return html;
        }

        var getTemplate = function(attrs) {
            var html = '';

            if (attrs.type === 'submit') {
                html += '<button type="submit" class="btn btn-primary">' + attrs.label + '</button>';
            } else if (attrs.type === 'file') {

                html += '<input type="file" ngf-select ';
                html += ' class="form-control"';
                if (attrs.model) {
                    html += ' ng-model="' + attrs.model + '"';
                }

                if (attrs.name) {
                    html += ' name="' + attrs.name + '" ';
                }
                html += ' accept="image/*" ngf-max-size="2MB" />';

                html = wrapInBoostrapForm(attrs, html);
            } else if (attrs.type === 'select') {
                html += '<select ';
                if (attrs.model) {
                    html += ' ng-model="' + attrs.model + '"';
                }
                if (attrs.name) {
                    html += ' name="' + attrs.name + '" ';
                }
                if (attrs.options) {
                    html += ' ng-options="' + attrs.options + '" ';
                }
                html += "></select>";

                html = wrapInBoostrapForm(attrs, html);
            } else {

                html += '<div class="form-group';
                if (attrs.required) {
                    html += ' required';
                }
                html += '"';
                if (attrs.name) {
                    var someClass = "";
                    someClass += "{ 'has-success': form." + attrs.name + ".$valid && submitted,";
                    someClass += " 'has-error': (form." + attrs.name + ".$invalid && submitted) || errors." + attrs.name + " }";

                    html += ' ng-class="' + someClass + '"';
                }
                html += '>';
                html += '<label class="col-lg-2 control-label">' + attrs.label + '</label>';
                html += '<div class="col-lg-10">';
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
                        html += getDefaultRequiredMessage(attrs.label) + '</p>';
                    }

                    if (attrs.minlength && !attrs.maxlength) {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.minlength && submitted">';
                        html += getDefaultMinLengthMessage(attrs.label, attrs.minlength) + '</p>';
                    }

                    if (attrs.maxlength && !attrs.minlength) {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.maxlength && submitted">';
                        html += getDefaultMaxLengthMessage(attrs.label, attrs.maxlength) + '</p>';
                    }

                    if (attrs.maxlength && attrs.minlength) {
                        html += '<p class="help-block" ng-show="(form.' + attrs.name + '.$error.maxlength || form.' + attrs.name + '.$error.minlength) && submitted">';
                        html += getDefaultMinAndMaxLengthMessage(attrs.label, attrs.minlength, attrs.maxlength) + '</p>';
                    }

                    if (attrs.type === 'email') {
                        html += '<p class="help-block" ng-show="form.' + attrs.name + '.$error.email && submitted">';
                        html += getDefaultEmailFormatMessage() + '</p>';
                    }

                    html += '<p class="help-block" ng-if="errors.' + attrs.name + '">';
                    html += '{{errors.' + attrs.name + '}}</p>';
                }
                html += '</div>';
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

                //lookup Data based on source if needed
                if (attrs.type === 'select' && attrs.source) {

                    switch (attrs.source) {
                        case 'state':
                            scope.states = [];

                            InputService.getStates().then(function(states) {
                                scope.states = states;
                            });

                            attrs.options = "state._id as state.abbrev for state in states";
                            break;
                    }

                }

                element.html(getTemplate(attrs));

                $compile(element.contents())(scope);
            }
        };
    });
