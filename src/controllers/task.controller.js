import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/api-response'
import { ApiError } from '../utils/api-error'
import { Task } from '../models/task.model.js'
import { SubTask } from '../models/subtask.model.js'

// get all tasks
const getTasks = asyncHandler(async (req, res) => {
  // get all tasks
})

// get task by id
const getTaskById = async (req, res) => {
  // get task by id
}

// create task
const createTask = asyncHandler(async (req, res) => {
  // create task
  const { title, description, status } = req.body

  const projectId = ''

  const create = await Task.create({
    title: title,
    description: description,
    assignedBy: req.user._id,
    project: projectId,
    attachments: [],
  })

  if (!create)
    throw new ApiError(500, 'something went wrong while creating the task')

  return res
    .status(201)
    .json(new ApiResponse(201, create, 'task created successfully'))
})
// update task
const updateTask = asyncHandler(async (req, res) => {
  // update task
    const taskId = req.params
  const { title, description, status } = req.body

    
    const projectId = ""

    const update = await Task.findByIdAndUpdate(taskId, {
      title: title,
      description: description,
      assignedBy: req.user._id,
      project: projectId,
      attachments: [],
    })
  if (!update)
    throw new ApiError(500, 'Something went wrong while updating the task')

  return res
})

// delete task
const deleteTask = asyncHandler(async (req, res) => {
    // delete task
    const projectId = req.params
    const deleteTask = await Task.findByIdAndDelete(projectId)
    if (!deleteTask)
      throw new ApiError(500, 'Something went wrong while deleting the task')

    return res
      .status(200)
      .json(new ApiResponse(200, deleteTask, 'task deleted successfully'))
})

// create subtask
const createSubTask = asyncHandler(async (req, res) => {
    // create subtask
    const {title, taskId} = req.body

    const create = await SubTask.create({
      title: title,
      task: taskId,
      createdBy: req.user._id,
    })

    if(!create) throw new ApiError(500, 'Something went wrong while creating the subtask')

    return res
      .status(201)
      .json(new ApiResponse(201, create, 'subtask created successfully'))
})

// update subtask
const updateSubTask = asyncHandler(async (req, res) => {
    // update subtask
    const subTaskId = req.params
    const { title, isCompleted } = req.body

    const update = await SubTask.findByIdAndUpdate(subTaskId, {
      title: title,
      isCompleted: isCompleted,
      createdBy: req.user._id,
    })

    if (!update)
      throw new ApiError(500, 'Something went wrong while updating the subtask')

    return res
      .status(200)
      .json(new ApiResponse(200, update, 'subtask updated successfully'))
})

// delete subtask
const deleteSubTask = asyncHandler(async (req, res) => {
    // delete subtask
    const subTaskId = req.params

    const deleteSubTask = await SubTask.findByIdAndDelete(subTaskId)
    if (!deleteSubTask)
      throw new ApiError(500, 'Something went wrong while deleting the subtask')

    return res
      .status(200)
      .json(new ApiResponse(200, deleteSubTask, 'subtask deleted successfully'))
})

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
}
