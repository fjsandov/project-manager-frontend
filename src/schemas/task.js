import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  priority: Yup.string().oneOf(['high', 'medium', 'low']).required(),
  status: Yup.string().oneOf(['pending', 'working', 'done']).required(),
  deadline: Yup.date(),
});

export default taskSchema;