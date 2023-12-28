const asyncHandeler = require('express-async-handler');

// get goals
const getGoals = asyncHandeler(async (req, res) => {
	res.status(200).json({ message: 'get goals' });
});

// set goal
const setGoal = asyncHandeler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('please add a text field');
	}
	res.status(200).json({ message: 'set goal' });
});

// update goal
const updateGoal = asyncHandeler(async (req, res) => {
	res.status(200).json({ message: `create goal ${req.params.id}` });
});

// delete goal
const deleteGoal = asyncHandeler(async (req, res) => {
	res.status(200).json({ message: `delete goal ${req.params.id}` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
