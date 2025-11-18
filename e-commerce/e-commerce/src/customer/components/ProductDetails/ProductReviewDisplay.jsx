import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Rating,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { api } from "../../../config/apiConfig";

const ProductReviewDisplay = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/reviews/product/${productId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchRatings = async () => {
    try {
      const res = await api.get(`/api/ratings/product/${productId}`);
      const ratings = res.data;
      if (ratings.length > 0) {
        const avg =
          ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
        setAvgRating(avg);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
      fetchRatings();
    }
  }, [productId]);

  // Limit to first 4 reviews if showAll is false
  const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <Box sx={{ mt: -10 }}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews & Ratings
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Rating value={avgRating} precision={0.5} readOnly />
        <Typography sx={{ ml: 1 }}>
          {avgRating.toFixed(1)} / 5
        </Typography>
        <Typography sx={{ ml: 2, color: "text.secondary" }}>
          ({reviews.length} Reviews)
        </Typography>
      </Box>

      {reviews.length > 0 ? (
        <>
          {/* Display reviews in one line with wrapping */}
          <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
            {visibleReviews.map((r) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={r.id}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  p: 2,
                  m: 1,
                  minWidth: "220px",
                  backgroundColor: "#fafafa",
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: "#1976d2", mr: 1 }}>
                    {r.user?.firstName?.[0] || "U"}
                  </Avatar>
                  <Typography variant="subtitle2">
                    {r.user?.firstName || "Anonymous"}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {r.review}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Show More / Show Less Button */}
          {reviews.length > 4 && (
            <Box textAlign="center" mt={3}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "View All Reviews"}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No reviews yet.
        </Typography>
      )}
    </Box>
  );
};

export default ProductReviewDisplay;
