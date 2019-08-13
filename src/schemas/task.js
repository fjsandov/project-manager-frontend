import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  priority: Yup.string().required(),
  status: Yup.string().required(),
  deadline: Yup.date(),
});

export default taskSchema;