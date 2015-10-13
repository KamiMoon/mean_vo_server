var acl = require('acl');

// Using redis backend
//acl = new acl(new acl.redisBackend(redisClient, prefix));

// Or Using the memory backend
acl = new acl(new acl.memoryBackend());

// Or Using the mongodb backend
//acl = new acl(new acl.mongodbBackend(dbInstance, prefix));

// allow guests to view posts
        // acl.allow("guest", "post", "view");

        // // allow registered users to view and create posts
        // acl.allow("registered users", "post", ["view", "create"]);

        // // allow administrators to perform any action on posts
        // acl.allow("administrator", "post", "*");



//how to define:
// acl.allow([
//     {
//         roles:['guest','member'],
//         allows:[
//             {resources:'blogs', permissions:'get'},
//             {resources:['forums','news'], permissions:['get','put','delete']}
//         ]
//     },
//     {
//         roles:['gold','silver'],
//         allows:[
//             {resources:'cash', permissions:['sell','exchange']},
//             {resources:['account','deposit'], permissions:['put','delete']}
//         ]
//     }
// ])

