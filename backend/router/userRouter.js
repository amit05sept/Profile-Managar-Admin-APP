const express = require("express");
const userController = require("../controllers/userController");
const { profileTypeCheck, idTypeCheck } = require("../middlewares/typeCheck");
const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:profileId", idTypeCheck, userController.getUser);

router.post("/addUser", profileTypeCheck, userController.postAddUser);
router.delete("/deleteUser/:profileId", idTypeCheck, userController.deleteUser);
router.delete("/deleteAllUsers", userController.deleteAllUsers);

module.exports = router;
