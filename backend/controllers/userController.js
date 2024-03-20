const user = require("../model/userModel");

const getAllUsers = async function (req, res) {
  try {
    const profiles = await user.find();
    return res.status(200).json(profiles);
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: true, msg: "internal server error" });
  }
};
const getUser = async function (req, res) {
  try {
    const { profileId } = req.params;
    const profile = await user.findById(profileId);
    if (!profile) {
      throw Error("invalid ID");
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    return res.status(411).json({ error: true, msg: "Invalid ID" });
  }
};

const postAddUser = async function (req, res) {
  try {
    const NewProfile = req.body;
    // console.log(profile);
    const profile = await user.create(NewProfile);
    return res
      .status(200)
      .json({ msg: "profile created", profileId: profile._id });
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: true, msg: "internal server error" });
  }
};
const deleteAllUsers = async function (req, res) {
  try {
    await user.deleteMany({});
    res.status(200).json({ msg: "all records deleted" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: true, msg: "internal server error" });
  }
};
const deleteUser = async function (req, res) {
  try {
    await user.deleteMany({ _id: req.params.profileId });
    res.status(200).json({ msg: "record deleted" });
  } catch (err) {
    console.log(err);
    res.status(411).json({ error: true, msg: "User not found" });
  }
};
module.exports = {
  getAllUsers,
  getUser,
  postAddUser,
  deleteAllUsers,
  deleteUser,
};
