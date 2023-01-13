const { connect, connection } = require('mongoose');

connect('mongodb://localhost/postsAndThoughts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;