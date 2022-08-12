import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import style from '../../common/FormsControls/formsControl.module.css';

const NewMessageForm = (props) => {
  const formik = useFormik({
    initialValues: {
      newMessageBody: '',
    },
    validationSchema: Yup.object({
      newMessageBody: Yup.string().max(300, 'Too much message'),
    }),
    onSubmit: (values) => {
      props.sendMessage(values.newMessageBody);
    },
  });
  return (
    <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
      <Form>
        <div
          className={
            formik.errors.newMessageBody &&
            formik.touched.newMessageBody &&
            style.error
          }
        >
          <textarea
            className={style.messageForm}
            name='newMessageBody'
            id='newMessageBody'
            placeholder='Enter your message'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newMessageBody}
          />
          {formik.errors.newMessageBody && formik.touched.newMessageBody && (
            <span>{formik.errors.newMessageBody}</span>
          )}
        </div>
        <button type='submit'>Send message</button>
      </Form>
    </Formik>
  );
};
export default NewMessageForm;
