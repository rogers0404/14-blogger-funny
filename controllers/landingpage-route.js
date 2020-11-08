const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {

  //checking whether the session is created or not
  if (req.session.loggedIn) {
   console.log("\n\n Result = "+req.session.loggedIn+"\n\n");
  }
    else
    {
      req.session.loggedIn = false;
      console.log("\n\n Bad Result= "+req.session.loggedIn+"\n\n");
    }
    

    
    Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        //console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('landingpage', {
            posts,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
            username: req.session.username
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {key: 'Login', action: true, text:'login'});
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup', {key: 'Sign Up', action: false, text:'signup'});
  });

  router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('editPost', {
            post,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/single-post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('comment', {
            post,
            loggedIn: req.session.loggedIn, 
            user_id: req.session.user_id
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  //crerated a route for dashbord
  router.get('/dashboard/:userId', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.params.userId
      },
      order: [['created_at', 'DESC']],
      include: [
      // include the Comment model here:
      {
        model: User,
        attributes: ['username']
      }
    ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
       
        const posts = dbPostData.map(post => post.get({ plain: true }));
        //const post = res.json(dbPostData);
 
        //res.json(dbPostData);
        // pass data to template
         res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
            username:req.session.username
          }); 
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/newPost/:userId', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.params.userId
      },
      order: [['created_at', 'DESC']],
      include: [
      // include the Comment model here:
      {
        model: User,
        attributes: ['username']
      }
    ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
       
        const posts = dbPostData.map(post => post.get({ plain: true }));
        //const post = res.json(dbPostData);
 
        //res.json(dbPostData);
        // pass data to template
         res.render('user-post', {
            posts,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
          }); 
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



  module.exports = router;