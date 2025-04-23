
const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const router = express.Router();

router.get('/', auth, role(['admin']), getUsers);
router.delete('/:id', auth, role(['admin']), deleteUser);

module.exports = router;
