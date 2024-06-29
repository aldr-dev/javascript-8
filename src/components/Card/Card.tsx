import React from 'react';
import {Posts} from '../../types';
import './Card.css';
import {Link} from 'react-router-dom';

interface Props {
  post: Posts;
  onDelete: (id: string) => void;
}

const Card: React.FC<Props> = ({post, onDelete}) => {
  return (
    <>
      {post && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Quote</span>
              <div className="button-inner">
                <Link className="card-btn-edit" to={'/quotes/' + post.id + '/edit'}>
                  &#9998;
                </Link>
                <button className="card-btn-remove" type="button" onClick={() => onDelete(post.id)}>
                  &#10006;
                </button>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">&Prime;{post.text}&Prime;</p>
              <p className="card-author">&mdash; {post.author}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;