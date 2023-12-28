const asyncHandeler = require('express-async-handler');
const Goal = require('../models/goalModel');

// get goals
const getGoals = asyncHandeler(async (req, res) => {
	const goals = await Goal.find();
	res.status(200).json(goals);
});

// set goal
const setGoal = asyncHandeler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('please add a text field');
	}
	const goal = await Goal.create({
		text: req.body.text,
	});
	res.status(200).json(goal);
});

// update goal
const updateGoal = asyncHandeler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal Not Found!');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});

// delete goal
const deleteGoal = asyncHandeler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal Not Found!');
	}

	await Goal.findByIdAndDelete(req.params.id);
	res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
