import {useNavigate, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {QuoteForm} from '../../types';
import axiosApi from '../../axiosApi';
import ErrorStatus from '../ErrorStatus/ErrorStatus';
import './QuoteForm.css';

const QuoteForm = () => {
  const {id} = useParams();
  const [data, setData] = useState<QuoteForm>({
    author: '',
    category: '',
    text: '',
  });
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const data = async () => {
        try {
          const response = await axiosApi.get<QuoteForm>(`/quotes/${id}.json`);

          if (response.status !== 200) {
            setIsError(true);
            throw new Error('An error has occurred. Failed to process information. ' + response.status);
          }

          setData((prevState) => {
            return {
              ...prevState,
              author: response.data.author,
              category: response.data.category,
              text: response.data.text,
            };
          });
        } catch (error) {
          setIsError(true);
          console.error('An error has occurred. Failed to process information. ' + error);
        }
      };
      void data();
    }
  }, [id]);

  const handleError = (status: boolean) => {
    setIsError(status);
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setData({
      author: '',
      category: '',
      text: '',
    });

    if (data.author.length !== 0 && data.category.length !== 0 && data.text.length !== 0) {
      try {
        setIsLoader(true);
        let response;
        if (id) {
          response = await axiosApi.put<QuoteForm>(`/quotes/${id}.json`, data);
          navigate('/');
        } else {
          response = await axiosApi.post<QuoteForm>('/quotes.json', data);
        }
        setIsLoader(false);

        if (response.status !== 200) {
          setIsError(true);
          throw new Error('An error has occurred. Failed to process information. ' + response.status);
        }

      } catch (error) {
        setIsLoader(false);
        setIsError(true);
        console.error('An error has occurred. Failed to process information. ' + error);
      }
    }
  };

  return (
    <>
      <ErrorStatus
        error={isError}
        handleError={handleError}>
        An error has occurred. Failed to process information.
      </ErrorStatus>
      <div className="form-wrapper">
        <h3 className="form-title">{id ? 'Edit a quote' : 'Submit new quote'}</h3>
        <form onSubmit={onFormSubmit} className="form">
          <label htmlFor="category">Category:</label>
          <select
            onChange={onFieldChange}
            id="category"
            value={data.category}
            className="form-select"
            name="category"
            required>
            <option value="">Select Category</option>
            <option value="star-wars">Star Wars</option>
            <option value="famous-people">Famous people</option>
            <option value="saying">Saying</option>
            <option value="humor">Humour</option>
            <option value="motivational">Motivational</option>
          </select>
          <label htmlFor="author">Author:</label>
          <input
            onChange={onFieldChange}
            id="author"
            value={data.author}
            className="form-input"
            type="text"
            name="author"
            placeholder="Enter the author's name"
            required
          />
          <label htmlFor="message">Quote text:</label>
          <textarea
            onChange={onFieldChange}
            id="message"
            value={data.text}
            className="form-description"
            name="text"
            placeholder="Enter quotation"
            required>
          </textarea>
          <button className="form-btn" disabled={isLoader} type="submit">
            <div className={isLoader ? 'spinner' : ''}>
              {isLoader ? '' : 'Save'}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default QuoteForm;