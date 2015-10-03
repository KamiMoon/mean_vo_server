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
            html += inputHtml;
            html += getErrorHandlingHTML(attrs);
            html += '</div></div>';

            return html;
        }

        function getErrorHandlingHTML(attrs) {
            var html = '';

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

            return html;
        }

        var getBasicAttributes = function(attrs) {
            var html = '';

            if (attrs.required) {
                html += ' required="true" ';
            }

            if (attrs.model) {
                html += ' ng-model="' + attrs.model + '" ';
            }

            if (attrs.name) {
                html += ' name="' + attrs.name + '" ';
            }

            if (attrs.class) {
                html += ' class="form-control ' + attrs.class + '" ';
            } else {
                html += ' class="form-control" ';
            }

            if (attrs.style) {
                html += ' style="' + attrs.style + '" ';
            }

            return html;
        };

        var getTemplate = function(attrs) {
            var html = '';

            if (attrs.type === 'submit') {
                html += '<button type="submit" class="btn btn-primary">' + attrs.label + '</button>';
            } else if (attrs.type === 'file') {

                html += '<input type="file" ngf-select ';
                html += getBasicAttributes(attrs);
                html += ' accept="image/*" ngf-max-size="2MB" />';

                html = wrapInBoostrapForm(attrs, html);
            } else if (attrs.type === 'select') {
                html += '<select ';
                if (attrs.multiple) {
                    html += ' multiple="true" ';
                }

                html += getBasicAttributes(attrs);

                if (attrs.options) {
                    html += ' ng-options="' + attrs.options + '" ';
                }
                html += "></select>";

                html = wrapInBoostrapForm(attrs, html);
            } else if (attrs.type === 'textarea') {
                html += '<textarea ';

                html += getBasicAttributes(attrs);

                html += "></textarea>";

                html = wrapInBoostrapForm(attrs, html);
            } else {
                html += '<input type="' + attrs.type + '" ';

                html += getBasicAttributes(attrs);

                if (attrs.minlength) {
                    html += ' ng-minlength="' + attrs.minlength + '" ';
                }
                if (attrs.maxlength) {
                    html += ' ng-maxlength="' + attrs.maxlength + '" ';
                }
                html += '/>';

                html = wrapInBoostrapForm(attrs, html);
            }

            return html;
        };


        var populateDefault = function(key, scope) {
            scope[key] = [];

            InputService.get(key, 'api/' + key).then(function(objs) {
                scope[key] = objs;
            });

            //TODO - this would be cool - but plurals
            // if (attrs) {
            //     attrs.options = key + "._id as " + key + ".name for " + key + "in " + key + "s";
            // }
        };

        var populateSelect = function(attrs, scope) {
            switch (attrs.source) {
                case 'states':
                    populateDefault(attrs.source, scope);
                    attrs.options = "state._id as state.abbrev for state in states";
                    break;
                case 'categories':
                    populateDefault(attrs.source, scope);
                    attrs.options = "category._id as category.name for category in categories";
                    break;
                case 'statuses':
                    populateDefault(attrs.source, scope);
                    attrs.options = "status._id as status.name for status in statuses";
                    break;
                case 'schools':
                    populateDefault(attrs.source, scope);
                    attrs.options = "school._id as school.name for school in schools";
                    break;
                case 'roles':
                    populateDefault(attrs.source, scope);
                    attrs.options = "role._id as role.name for role in roles";
                    break;
                case 'interests':
                    populateDefault(attrs.source, scope);
                    attrs.options = "interest._id as interest.name for interest in interests";
                    break;
            }

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
                    populateSelect(attrs, scope);
                }

                element.html(getTemplate(attrs));

                $compile(element.contents())(scope);
            }
        };
    });
