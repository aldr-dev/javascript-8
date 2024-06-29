import React, {useState, useEffect} from 'react';
import {Categories, Posts} from '../../types';
import {NavLink, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Preloader from '../../components/Preloader/Preloader';
import ErrorStatus from '../../components/ErrorStatus/ErrorStatus';
import Card from '../../components/Card/Card';
import './Home.css';

const categories: Categories[] = [
  { title: 'All', id: '/' },
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous people', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humor', id: 'humor' },
  { title: 'Motivational', id: 'motivational' },
];

const Home = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const {category} = useParams<{category: string}>();


  useEffect(() => {
    const data =  async () => {
      try {
        let url = '/quotes.json';

        if (category && category !== '/') {
          url += `?orderBy="category"&equalTo="${category}"`;
        }

        setIsLoader(true);
        const response = await axiosApi.get<Posts>(url);
        setIsLoader(false);

        if (response.status !== 200) {
          setIsError(true);
          throw new Error('An error has occurred. Failed to process information. ' + response.status);
        }

        if (response.data !== null) {
          const dataArray: Posts[] = Object.entries(response.data).map(([id, item]) => ({
            id,
            author: item.author,
            category: item.category,
            text: item.text,
          }));
          setPosts(dataArray);
        }
      } catch (error) {
        setIsError(true);
        setIsLoader(false);
        console.error('An error has occurred. Failed to process information. ' + error);
      }
    };

    void data();
  }, [category]);

  const handleError = (status: boolean) => {
    setIsError(status);
  };

  const deletePost = async (id: string) => {
    try {
      setIsLoader(true);
      const response = await axiosApi.delete<Posts>(`/quotes/${id}.json`);
      setIsLoader(false);

      if (response.status !== 200) {
        setIsError(true);
        throw new Error('An error has occurred. Failed to process information. ' + response.status);
      }

      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      setIsError(true);
      setIsLoader(false);
      console.error('An error has occurred. Failed to process information. ' + error);
    }
  };

  const categoryTitle = category === undefined ? 'All' : categories.find(cat => cat.id === category)?.title;

  return (
    <>
      <div className="main-page-wrapper">
        <div className="col-filter">
          <ul className="filter-list">
            {categories.map(category => (
              <li className="filter-item" key={category.id}>
                <NavLink className="filter-link" key={category.id}  to={category.id === '/' ? '/' : `/quotes/${category.id}`}>
                  {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-result">
          {<h2 className="category-title">{categoryTitle}</h2>}
          {posts.length !== 0 ? '' : 'Quote list is empty, please add a quote!'}
          <Preloader preloader={isLoader} />
          <ErrorStatus
            error={isError}
            handleError={handleError}>
            An error has occurred. Failed to process information.
          </ErrorStatus>
          {posts.map((post) => (
            <Card key={post.id} post={post} onDelete={deletePost}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;