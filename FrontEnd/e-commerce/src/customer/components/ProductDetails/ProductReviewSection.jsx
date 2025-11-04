import React, { useState } from "react";
import { Box, Rating, TextField, Button, Typography } from "@mui/material";
import { api } from "../../../config/apiConfig";

const ProductReviewSection = ({ productId }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
 
  const handleSubmit = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("Please log in to submit a review.");
      return;
    }

    if (!reviewText.trim() || ratingValue === 0) {
      alert("Please write a review and give a rating before submitting.");
      return;
    }

    try {
      // ✅ Send review
      const reviewReq = {
        productId: productId,
        review: reviewText.trim(),
      };

      const reviewRes = await api.post("/api/reviews/create", reviewReq, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Send rating
      const ratingReq = {
        productId: productId,
        rating: ratingValue,
      };

      const ratingRes = await api.post("/api/ratings/create", ratingReq, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Review Response:", reviewRes.data);
      console.log("Rating Response:", ratingRes.data);

      alert("Thank you! Your review and rating have been submitted.");
      setReviewText("");
      setRatingValue(0);
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("Something went wrong while submitting. Please try again.");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Write a Review for this Product
      </Typography>

      <Rating
        name="user-rating"
        value={ratingValue}
        onChange={(e, val) => setRatingValue(val)}
      />

      <TextField
        fullWidth
        multiline
        rows={3}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#9155fd" }}
        onClick={handleSubmit}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ProductReviewSection;
