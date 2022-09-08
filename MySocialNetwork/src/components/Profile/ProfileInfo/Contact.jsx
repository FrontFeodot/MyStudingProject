const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}: </b>
      {contactValue ? <a href={contactValue}>{contactValue}</a> : 'Not found'}
    </div>
  );
};
export default Contact;
