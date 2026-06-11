const accountModel = require('../models/account.models');

async function createAccount(req, res) {
    const user = req.body;

    const account = await accountModel.create({
        user: req.user._id,
    });
    res.status(201).json({
        message: "Account created successfully",
        status: "success",
        data: {
            account: account,
        },
    });
}

module.exports = {createAccount};
