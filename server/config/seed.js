/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var State = require('../api/state/state.model');
var Category = require('../api/category/category.model');
var Interest = require('../api/interest/interest.model');
var Role = require('../api/role/role.model');
var School = require('../api/school/school.model');
var Status = require('../api/status/status.model');


console.log('Running seed.js');

/*
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});*/


State.find({}).remove(function() {
    State.create({
            "_id": 66,
            "name": 'Alaska',
            "abbrev": 'AK'
        }, {
            "_id": 67,
            "name": 'Alabama',
            "abbrev": 'AL'
        }, {
            "_id": 68,
            "name": 'American Samoa',
            "abbrev": 'AS'
        }, {
            "_id": 69,
            "name": 'Arizona',
            "abbrev": 'AZ'
        }, {
            "_id": 70,
            "name": 'Arkansas',
            "abbrev": 'AR'
        }, {
            "_id": 71,
            "name": 'California',
            "abbrev": 'CA'
        }, {
            "_id": 72,
            "name": 'Colorado',
            "abbrev": 'CO'
        }, {
            "_id": 73,
            "name": 'Connecticut',
            "abbrev": 'CT'
        }, {
            "_id": 74,
            "name": 'Delaware',
            "abbrev": 'DE'
        }, {
            "_id": 75,
            "name": 'District of Columbia',
            "abbrev": 'DC'
        }, {
            "_id": 76,
            "name": 'Federated States of Micronesia',
            "abbrev": 'FM'
        }, {
            "_id": 77,
            "name": 'Florida',
            "abbrev": 'FL'
        }, {
            "_id": 78,
            "name": 'Georgia',
            "abbrev": 'GA'
        }, {
            "_id": 79,
            "name": 'Guam',
            "abbrev": 'GU'
        }, {
            "_id": 80,
            "name": 'Hawaii',
            "abbrev": 'HI'
        }, {
            "_id": 81,
            "name": 'Idaho',
            "abbrev": 'ID'
        }, {
            "_id": 82,
            "name": 'Illinois',
            "abbrev": 'IL'
        }, {
            "_id": 83,
            "name": 'Indiana',
            "abbrev": 'IN'
        }, {
            "_id": 84,
            "name": 'Iowa',
            "abbrev": 'IA'
        }, {
            "_id": 85,
            "name": 'Kansas',
            "abbrev": 'KS'
        }, {
            "_id": 86,
            "name": 'Kentucky',
            "abbrev": 'KY'
        }, {
            "_id": 87,
            "name": 'Louisiana',
            "abbrev": 'LA'
        }, {
            "_id": 88,
            "name": 'Maine',
            "abbrev": 'ME'
        }, {
            "_id": 89,
            "name": 'Marshall Islands',
            "abbrev": 'MH'
        }, {
            "_id": 90,
            "name": 'Maryland',
            "abbrev": 'MD'
        }, {
            "_id": 91,
            "name": 'Massachusetts',
            "abbrev": 'MA'
        }, {
            "_id": 92,
            "name": 'Michigan',
            "abbrev": 'MI'
        }, {
            "_id": 93,
            "name": 'Minnesota',
            "abbrev": 'MN'
        }, {
            "_id": 94,
            "name": 'Mississippi',
            "abbrev": 'MS'
        }, {
            "_id": 95,
            "name": 'Missouri',
            "abbrev": 'MO'
        }, {
            "_id": 96,
            "name": 'Montana',
            "abbrev": 'MT'
        }, {
            "_id": 97,
            "name": 'Nebraska',
            "abbrev": 'NE'
        }, {
            "_id": 98,
            "name": 'Nevada',
            "abbrev": 'NV'
        }, {
            "_id": 99,
            "name": 'New Hampshire',
            "abbrev": 'NH'
        }, {
            "_id": 100,
            "name": 'New Jersey',
            "abbrev": 'NJ'
        }, {
            "_id": 101,
            "name": 'New Mexico',
            "abbrev": 'NM'
        }, {
            "_id": 102,
            "name": 'New York',
            "abbrev": 'NY'
        }, {
            "_id": 103,
            "name": 'North Carolina',
            "abbrev": 'NC'
        }, {
            "_id": 104,
            "name": 'North Dakota',
            "abbrev": 'ND'
        }, {
            "_id": 105,
            "name": 'Northern Mariana Islands',
            "abbrev": 'MP'
        }, {
            "_id": 106,
            "name": 'Ohio',
            "abbrev": 'OH'
        }, {
            "_id": 107,
            "name": 'Oklahoma',
            "abbrev": 'OK'
        }, {
            "_id": 108,
            "name": 'Oregon',
            "abbrev": 'OR'
        }, {
            "_id": 109,
            "name": 'Palau',
            "abbrev": 'PW'
        }, {
            "_id": 110,
            "name": 'Pennsylvania',
            "abbrev": 'PA'
        }, {
            "_id": 111,
            "name": 'Puerto Rico',
            "abbrev": 'PR'
        }, {
            "_id": 112,
            "name": 'Rhode Island',
            "abbrev": 'RI'
        }, {
            "_id": 113,
            "name": 'South Carolina',
            "abbrev": 'SC'
        }, {
            "_id": 114,
            "name": 'South Dakota',
            "abbrev": 'SD'
        }, {
            "_id": 115,
            "name": 'Tennessee',
            "abbrev": 'TN'
        }, {
            "_id": 116,
            "name": 'Texas',
            "abbrev": 'TX'
        }, {
            "_id": 117,
            "name": 'Utah',
            "abbrev": 'UT'
        }, {
            "_id": 118,
            "name": 'Vermont',
            "abbrev": 'VT'
        }, {
            "_id": 119,
            "name": 'Virgin Islands',
            "abbrev": 'VI'
        }, {
            "_id": 120,
            "name": 'Virginia',
            "abbrev": 'VA'
        }, {
            "_id": 121,
            "name": 'Washington',
            "abbrev": 'WA'
        }, {
            "_id": 122,
            "name": 'West Virginia',
            "abbrev": 'WV'
        }, {
            "_id": 123,
            "name": 'Wisconsin',
            "abbrev": 'WI'
        }, {
            "_id": 124,
            "name": 'Wyoming',
            "abbrev": 'WY'
        }, {
            "_id": 125,
            "name": 'Armed Forces Africa',
            "abbrev": 'AE'
        }, {
            "_id": 126,
            "name": 'Armed Forces Americas {except Canada}',
            "abbrev": 'AA'
        }, {
            "_id": 127,
            "name": 'Armed Forces Canada',
            "abbrev": 'AE'
        }, {
            "_id": 128,
            "name": 'Armed Forces Europe',
            "abbrev": 'AE'
        }, {
            "_id": 129,
            "name": 'Armed Forces Middle East',
            "abbrev": 'AE'
        }, {
            "_id": 130,
            "name": 'Armed Forces Pacific',
            "abbrev": 'AP'
        }

    );
});

