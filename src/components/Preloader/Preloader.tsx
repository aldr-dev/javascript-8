import React from 'react';
import './Preloader.css';

interface Props {
  preloader: boolean;
}

const Preloader: React.FC<Props> = ({preloader}) => {
  return (
    <>
      {preloader ? (
        <div id="preloader">
          <div className="loader">Loading...</div>
        </div>
      ) : null}
    </>
  );
};

export default Preloader;