import React from 'react';
import Header from '../../components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm/QuoteForm';
import PageNotFound from '../PageNotFound/PageNotFound';
import Home from '../Home/Home';


const Pages = () => {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={
            <Home />
          }/>
          <Route path="/quotes/:category" element={
            <Home />
          }/>
          <Route path="/quotes/:id/edit" element={
            <QuoteForm />
          }/>
          <Route path="/add-quote" element={
            <QuoteForm />
          }/>
          <Routes path="*" element={
            <PageNotFound/>
          }/>
        </Routes>
      </main>
    </div>
  );
};

export default Pages;