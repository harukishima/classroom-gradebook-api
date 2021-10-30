import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const classroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: String,
    description: String,
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model('Classroom', classroomSchema, 'Classroom');

export default Classroom;

export const getListClassroom = async () => {
  const listClassroom = await Classroom.find({});
  return listClassroom;
};

export const createClassroom = async (data) => {
  return Classroom.create(data);
};
