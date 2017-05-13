'use strict';

var User = require('../models/users.js');
var Image = require('../models/images.js');

function ClickHandler() {
	this.add = (req, res) => {
		console.log('clickHandler add');
		console.log(req.body);
		console.log(req.user);
		Image.findOne({ _id: req.user._id, image: req.body.image }, (err, image) => {
			if (err) { throw err; }
			console.log('Image.findOne result');
			console.log(image);
			if (image === null) {
				console.log('adding image');
				var img = new Image();
				img.userId = req.user._id;
				img.url = req.body.image;
				img.caption = req.body.caption;
				img.likes = 0;
				img.icon = req.user.twitter.icon;
				img.save((err, data) => {
					if (err) { throw err; }
					console.log('img saved');
					console.log(data);
					res.json({ image: data });
				});
			} else {
				res.json({ message: 'Image already exists!' });
			}
		})
	}

	this.all = (req, res) => {
		console.log('clickHandler get all');
		console.log(req.body);
		// var image = new Image();
		// var images = [image]
		// res.json({images: images});
		Image.find((err, images) => {
			if (err) { throw err; }
			console.log('clickHandler all');
			console.log(images);
			res.json({ images });
		})
	}

	this.like = (req, res) => {
		console.log('like');
		console.log(req.body);
	}

	this.delete = (req, res) => {
		console.log('delete');
		console.log(req.body);
	}

	this.update = (req, res) => {
		// console.log('user update');
		// console.log(req.body);

		var type = req.body.type;

		User.findOne({ _id: req.body.id }, (err, user) => {
			if (err) { throw err; }
			// console.log('found user');
			// console.log(type);
			if (type === 'local') {
				if (req.body.name) { user[type].name = req.body.name; }
				if (req.body.password) { user[type].password = req.body.password; }
			}
			if (req.body.city) { user[type].city = req.body.city; }
			if (req.body.state) { user[type].state = req.body.state; }
			user.save((err, data) => {
				if (err) { throw err; }
				// console.log('user saved');
				// console.log(data);
				res.json({ user: data });
			});
		});
	}
}

module.exports = ClickHandler;