import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/api-response.js'
import { ApiError } from '../utils/api-error.js'
import { Note } from '../models/note.model.js'

const getNotes = asyncHandler(async (req, res) => {
  // get all notes
  const notes = await Note.find({ project: req.params.projectId })

  if (!notes || notes.length === 0)
    throw new ApiError(404, 'No notes found for this project')

  return res
    .status(200)
    .json(new ApiResponse(201, notes, 'Notes retrieved successfully'))
})

const getNoteById = asyncHandler(async (req, res) => {
  // get note by id
  const { noteId } = req.params

  const note = await Note.findById(noteId)
  if (!note) throw new ApiError(404, 'Note not found')

  return res
    .status(200)
    .json(new ApiResponse(201, note, 'Note retrieved successfully'))
})

const createNote = asyncHandler(async (req, res) => {
  // create note
  const { project, content } = req.body

  const create = await Note.create({
    project: project,
    createdBy: req.user._id,
    content: content,
  })

  if (!create) throw new ApiError(400, 'Failed to create note')

  return res
    .status(201)
    .json(new ApiResponse(201, create, 'Note created successfully'))
})

const updateNote = asyncHandler(async (req, res) => {
  // update note
  const { noteId } = req.params
  const { content } = req.body

  const note = await Note.findByIdandUpdate(noteId, {
    content: content,
  })

  if (!note) throw new ApiError(404, 'Note not found')

  return res
    .status(200)
    .json(new ApiResponse(201, note, 'Note updated successfully'))
})

const deleteNote = asyncHandler(async (req, res) => {
  // delete note
  const { noteId } = req.params

  const note = await Note.findByIdandDelete(noteId)

  if (!note) throw new ApiError(404, 'Note not found')

  return res
    .status(200)
    .json(new ApiResponse(201, note, 'Note deleted successfully'))
})

export {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote
}