Category.find({}).remove(function() {
    Category.create({
        "_id": 1,
        "name": 'School'
    }, {
        "_id": 2,
        "name": 'Non-Profit'
    }, {
        "_id": 3,
        "name": 'Corporation'
    }, {
        "_id": 4,
        "name": 'Government'
    });
});

Interest.find({}).remove(function() {
    Interest.create({
        "_id": 1,
        "name": 'Animals'
    }, {
        "_id": 2,
        "name": 'Construction'
    }, {
        "_id": 3,
        "name": 'Health'
    }, {
        "_id": 4,
        "name": 'Education'
    });
});

Role.find({}).remove(function() {
    Role.create({
        "_id": 1,
        "name": 'VO Admin'
    }, {
        "_id": 2,
        "name": 'Organization Admin Primary'
    }, {
        "_id": 3,
        "name": 'Organization Admin Secondary'
    }, {
        "_id": 4,
        "name": 'Student'
    });
});

School.find({}).remove(function() {
    School.create({
        "_id": 500,
        "name": 'Millard North High School'
    }, {
        "_id": 501,
        "name": 'Millard South High School'
    }, {
        "_id": 502,
        "name": 'Millard West High School'
    }, {
        "_id": 503,
        "name": 'Millard Horizon High School'
    });
});

Status.find({}).remove(function() {
    Status.create({
        "_id": 1,
        "name": 'Pending'
    }, {
        "_id": 2,
        "name": 'Approved'
    }, {
        "_id": 3,
        "name": 'Dissaproved'
    });
});

console.log('DONE - Running seed.js');