import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeSectionCarosel from '../../HomeSectionCarosel/HomeSectionCarosel';
import { findProducts } from '../../../../state/Product/Action';

export default function SearchResults() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      dispatch(
        findProducts({
          category: '',
          colors: [],
          size: [],
          minPrice: 0,
          maxPrice: 100000,
          minDiscount: 0,
          sort: 'price_low',
          pageNumber: 0,
          pageSize: 100,
          stock: '',
          searchKeyword: query, // Make sure your API supports searchKeyword
        })
      );
    }
  }, [query]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
      <h2 className="text-2xl font-bold mb-5">Search Results for "{query}"</h2>
      <HomeSectionCarosel data={products?.content} sectionName="Search Results" />
    </div>
  );
}
