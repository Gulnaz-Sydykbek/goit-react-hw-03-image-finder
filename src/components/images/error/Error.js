import PropTypes from 'prop-types';

function Error(props) {
  const { message } = props;

  return <p role="alert">{message}</p>;
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
