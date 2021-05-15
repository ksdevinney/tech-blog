// blog posts

// starter code from class
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts });
    } catch (error) {
        console.log('ERROR HERE: ', error);
        res.status(500).json(error);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const onePost = Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'body'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        if (!onePost) {
            res.status(404).json({ message: 'No posts with this id!' });
            return;
        }
        res.status(200).json(onePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/login', async (req, res) => {});

// // router.get('/logout', async (req, res) => {

// // });

// router.get('/signup', async (req, res) => {});

module.exports = router;