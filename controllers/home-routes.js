// main homepage route
const router = require('express').Router();
// import necessary modules and models
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// hardcoded homepage test .. this helps with any, single-post was alike
// router.get('/', (req, res) => {
//     res.render('homepage', {
//         id: 1,
//         post_url: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs', 
//         created_at: new Date(),
//         vote_count: 10, 
//         comments: [{}, {}],
//         user: {
//             username: 'test_user'
//         }
//     });
// });

// we'll use the Sequelize 'Post.findAll()' query set up to return all posts and their nested properties from the 'api/post-routes.js'
router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
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
        // console.log(dbPostData[0]);
        // loop over and map each Sequelize object into a serialized version, saving the results in a new 'posts' array
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template // original
        // res.render('homepage', dbPostData[0].get({ plain: true }));
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
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
    
    res.render('login');
});

// this will route you from homepage to a posts single page
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
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

        // pass data to template / 'loggedIn' value will determine what page they will see. 
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;