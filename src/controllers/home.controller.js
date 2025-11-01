import User from "../models/user.js";

export const getHomepage = async (req, res) => {
    const results = await User.find({});
    return res.render("home.ejs", {
        users: results
    });
};

export const postCreateUser = async (req, res) => {
    const { email, name, city } = req.body;
    await User.create({ email, name, city });
    res.redirect('/');
};

export const getCreatePage = (req, res) => {
    res.render('create.ejs');
};

export const getUpdatePage = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).exec();
    res.render('edit.ejs', { user });
};

export const postUpdateUser = async (req, res) => {
    const userId = req.body.userId;
    const { email, name, city } = req.body;
    await User.updateOne({ _id: userId }, { email, name, city });
    res.redirect('/');
};

export const postDeleteUser = async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.redirect('/');
};
