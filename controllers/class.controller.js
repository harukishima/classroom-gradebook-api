import Classroom, {
  createClassroom,
  getListClassroom,
} from '../models/Classroom.model.js';
import config from '../config/index.js';

export const getAllClassroom = async (req, res) => {
  const listClassroom = await getListClassroom();
  res.status(200).json(listClassroom);
};

export const createClass = async (req, res) => {
  const { name, description, subject } = req.body;
  const teacher = req.jwt.data._id;
  const newClass = new Classroom({
    name,
    description,
    subject,
    teacher,
  });
  const classroom = await createClassroom(newClass);
  res.status(201).json(classroom);
};

export const getClass = async (req, res) => {
  const { id } = req.params;
  const classroom = await Classroom.findById(id);
  res.status(200).json(classroom);
};

export const patchClass = async (req, res) => {
  const { id } = req.params;
  const classroom = await Classroom.findById(id);
  if (
    classroom.teacher.toString() !== req.jwt.data._id &&
    !(req.jwt.data.permissionLevel & config.permission.CLASSROOM_MANAGER)
  ) {
    return res.status(403).json({
      message: 'You are not allowed to update this class',
    });
  }
  Object.assign(classroom, req.body);
  await classroom.save();
  res.status(200).json(classroom);
};

export const removeClass = async (req, res) => {
  const { id } = req.params;
  const classroom = await Classroom.findById(id);
  if (
    classroom.teacher.toString() !== req.jwt.data._id &&
    !(req.jwt.data.permissionLevel & config.permission.CLASSROOM_MANAGER)
  ) {
    return res.status(403).json({
      message: 'You are not allowed to delete this class',
    });
  }
  await classroom.remove();
  res.status(204).send();
};
