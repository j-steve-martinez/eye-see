'use strict';

var User = require('../models/users.js');
var Image = require('../models/images.js');

function ClickHandler() {
	this.add = (req, res) => {
		// console.log('clickHandler add boy');
		// console.log(req.body.image);
		// console.log('req.user');
		// console.log(req.user._id);
		Image.findOne({ userId: req.user._id, url: req.body.image }, (err, image) => {
			if (err) { throw err; }
			// console.log('Image.findOne result');
			// console.log(image);
			if (image === null) {
				// console.log('adding image');
				var img = new Image();
				img.userId = req.user._id;
				img.url = req.body.image;
				img.caption = req.body.caption;
				img.likes = 0;
				img.icon = req.user.twitter.icon;
				img.save((err, image) => {
					if (err) { throw err; }
					// console.log('img saved');
					// console.log(image);
					res.json({route: 'add', image: image });
				});
			} else {
				res.json({route: 'add'});
			}
		})
	}

	this.all = (req, res) => {
		// console.log('clickHandler get all');
		// console.log(req.body);
		Image.find((err, images) => {
			if (err) { throw err; }
			// console.log('clickHandler all');
			// console.log(images);
			res.json({ images });
		})
	}

	this.like = (req, res) => {
		// console.log('like');
		// console.log(req.body);
		// console.log(req.user);
		Image.findOne({ _id: req.body.imageId }, (err, image) => {
			if (err) { throw err; }
			// console.log('image');
			// console.log(image);
			if (image === null) {
				res.end()
			} else {
				if (image.users.indexOf(req.user._id) === -1) {
					/**
					 * User not found so add and update count
					 */
					image.users.push(req.user._id);
					image.likes = image.users.length;
					image.save((err, image) => {
						if (err) { throw err; }
						// console.log('user likes increment');
						// console.log(image);
						res.json({ image, type: req.body.type });
					});
				} else {
					/**
					 * User already liked so remove and update count
					 */
					var filtered = image.users.filter(item => {
						if (item.toString() !== req.user._id.toString()) {
							return item;
						}
					});
					image.users = filtered;
					image.likes = image.users.length;
					// console.log(image);
					image.save((err, image) => {
						if (err) { throw err; }
						// console.log('user likes decrement');
						// console.log(image);
						res.json({ image, type: req.body.type });
					});
				}
			}
			// res.end();
		});
	}

	this.delete = (req, res) => {
		console.log('delete');
		console.log(req.body);
		Image.findByIdAndRemove(req.body.imageId, (err, image) => {
			if (err) { throw err; }
			console.log('deleted image');
			console.log(image);
			if (image === null) {
				res.json({ route: 'delete', imageId: '' })
			} else {
				res.json({ route: req.body.route, imageId: image._id });
			}
		});
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