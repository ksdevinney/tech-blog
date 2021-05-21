const router = require('express').Router();
const { User } = require('../../models');

// create a new user
router.post('/', async (req, res) => {
  console.log("Signup",req.body)
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// existing user log in
router.post('/login', async (req, res) => {
  console.log("login route")
  try {
    const userData = await User.findOne({ 
      where: { 
        username: req.body.username 
      }, 
    });

    if (!userData) {
      res.status(400).json({ message: 'User not found. Please create an account.' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Welcome back!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// log out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
