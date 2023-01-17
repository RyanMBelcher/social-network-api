const { User } = require('../models')

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const user = await User.find();
            return res.json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //  get a single user by id
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });
            return !singleUser
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(singleUser)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // updates a user by id
    async updateUser(req, res) {
        try {
            const userUpdate = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            !userUpdate
                ? res.status(404).json({ message: 'No user with this id! ' })
                : res.json(userUpdate)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // creates a new user
    async createUser(req, res) {
        try {
            const userCreate = await User.create(req.body);
            return res.json(userCreate);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // removes a user by id
    async deleteUser(req, res) {
        try {
            const userDelete = await User.findOneAndRemove({ _id: req.params.userId });
            return res.json(userDelete);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            return !newFriend
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(newFriend)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // removes a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const friendDelete = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            return !friendDelete
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.status(200).json(friendDelete)
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};