import './PageNotFound.css';
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-error">
      <h3 className="page-error-title">Error 404</h3>
      <p className="page-error-desc">
        It seems something went wrong! The page you are requesting does not exist.
        It may be outdated, deleted, or the address was entered incorrectly in the address bar.
      </p>
      <Link to="/" className="page-error-btn">Return to the homepage</Link>
    </div>
  );
};

export default PageNotFound;