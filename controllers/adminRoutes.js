// user dashboard
const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../util/auth');

// should be posts only by this user
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('/login');
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // get one post by id
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/login', async (req, res) => {
    res.render('login', {
        layout: 'dashboard',
    });
});

router.get('/signup', async (req, res) => {
    res.render('signup', {
        layout: 'dashboard',
    });
});

module.exports = router;