var getHostFromRequest = function(req) {
    var host = '';

    if (req && req.headers && req.headers.host) {
        host = req.headers.host;
    }

    return host;
}

exports.getHostFromRequest = getHostFromRequest;

exports.handleError = function(res, err) {
    return res.status(500).send(err);
};

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
