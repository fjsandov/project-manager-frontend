import * as Yup from 'yup';

const commentSchema = Yup.object().shape({
  body: Yup.string().required(),
});

export default commentSchema;