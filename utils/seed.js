// const connection = require('../config/connection');
// const { User, Thought } = require('../models');


// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connected');
//     await User.deleteMany({});

//     await User.collection.insertMany([
//         {
//             username: 'testuser',
//             email: 'testuser@email.com'
//         },
//         {
//             username: 'testuser2',
//             email: 'testuser2@email.com'
//         },
//         {
//             username: 'testuser3',
//             email: 'testuser3@email.com'
//         },
//         {
//             username: 'testuser4',
//             email: 'testuser4@email.com'
//         },
//         {
//             username: 'testuser5',
//             email: 'testuser5@email.com'
//         },
//     ]);

//     await Thought.collection.insertOne({
//         thoughtText: "Here's a cool thought...",
//         username: "testuser2",
//         userId: "5edff358a0fcb779aa7b118b"
//     });

//     console.info('Seeding complete! 🌱');
//     process.exit(0);
// });