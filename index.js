import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Task from './models/tasks.js';

import db from './databases/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.post('/tasks/delete/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  console.log(taskId);
  try {
    const deleteItem = await Task.deleteOne({ _id: taskId });

    if (deleteItem.deletedCount > 0) {
      console.log('Task deleted successfully');
    } else {
      console.log('Task not found or not deleted');
    }
  } catch (error) {
    console.error(error);
  }
  res.redirect('/tasks'); // Move this line here if you want to redirect only if deletion is successful
});
app.post('/tasks', async (req, res) => {
  const newTaskData = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
  };
  //   console.table(newTaskData);
  try {
    const newTask = await Task.create(newTaskData);
    console.log(newTask);
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
  }
});
app.get('/tasks/show/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Find the specific task by ID
    const foundTask = await Task.findById(taskId);

    if (!foundTask) {
      // Handle the case where the task with the specified ID is not found
      return res.status(404).send('Task not found');
    }

    // Find the latest task based on createdAt field
    const latestTask = await Task.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

      console.log(latestTask)
    res.render('show', { task: foundTask, latestTask });
    console.log(foundTask);
  } catch (error) {
    console.error(error);
    // Handle other potential errors, e.g., database connection issues
    res.status(500).send('Internal Server Error');
  }
});

app.get('/add-task', (req, res) => {
  res.render('add-task');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();

    res.render('index', { tasks });
  } catch (error) {
    console.log(error);
    res.send(`<h1>${error}</h1>`);
  }
});
app.use('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
