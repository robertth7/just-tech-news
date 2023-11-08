// main homepage route
const router = require('express').Router();
// import necessary modules and models
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// hardcode homepage test
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
        res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;