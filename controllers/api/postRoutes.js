const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../util/auth');

// create a post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// view all posts
// not sure I need this here?
// router.get('/', async (req, res) => {
//   try {
//     const allPosts = await Post.findAll({
//       attributes: [
//         'id',
//         'title',
//         'body'
//       ],
//       // order,
//       include: [
//         {
//           model: User,
//           attributes: ['username']
//         },
//         {
//           model: Comment,
//           attributes: ['id', 'body'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         }
//       ]
//     })
//     if (!allPosts) {
//       res.status(404).json({ message: 'No posts to show! Create one?' });
//       return;
//     }
//     res.status(200).json(allPosts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // // view one post
// router.get('/:id', async (req, res) => {
//   try {
//     const onePost = Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'body'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comment,
//         attributes: ['id'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       }
//     ]
//   })
//   if (!onePost) {
//     res.status(404).json({ message: 'No posts with this id!' });
//     return;
//   }
//   res.status(200).json(onePost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

// // edit
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (affectedRows > 0) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
