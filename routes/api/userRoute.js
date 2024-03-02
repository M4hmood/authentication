const express = require('express');
const router = express.Router();
const user = require('../../controllers/userController');
const verifyToken = require('../../middlewares/authMiddleware');

router.route('/')
    .get(user.getAllUsers)
    .post(user.createUser)
    .patch( user.updateUser)
    .delete(user.deleteUser);

router.route('/:id')
    .get(verifyToken, user.getUser);

module.exports = router;
