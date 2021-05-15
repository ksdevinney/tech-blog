// user dashboard
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    Post,
                    attributes: ['username'],
                },
            ],
            attributes: {
                exclude: ['password'],
            },
        });
        const posts = postData.map((post) => post.get({ plain:true }));

        res.render('homepage', { 
            posts,
        logged_in: req.session.logged_in,
     });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        // get one post by id
        const postData = await Post.findOne(req.params.id, {
            include: [
                {
                    model: User,
                    Post,
                    Comment,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        // render it on the homepage
        res.render('homepage', { 
            ...post,
        logged_in: req.session.logged_in,
     });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', async (req, res) => {
// res.render login
});

router.get('/signup', async (req, res) => {

});

// router.get('/logout', async (req, res) => {

// });

module.exports = router;