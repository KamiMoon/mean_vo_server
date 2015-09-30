var _ = require('lodash');

var getHostFromRequest = function(req) {
    var host = '';

    if (req && req.headers && req.headers.host) {
        host = req.headers.host;
    }

    return host;
}

exports.getHostFromRequest = getHostFromRequest;

var handleError = function(res, err) {
    return res.status(500).send(err);
};

exports.handleError = handleError;

exports.validationError = function(res, err) {
    return res.status(422).json(err);
};


//in - '/login'
//out - '//localhost:9090/#/login'
exports.redirect = function(req, res, url) {
    var host = getHostFromRequest(req);

    var redirectUrl = 'http://' + host + '/#' + url;
    console.log('Redirecting to: ' + redirectUrl);

    res.redirect(redirectUrl);
};


//Take req.query and return a cleaned object used for query purposes
//Also remove any key that has a value of empty string because that was an empty field
exports.getQuery = function(req) {
    var queryObj = {};

    if (req.query) {
        for (var key in req.query) {
            var value = req.query[key];
            //ignore any key that has an empty string value
            //ignore any key set to a value of null
            if (value !== '' && value !== null) {
                queryObj[key] = value;
            }
        }
    }

    return queryObj;
};

exports.update = function(req, res, modelObj, uploadField) {

    if (req.body._id) {
        delete req.body._id;
    }

    //might be posted with data object
    if (req.body.data && req.body.data._id) {
        delete req.body.data._id;
    }

    modelObj.findById(req.params.id, function(err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }

        var postedUser;

        if (req.body.data) {
            postedUser = JSON.parse(req.body.data);
        } else {
            postedUser = req.body;
        }

        if (uploadField) {
            //photo upload
            var file = req.file;
            if (file) {
                postedUser[uploadField] = file.path;
            }
        }

        var merged = _.merge(user, postedUser);

        merged.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(merged);
        });
    });
};

exports.findByIdAndRemove = function(req, res, modelObj) {
    modelObj.findByIdAndRemove(req.params.id, function(err) {
        if (err) return res.status(500).send(err);
        return res.status(204).send('No Content');
    });
}
