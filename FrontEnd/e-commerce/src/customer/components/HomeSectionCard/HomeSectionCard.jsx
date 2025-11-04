import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
  
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg overflow-hidden w-60 mx-3 ml-3 border h-[275px] transition-all duration-300 hover:shadow-2xl hover:scale-105">
  
      {/* Image container */}
      <div className="h-[11rem] w-full flex justify-center items-center">
        <img
          className="object-contain w-[90%] h-full"
          src={product.imageUrl}
          alt={product.title}
          onClick={() => navigate(`/product/${product.id}`)}
        />
      </div>

      {/* Text content */}
      <div className="p-2 w-full text-center">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {product.brand}
        </h3>
        <p className="mt-1 text-xs text-gray-600 line-clamp-2">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
