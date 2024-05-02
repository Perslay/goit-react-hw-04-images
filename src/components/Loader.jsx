import { RotatingLines } from 'react-loader-spinner';
import css from '../styles/Loader.module.css';

export const Loader = () => {
  return (
    <RotatingLines
      className={css.loader}
      visible={true}
      strokeWidth="4"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
