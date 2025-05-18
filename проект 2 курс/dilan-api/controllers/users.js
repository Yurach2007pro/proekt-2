const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});
    await user.save();
    res.send(user);
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials.');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('x-auth-token', token).send({token});
};