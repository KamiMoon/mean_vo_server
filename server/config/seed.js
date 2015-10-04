/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var User = require('../api/user/user.model');
var State = require('../api/state/state.model');
var Category = require('../api/category/category.model');
var Interest = require('../api/interest/interest.model');
var Role = require('../api/role/role.model');
var School = require('../api/school/school.model');
var Status = require('../api/status/status.model');


console.log('Running seed.js');

mongoose.connection.collections['users'].drop(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        state_id: 97,
        activated: true
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        state_id: 97,
        activated: true
    }, function() {
        console.log('Populated users');
    });
});


State.find({}).remove(function() {
    State.create({
            "name": 'Alaska',
            "abbrev": 'AK'
        }, {
            "name": 'Alabama',
            "abbrev": 'AL'
        }, {
            "name": 'American Samoa',
            "abbrev": 'AS'
        }, {
            "name": 'Arizona',
            "abbrev": 'AZ'
        }, {
            "name": 'Arkansas',
            "abbrev": 'AR'
        }, {
            "name": 'California',
            "abbrev": 'CA'
        }, {
            "name": 'Colorado',
            "abbrev": 'CO'
        }, {
            "name": 'Connecticut',
            "abbrev": 'CT'
        }, {
            "name": 'Delaware',
            "abbrev": 'DE'
        }, {
            "name": 'District of Columbia',
            "abbrev": 'DC'
        }, {
            "name": 'Federated States of Micronesia',
            "abbrev": 'FM'
        }, {
            "name": 'Florida',
            "abbrev": 'FL'
        }, {
            "name": 'Georgia',
            "abbrev": 'GA'
        }, {
            "name": 'Guam',
            "abbrev": 'GU'
        }, {
            "name": 'Hawaii',
            "abbrev": 'HI'
        }, {
            "name": 'Idaho',
            "abbrev": 'ID'
        }, {
            "name": 'Illinois',
            "abbrev": 'IL'
        }, {
            "name": 'Indiana',
            "abbrev": 'IN'
        }, {
            "name": 'Iowa',
            "abbrev": 'IA'
        }, {
            "name": 'Kansas',
            "abbrev": 'KS'
        }, {
            "name": 'Kentucky',
            "abbrev": 'KY'
        }, {
            "name": 'Louisiana',
            "abbrev": 'LA'
        }, {
            "name": 'Maine',
            "abbrev": 'ME'
        }, {
            "name": 'Marshall Islands',
            "abbrev": 'MH'
        }, {
            "name": 'Maryland',
            "abbrev": 'MD'
        }, {
            "name": 'Massachusetts',
            "abbrev": 'MA'
        }, {
            "name": 'Michigan',
            "abbrev": 'MI'
        }, {
            "name": 'Minnesota',
            "abbrev": 'MN'
        }, {
            "name": 'Mississippi',
            "abbrev": 'MS'
        }, {
            "name": 'Missouri',
            "abbrev": 'MO'
        }, {
            "name": 'Montana',
            "abbrev": 'MT'
        }, {
            "name": 'Nebraska',
            "abbrev": 'NE'
        }, {
            "name": 'Nevada',
            "abbrev": 'NV'
        }, {
            "name": 'New Hampshire',
            "abbrev": 'NH'
        }, {
            "name": 'New Jersey',
            "abbrev": 'NJ'
        }, {
            "name": 'New Mexico',
            "abbrev": 'NM'
        }, {
            "name": 'New York',
            "abbrev": 'NY'
        }, {
            "name": 'North Carolina',
            "abbrev": 'NC'
        }, {
            "name": 'North Dakota',
            "abbrev": 'ND'
        }, {
            "name": 'Northern Mariana Islands',
            "abbrev": 'MP'
        }, {
            "name": 'Ohio',
            "abbrev": 'OH'
        }, {
            "name": 'Oklahoma',
            "abbrev": 'OK'
        }, {
            "name": 'Oregon',
            "abbrev": 'OR'
        }, {
            "name": 'Palau',
            "abbrev": 'PW'
        }, {
            "name": 'Pennsylvania',
            "abbrev": 'PA'
        }, {
            "name": 'Puerto Rico',
            "abbrev": 'PR'
        }, {
            "name": 'Rhode Island',
            "abbrev": 'RI'
        }, {
            "name": 'South Carolina',
            "abbrev": 'SC'
        }, {
            "name": 'South Dakota',
            "abbrev": 'SD'
        }, {
            "name": 'Tennessee',
            "abbrev": 'TN'
        }, {
            "name": 'Texas',
            "abbrev": 'TX'
        }, {
            "name": 'Utah',
            "abbrev": 'UT'
        }, {
            "name": 'Vermont',
            "abbrev": 'VT'
        }, {
            "name": 'Virgin Islands',
            "abbrev": 'VI'
        }, {
            "name": 'Virginia',
            "abbrev": 'VA'
        }, {
            "name": 'Washington',
            "abbrev": 'WA'
        }, {
            "name": 'West Virginia',
            "abbrev": 'WV'
        }, {
            "name": 'Wisconsin',
            "abbrev": 'WI'
        }, {
            "name": 'Wyoming',
            "abbrev": 'WY'
        }, {
            "name": 'Armed Forces Africa',
            "abbrev": 'AE'
        }, {
            "name": 'Armed Forces Americas {except Canada}',
            "abbrev": 'AA'
        }, {
            "name": 'Armed Forces Canada',
            "abbrev": 'AE'
        }, {
            "name": 'Armed Forces Europe',
            "abbrev": 'AE'
        }, {
            "name": 'Armed Forces Middle East',
            "abbrev": 'AE'
        }, {
            "name": 'Armed Forces Pacific',
            "abbrev": 'AP'
        }

    );
});

Category.find({}).remove(function() {
    Category.create({
        "name": 'School'
    }, {
        "name": 'Non-Profit'
    }, {
        "name": 'Corporation'
    }, {
        "name": 'Government'
    });
});

Interest.find({}).remove(function() {
    Interest.create({
        "name": 'Animals'
    }, {
        "name": 'Construction'
    }, {
        "name": 'Health'
    }, {
        "name": 'Education'
    });
});

Role.find({}).remove(function() {
    Role.create({
        "name": 'VO Admin'
    }, {
        "name": 'Organization Admin Primary'
    }, {
        "name": 'Organization Admin Secondary'
    }, {
        "name": 'Student'
    });
});

School.find({}).remove(function() {
    School.create({
        "name": 'Millard North High School'
    }, {
        "name": 'Millard South High School'
    }, {
        "name": 'Millard West High School'
    }, {
        "name": 'Millard Horizon High School'
    });
});

Status.find({}).remove(function() {
    Status.create({
        "name": 'Pending'
    }, {
        "name": 'Approved'
    }, {
        "name": 'Dissaproved'
    });
});

console.log('DONE - Running seed.js');
