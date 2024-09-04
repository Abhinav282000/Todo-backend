const UserDetails = require("../models/UserDetails");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userdata = await UserDetails.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await userdata.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = userdata.generateToken();

        let oldTokens = userdata.tokens || [];
        if (oldTokens.length) {
            oldTokens = oldTokens.filter(t => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                return timeDiff < 86400; // 24 hours in seconds
            });
        }

        oldTokens.push({ token, signedAt: Date.now().toString() });

        await UserDetails.findByIdAndUpdate(
            userdata._id,
            { tokens: oldTokens },
            { new: true } 
              );

        res.status(200).json({
            token,
            user: {
                id: userdata._id,
                name: userdata.name,
                email: userdata.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = signin;
