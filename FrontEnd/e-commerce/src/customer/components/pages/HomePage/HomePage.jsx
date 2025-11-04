import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../HomeCarosel/MainCarousel";
import HomeSectionCarosel from "../../HomeSectionCarosel/HomeSectionCarosel";
import { findProducts } from "../../../../state/Product/Action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  // const loading = state?.loading || false;

 // const { product } = useSelector((store) => store);
  useEffect(() => {
    dispatch(findProducts({
      category: '',
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 0,
      pageSize: 100,
      stock: '',
    }));
  }, [dispatch]);

  //if (loading) return <p className="text-center">Loading...</p>;

  console.log("in home page ",products)
  return (
    <div>
      <MainCarousel />

      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "mens_kurta")}
          sectionName={"Men's Kurta"}
        />
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "mens_shoes")}
          sectionName={"Men's Shoes"}
        />
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "shirt")}
          sectionName={"Men's Shirt"}
        />
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "women_saree")}
          sectionName={"Women's Saree"}
        />
        {/* <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "womens_dress")}
          sectionName={"Women's Dress"}
        /> */}
      </div>
    </div>
  );
};

export default HomePage;
