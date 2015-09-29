'use strict';

angular.module('meanVoServerApp')
    .service('ControllerUtil', function(Upload) {

        this.postWithUpload = function(uploadObj) {
            return Upload(uploadObj);
        };

    });
