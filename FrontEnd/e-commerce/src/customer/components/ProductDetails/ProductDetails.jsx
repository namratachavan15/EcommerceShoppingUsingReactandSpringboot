
import { StarIcon } from '@heroicons/react/20/solid'
import { Box, Button, Grid,  Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import LinearProgress from '@mui/material/LinearProgress';
import { mens_kurta } from '../../../Data/mens_kurta';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProductById, findProducts } from '../../../state/Product/Action';
import { addItemToCart } from '../../../state/Cart/Action';
import ProductReviewDisplay from './ProductReviewDisplay';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


 const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
    { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
    { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
  ],
  sizes: [
   
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },

  ],
  // description:
  //   'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  // highlights: [
  //   'Hand cut and sewn locally',
  //   'Dyed with our proprietary colors',
  //   'Pre-washed & pre-shrunk',
  //   'Ultra-soft 100% cotton',
  // ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
 }
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function ProductDetails() {


 const [selectedSize,setSelectedSize]=useState("")
  const navigate=useNavigate()
  const params=useParams()

 const dispatch=useDispatch()
 

 useEffect(() => {
  // fetch default products (all categories)
  dispatch(findProducts({
    category: '',
    colors: [],
    size: [],
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    sort: 'price_low',
    pageNumber:0,
    pageSize: 100,
    stock: '',
  }));
}, [dispatch]);

 const productState = useSelector(store => store.product);
 const { products } = useSelector(store => store.product);

 // 2️⃣ Compute similar products dynamically
 const similarProducts = products?.content?.filter(
   (p) => p.category.name === productState.product?.category?.name &&
          p.id !== productState.product?.id // exclude the current product itself
 );

 console.log("product is",products)
  console.log("id is ",params.productId)
  const handleAddToCart=()=>{
    const data={productId:params.productId,size:selectedSize}
    console.log("data is",data)
  dispatch(addItemToCart(data))
     navigate("/cart")
}

useEffect(() => {
  if (params.productId) {
    dispatch(findProductById({ productId: params.productId }));
  }
}, [dispatch, params.productId]);

console.log("product state",productState)

//console.log("product?.breadcrumbs",product?.breadcrumbs)

  return (
  //  <>
  //  </>
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        {/* <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product?.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav> */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
             {/* Image gallery */}
              <div className="flex flex-col items-center">
                <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
          <img
            alt={productState.title}
            src={productState.product?.imageUrl}
            className="h-full w-full object-cover object-center"
          />
          </div>
            {/* <div className="flex flex-wrap space-x-5 justify-center " >
              {product.images.map((item)=><div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">

               
          <img
            alt={item.alt}
            src={item.src}
             className="h-full w-full object-cover object-center"
          />
           </div>)}
           </div>
            */}
        </div>
 {/* Product info */}
 <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
          <div className="lg:col-span-2 ">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{productState.product?.brand}</h1>
            <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {productState.product?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
           <div className="flex space-x-5 items-center text-lg lg:text-xl  text-gray-900 mt-6">
                    <p className='font-semibold'>
                      {productState.product?.discountedPrice}

                        
                    </p>
                    {/* <p className='opacity-50 line-through'>{productState.product?.Price}</p>
                   */}
                    <p className='text-green-600 font-semibold'>{productState.product?.discountPercent}%</p>
           </div>

            {/* Reviews */}
            <div className="mt-6">
            <div className="flex items-center space-x-3">
  <Rating
    name="read-only"
    value={parseInt(productState.product?.averageRating) || 0}
    precision={0.5}
    readOnly
  />
  <p className="opacity-50 text-sm">{productState.product?.averageRating || 0} Ratings</p>
  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
    {productState.product?.reviewCount || 0} Reviews
  </p>
</div>
 
              
            </div>

            <form className="mt-10">
           

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                 <div className="grid grid-cols-4 gap-3">
  {product.sizes.map((size) => (
    <label
      key={size.name}
      aria-label={size.name}
      className={`group relative flex items-center justify-center rounded-md border p-3 cursor-pointer
        ${selectedSize === size.name ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 bg-white'}
        ${!size.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        type="radio"
        name="size"
        value={size.name}
        checked={selectedSize === size.name}
        disabled={!size.inStock}
        onChange={() => setSelectedSize(size.name)}
        className="sr-only"
      />
      <span className="text-sm font-medium uppercase">{size.name}</span>
    </label>
  ))}
</div>

                </fieldset>
              </div>

             
<Button
  onClick={handleAddToCart}
  variant="contained"
  startIcon={<ShoppingCartOutlinedIcon />}
  sx={{
    mt:'5px',
    px: "2rem",
    py: "1rem",
    bgcolor: "#ffcc00",      // Flipkart yellow
    color: "white",        // Flipkart blue text
    fontWeight: "bold",
    borderRadius: "4px",
    textTransform: "none",
    "& .MuiButton-startIcon": {
      marginRight: "0.5rem",
    },
    "&:hover": {
      bgcolor: "#e6b800",    // darker yellow
      boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
    },
  }}
>
  ADD TO CART
</Button>


            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border lg:border-gray-200 lg:p-6 lg:pr-8 lg:pb-16 lg:mt-5">
            {/* Description and details */}
            <div>
              <h3>Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{productState.product?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

               <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {productState.product?.highlights?.map((highlight, index) => (
  <li key={index} className="text-gray-400">
    <span className="text-gray-600">{highlight}</span>
  </li>
))}

                </ul>
              </div> 
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
            </section>    
             {/*rating and reviews */}
       {/* <section>
        <h1 className="font-semibold text-lg pb-4">Recent Review and Rating</h1>
        <div className="border p-5">
           <Grid container spacing={1}>
            <Grid item xs={7}>
                  <div className="space-y-5">
                  {[1,1,1].map((item)=><ProductReviewCard/>)}
                  </div>
            </Grid>

            <Grid item xs={5} sx={{marginLeft:'450px'}}>
                  <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
                  <div className="flex items-center space-x-3">
                    <Rating name="read-only" value={4.6} precision={.5} readOnly/>
                    <p className="opacity-60">486143 Ratings</p>
                  </div>

                  <Box className="mt-5 space-y-3">
                    <Grid container  alignItems="center" gap={2}>
                    <Grid item xs={2}>
                        <p>Excellent</p>
                    </Grid>
                 <Grid item xs={7}>
    <Box sx={{ width: 300 }}>
    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={40} color="success"/>
  </Box>
</Grid>
                    </Grid>
                     <Grid container  alignItems="center" gap={2}>
                    <Grid item xs={2}>
                        <p>Very Good</p>
                    </Grid>
                 <Grid item xs={7}>
    <Box sx={{ width: 300 }}>
    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={30} color="success"/>
  </Box>
</Grid>
                    </Grid>
                     <Grid container  alignItems="center" gap={2}>
                    <Grid item xs={2}>
                        <p>Good</p>
                    </Grid>
                 <Grid item xs={7}>
    <Box sx={{ width: 300 }}>
    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={25}/>
  </Box>
</Grid>

                    </Grid>
                     <Grid container  alignItems="center" gap={2}>
                    <Grid item xs={2}>
                        <p>Average</p>
                    </Grid>
                 <Grid item xs={7}>
    <Box sx={{ width: 300 }}>
    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={20} color="warning"/>
  </Box>
</Grid>
                    </Grid>
                     <Grid container  alignItems="center" gap={2}>
                    <Grid item xs={2}>
                        <p>Poor</p>
                    </Grid>
                 <Grid item xs={7}>
    <Box sx={{ width: 300 }}>
    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={15} color="error"/>
  </Box>
</Grid>
                    </Grid>
                  </Box>

            </Grid>
            </Grid>       
        </div>
       </section> */}

        <section>
        <ProductReviewDisplay productId={productState.product?.id} />
       </section> 
       {/*Similar products*/}   
  
<section className="pt-10">
  <h1 className="py-5 text-xl font-bold">Similar Products</h1>
  <div className="flex flex-wrap -mx-3">
  {similarProducts?.length > 0 ? (
    similarProducts.map((item, index) => (
      <div key={item.id || index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6">
        <HomeSectionCard product={item} />
      </div>
    ))
  ) : (
    <p className="text-gray-500">No similar products found.</p>
  )}
</div>

</section>

      </div>
    </div>
  )
}
