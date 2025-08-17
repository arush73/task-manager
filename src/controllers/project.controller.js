import { Project } from '../models/project.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const create = await Project.create({
    name: name,
    description: description,
    createdBy: req.user._id,
  })

  if (!create)
    throw new ApiError(500, 'Something went wrong while creating the project')

  return res
    .status(201)
    .json(new ApiResponse(201, create, 'project created successfully'))
})

const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const getProjects = await Project.find({
    $where: {
      createdBy: userId,
    },
  })
  if (!getProjects)
    throw new ApiError(500, 'something went wrong while fetching the projects')

  return res
    .status(201)
    .json(new ApiResponse(201, getProjects, 'projects fetched successfully'))
})

const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.params

  const getProject = await Project.findById(projectId)
  if (!getProject)
    throw new ApiError(500, 'Someting went wrong while fetching the project')

  return res
    .status(201)
    .json(new ApiResponse(201, getProject, 'project fetched successfully'))
})

const updateProject = asyncHandler(async (req, res) => {
  const projectId = req.params
  const { name, description } = req.body

  const updateProject = await Project.findByIdAndUpdate(projectId, {
    name: name,
    description: description,
  })
  if (!updateProject)
    throw new ApiError(201, 'somthing went wrong while updating the project')

  return res
    .status(201)
    .json(new ApiResponse(201, updateProject, 'project updated successfully'))
})

const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params

  const deleteProject = await Project.findByIdAndDelete(projectId)
  if (!deleteProject)
    throw new ApiError(500, 'Something went wrong while deleting the project')

  return res
    .status(201)
    .json(new ApiResponse(201, {}, 'Project deleted sucessfully'))
})

const updateMemberRole = asyncHandler(async (req, res) => {})
const getProjectMembers = asyncHandler(async (req, res) => {})

export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateMemberRole,
  getProjectMembers,
}
