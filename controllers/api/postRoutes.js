const router = require('express').Router();
const { Post, User } = require('../../models');

// create a post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// view all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      attributes: [
        'id',
        'title',
        'body'
      ],
      // order,
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'body'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    if (!allPosts) {
      res.status(404).json({ message: 'No posts to show! Create one?' });
      return;
    }
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// view one post
router.get('/:id', async (req, res) => {
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
})

// edit
router.put('/:id', async (req, res) => {
  try {
    const editPost = await Post.update({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'body'
      ],
    })
    if (!editPost) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }
    res.status(200).json(editPost);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
