const express = require("express");
const router = express.Router();
const User = require("./user");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
const upload = multer({ storage: storage })

router.get("/users", (req, res) => {
	console.log("Запрос GET достиг 4000 порта", req.body);
	User.find({})
		.then(user => {
			console.log('Полный список', user);
			console.log('req.body', req.body);
			res.send(user);
		})
});

router.get("/users/:id", (req, res) => {
	console.log("Запрос GET достиг 4000 порта", req.body);
	User.findOne({_id: req.params.id})
	.then(user => {
		res.send(user)
	})
});

router.put("/users/:id", (req, res) => {
	User.findByIdAndUpdate({_id: req.params.id}, req.body)
		.then(() => {
			console.log('Произведено изменение БД');
			console.log('req.body', req.body);
			User.findOne({_id: req.params.id})
			.then(user => {
				res.send(user)
			})
		})
});

router.post("/users", (req, res) => {
	console.log('req.body', req.body);
	User.create(req.body)
		.then(user => {
			res.send(user);
		});
});

router.post("/get_user", (req, res) => {
	console.log('req.body', req.body);
	User.findOne(
		{
		 $and: [
				{ email : req.body.email },
				{ password: req.body.password }
			  ]
		}
	)
		.then(user => {
			console.log('user', user);
			res.send(user);
		});
});

router.delete("/users/:id", (req, res) => {
	User.deleteOne({_id: req.params.id})
		.then(user => {
			res.send(user)
		})
});

module.exports = router;