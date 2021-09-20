var express = require('express');
const { Mongoose } = require('mongoose');
var router = express.Router();
var User = require('../models/user');

router.post('/api/users', function (req, res, next) {
    
    var user = new User(req.body);
    user.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

router.get('/api/users', function (req, res, next){

    User.find(function(err, users){
        if (err) { return next(err); }
        return res.status(200).json({"users": users});
    });
});

router.delete('/api/users', function (req, res, next){

    User.deleteMany(function(err, users){
        if (err) { return next(err); }
        //TODO: change res message
        return res.status(202).json({"users": users});
    });
});

router.get('/api/users/:id', function (req, res, next){
    
    var id = req.params.id;
     
    User.find({_id: id}, function(err, user){
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        
        var returnedUser = user;
        return res.status(200).json(returnedUser);
    })
})

router.put('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        user.user_id = req.body.user_id;
        user.name = req.body.name;
        user.password = req.body.password;
        user.createdClubIds = req.body.createdClubIds;
        user.clubIds = req.body.clubIds;
        user.eventIds = req.body.eventIds;
        user.save();
        res.json(user);
    });
});

router.patch('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        user.name = (req.body.name || user.name);
        user.password = (req.body.password || user.password);
        user.save();
        res.json(user);
    });
});

router.delete('/api/users/:id', function(req, res, next) {
    
    var id = req.params.id;
    
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        return res.status(202).json(user);
    });
});

module.exports = router;
