// blog posts

// starter code from class
const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', { posts });
    } catch (error) {
        console.log('ERROR HERE: ', error);
        res.status(500).json(error);
    }
});

// get a single post, with comments
router.get('/post/:id', async (req, res) => { 
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (postData) {
        const post = postData.get({ plain: true });

        res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
            res.status(500).json(err);
        }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        console.log("Login route")
        res.redirect('/');
        return;
    } else {
    res.render('login');
    }
});


router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;