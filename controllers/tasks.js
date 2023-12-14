const asyncWrapper = require('../middleware/asyncWrapper')
const client = require('../db/connect')
const { createCustomError } = require('../errors/CustomError')
const ObjectId = require('mongodb').ObjectId;
const db = client.db('acme').collection('tasks')

const setAllTasks = asyncWrapper(async(req, res) => {
  const tasks = await db.find().toArray()
  res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async(req, res) => {
  const task = await db.insertOne(req.body)
  res.status(201).json({task});
})

const setTask = asyncWrapper(async(req, res) => {
    const task = await db.findOne({ _id: new ObjectId(req.params.id)})
    if(!task) throw new Error('Task not found')
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async(req, res, next) => {
  const task = await db.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set:
        {
          name: req.body.name,
          completed: req.body.completed
        }
    },
    {
      new: true,
      runValidators: true,
    })
  if (!task) {
    return next(createCustomError(`No task`, 404))
  }
  res.status(201).json({ task })
})

const deleteTask = asyncWrapper(async(req, res) => {
  const task = await db.deleteOne({ _id: new ObjectId(req.params.id) })
  if(!task) res.status(404).json({msg: 'Task not found'})
  res.status(200).json({ task });
})

module.exports = {
  setAllTasks,
  createTask,
  setTask,
  updateTask,
  deleteTask
}
