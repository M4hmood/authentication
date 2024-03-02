const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("_id username password");
        if (!users) {
            return res.status(404).json({ message: "there are no users yet" });
        } 
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: "can't load users"});
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId != req.user._id) throw new Error("Unauthorized");
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user data"});
    }
}

const createUser = async (req, res) => {
    
}

const updateUser = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const deleteUser = (req, res) => {
    
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}