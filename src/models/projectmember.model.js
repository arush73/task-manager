import mongoose from 'mongoose'
import {AvailableUserRoles, userRolesEnum} from "../utils/constants.js"

const projectMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  role: {
    type: String,
    enum: AvailableUserRoles,
    default: userRolesEnum.MEMBER,
  }
})

export const ProjectMember = mongoose.model(
  'ProjectMember',
  projectMemberSchema
)
