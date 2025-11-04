import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../state/Product/Action';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const initialSizes=[
  {name:"S",quantity:0},
  {name:"M",quantity:0},
  {name:"L",quantity:0},
]


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
const CreateProductForm = () => {

  const [productData,setProductData]=useState({
    imageUrl:"",
    brand:"",
    title:"",
    color:"",
    discountedPrice:"",
    price:"",
    discountPersent:"",
    sizes:initialSizes,
    quantity:"",
    topLevelCategory:"",
    secondLevelCategory:"",
    thirdLevelCategory:"",
    description:"",
    highlights: [""], 
    
  });
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setProductData((prevState)=>({
      ...prevState,
      [name]:value,
    }));
  };

  const handleSizeChange=(e,index)=>{
    let{name,value}=e.target;
    name==="size_quantity"?name="quantity":name=e.target.name;
    const sizes=[...productData.sizes];
    sizes[index][name]=value;
    setProductData((prevState)=>({
      ...prevState,
      sizes:sizes,
    })); 
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("in submit handle",productData)
    dispatch(createProduct(productData))
   
  }
  const handleHighlightChange = (value, index) => {
    const updatedHighlights = [...productData.highlights];
    updatedHighlights[index] = value;
    setProductData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };
  
  const addHighlightField = () => {
    setProductData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };
  
  const removeHighlightField = (index) => {
    const updatedHighlights = [...productData.highlights];
    updatedHighlights.splice(index, 1);
    setProductData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };
  
  return (
  
    <div className="p-10">
      <Typography variant='h3' sx={{textAlign:"center"}}
      className='py-10 text-center'
      >
        Add New Product

      </Typography>
      <form onSubmit={handleSubmit}
      
      className="createProductContainer min-h-screen">
<Box sx={{ flexGrow: 1 }}>
<Grid container spacing={2}>
{/* Image URL */}
<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Image URL"
      name="imageUrl"
      value={productData.imageUrl}
      onChange={handleChange}
    />
    {/* Image Preview */}
    {productData.imageUrl && (
      <img
        src={productData.imageUrl}
        alt="Product Preview"
        style={{
          marginTop: '10px',
          maxHeight: '200px',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
        onError={(e) => (e.target.style.display = 'none')}
      />
    )}
  </Item>
</Grid>

<Grid size={6}>
        <Item>
          <TextField
            fullWidth
            label="Brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            
          />
        </Item>
      </Grid>
      <Grid size={6}>
        <Item>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />
        </Item>
      </Grid>
    
{/* Color + Quantity */}
<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Color"
      name="color"
      value={productData.color}
      onChange={handleChange}
    />
  </Item>
</Grid>
<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Quantity"
      name="quantity"
      type="number"
      value={productData.quantity}
      onChange={handleChange}
    />
  </Item>
</Grid>

{/* Price + Discounted Price + Discount % */}
<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Price"
      name="price"
      type="number"
      value={productData.price}
      onChange={handleChange}
    />
  </Item>
</Grid>

<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Discounted Price"
      name="discountedPrice"
      type="number"
      value={productData.discountedPrice}
      onChange={handleChange}
    />
  </Item>
</Grid>
<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Discount Percent"
      name="discountPersent"
      type="number"
      value={productData.discountPersent}
      onChange={handleChange}
    />
  </Item>
</Grid>

{/* Categories */}
<Grid size={4}>
  <Item>
    <FormControl fullWidth>
      <InputLabel>Top Level Category</InputLabel>
      <Select
        name="topLevelCategory"
        value={productData.topLevelCategory}
        onChange={handleChange}
      >
        <MenuItem value="men">Men</MenuItem>
        <MenuItem value="women">Women</MenuItem>
        <MenuItem value="kids">Kids</MenuItem>
      </Select>
    </FormControl>
  </Item>
</Grid>

<Grid size={4}>
  <Item>
    <FormControl fullWidth>
      <InputLabel>Second Level Category</InputLabel>
      <Select
        name="secondLevelCategory"
        value={productData.secondLevelCategory}
        onChange={handleChange}
      >
        <MenuItem value="clothing">Clothing</MenuItem>
        <MenuItem value="accessories">Accessories</MenuItem>
        <MenuItem value="brands">Brands</MenuItem>
        <MenuItem value="shoes">Shoes</MenuItem>
      </Select>
    </FormControl>
  </Item>
</Grid>

<Grid size={4}>
  <Item>
    <FormControl fullWidth>
      <InputLabel>Third Level Category</InputLabel>
      <Select
        name="thirdLevelCategory"
        value={productData.thirdLevelCategory}
        onChange={handleChange}
      >
        <MenuItem value="top">Tops</MenuItem>
        <MenuItem value="women_dress">Women Dresses</MenuItem>
        <MenuItem value="t_shirts">T-Shirts</MenuItem>
        <MenuItem value="saree">Saree</MenuItem>
        <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
        <MenuItem value="mens_kurta">mens Kurta</MenuItem>
        <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
        <MenuItem value="mens_shoes">mens Shoes</MenuItem>
        <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
        <MenuItem value="shirt">mens Shirt</MenuItem>
        <MenuItem value="women_saree">Women Saree</MenuItem>
        
      </Select>
    </FormControl>
  </Item>
</Grid>
{/* Highlights Section */}
{/* Highlights Section */}
<Grid size={6}>
  <Item>
    <Typography
      variant="h6"
      sx={{ mb: 2, fontWeight: 600, textAlign: "left" }}
    >
      Highlights
    </Typography>

    {productData.highlights.map((highlight, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label={`Highlight ${index + 1}`}
          value={highlight}
          onChange={(e) => handleHighlightChange(e.target.value, index)}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={() => removeHighlightField(index)}
          disabled={productData.highlights.length === 1}
        >
          Remove
        </Button>
      </Box>
    ))}

    <Button
      variant="contained"
      onClick={addHighlightField}
      sx={{ mt: 1 }}
    >
      + Add Highlight
    </Button>
  </Item>
</Grid>
{/* Description */}
<Grid size={6}>
  <Item>
    <TextField
      fullWidth
      label="Description"
      name="description"
      multiline
      rows={3}
      value={productData.description}
      onChange={handleChange}
    />
  </Item>
</Grid>

{/* Size and Quantity */}
{
  productData.sizes.map((size, index) => (
    <React.Fragment key={index}>
      <Grid size={6}>
        <Item>
          <TextField
            fullWidth
            label="Size Name"
            name="name"
            value={size.name}
            onChange={(e) => handleSizeChange(e, index)}
            required
          />
        </Item>
      </Grid>
      <Grid size={6}>
        <Item>
          <TextField
            fullWidth
            label="Quantity"
            name="size_quantity"
            type="number"
            value={size.quantity}
            onChange={(e) => handleSizeChange(e, index)}
            required
          />
        </Item>
      </Grid>
    </React.Fragment>
  ))
}

{/* Submit Button */}
<Grid size={3}>
  <Item>
    <Button
      variant="contained"
      type="submit"
      fullWidth
      size="large"
    >
      Add New Product
    </Button>
  </Item>
</Grid>

 </Grid> 
</Box>

      </form>
    </div>
        
  
  )
}

export default CreateProductForm