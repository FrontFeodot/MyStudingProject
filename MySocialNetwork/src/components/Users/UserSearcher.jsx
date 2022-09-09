import { Form, Formik, useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const UserSearcher = (props) => {
  const formik = useFormik({
    initialValues: {
      searchField: '',
      filter: [
        { label: 'All users', value: '' },
        { label: 'Only followed', value: true },
        { label: 'Only unfollowed', value: false },
      ],
      friends: null,
    },
    onSubmit: (values) => {
      props.searchUsers(
        props.currentPage,
        props.pageSize,
        values.searchField,
        values.friends
      );
    },
  });
  console.log(formik.values.friends);
  return (
    <div>
      <Formik>
        <Form
          enableReinitialize={true}
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={formik.handleSubmit}
        >
          <InputText
            id='searchField'
            name='searchField'
            placeholder={'People search'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.searchField}
            autoComplete='on'
          />
          <Dropdown
            id='friends'
            name='friends'
            optionLabel='label'
            optionValue='value'
            value={formik.values.friends}
            options={formik.values.filter}
            onChange={formik.handleChange}
            placeholder='Select a filter'
          />
          <Button
            label='Search'
            aria-label='Submit'
            className='p-button-success'
            type={'submit'}
          />
        </Form>
      </Formik>
    </div>
  );
};
export default UserSearcher;
