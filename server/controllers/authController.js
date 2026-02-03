const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, role });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
