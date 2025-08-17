import { asyncHandler } from '../utils/asyncHandler.js'

const createProject = asyncHandler(async (req, res) => {})
const getProjects = asyncHandler(async (req, res) => {})
const getProjectById = asyncHandler(async (req, res) => {})
const updateProject = asyncHandler(async (req, res) => {})
const deleteProject = asyncHandler(async (req, res) => {})
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
