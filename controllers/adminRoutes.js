// user dashboard
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'post_text',
                'title',
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const posts = postData.map(post => post.get({ plain:true }));

        res.render('homepage', { posts })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/edit/:id', async (req, res) => {
    
});

router.get('/login', async (req, res) => {

});

router.get('/signup', async (req, res) => {

});

// router.get('/logout', async (req, res) => {

// });