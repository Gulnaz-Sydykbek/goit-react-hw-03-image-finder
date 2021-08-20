import LoaderImg from 'react-loader-spinner';
import s from '../imageGallery/Image.module.css';

function Loader() {
  return (
    <div className={s.Loader}>
      <LoaderImg
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
}

export default Loader;
