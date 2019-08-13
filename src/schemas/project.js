import * as Yup from 'yup';

const projectSchema = Yup.object().shape({
  name: Yup.string().required(),
  projectType: Yup.string().required(),
  startAt: Yup.date().required(),
  endAt: Yup.date().required(),
});

export default projectSchema;