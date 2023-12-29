const asyncHandeler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel')


// get goals
const getGoals = asyncHandeler(async(req, res) => {
	const goals = await Goal.find({user:req.user.id});
	res.status(200).json(goals);
});

// set goal
const setGoal = asyncHandeler(async(req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('please add a text field');
	}
	const goal = await Goal.create({
		text: req.body.text,
		user:req.user.id
	});
	res.status(200).json(goal);
});

// update goal
const updateGoal = asyncHandeler(async(req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal Not Found!');
	}

	const user = await User.findById(req.user.id)

	// check for user

	if(!user){
		res.status(401)
		throw new Error('User not found')
	}

	// check if logged in user matches to goal user
	if(goal.user.toString() !== user.id){
		res.status(401)
		throw new Error('User not authorized')

	}
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});

// delete goal
const deleteGoal = asyncHandeler(async(req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal Not Found!');
	}
	const user = await User.findById(req.user.id)

	// check for user

	if(!user){
		res.status(401)
		throw new Error('User not found')
	}

	// check if logged in user matches to goal user
	if(goal.user.toString() !== user.id){
		res.status(401)
		throw new Error('User not authorized')

	}

	await Goal.findByIdAndDelete(req.params.id);
	res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
