function ImageError(props) {
  const { message } = props;

  return <p role="alert">{message}</p>;
}

export default ImageError;
