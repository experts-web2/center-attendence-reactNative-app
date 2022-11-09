import * as yup from 'yup';
export const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('text is required')
      .max(50, 'text is too long')
      .min(3, 'text is too short'),
    password: yup
      .string()
      .min(4, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });