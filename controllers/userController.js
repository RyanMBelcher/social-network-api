// You got this bro

// getUsers,
// .find()
// getSingleUser,
// .findOne()
// createUser,
// .create()
// deleteUser,
// .findOneAndRemove()
// addFriend,
// .findOneAndUpdate() ??? { $addToSet }
// removeFriend,
// .findOneAndUpdate() ??? { $pull }

const { User } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const user = await User.find();
            console.log(user);
            return res.json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

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

    async createUser(req, res) {
        try {
            const userCreate = await User.create(req.body);
            return res.json(userCreate);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async deleteUser(req, res) {
        try {
            const userDelete = await User.findOneAndRemove({ _id: req.params.userId });
            return res.json(userDelete);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            )
            return !newFriend
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(newFriend)
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async removeFriend(req, res) {
        try {
            const friendDelete = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            return !friendDelete
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(friendDelete)
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};