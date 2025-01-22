import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaStar, FaCommentDots } from "react-icons/fa";

function ReviewsPage({ gigsData }) {
  const [activeTab, setActiveTab] = useState("Reviews"); // Default tab
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]); // Set an empty array to start with

  // Initialize reviews with gigsData.reviews in useEffect
  useEffect(() => {
    if (gigsData && gigsData.reviews) {
      setReviews(gigsData.reviews); // Set reviews from gigsData
    }
  }, [gigsData]); // Run effect when gigsData changes

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const handleRatingSubmit = () => {
    if (rating > 0 && comment.trim() !== "") {
      setReviews([
        ...reviews,
        { id: reviews.length + 1, content: comment, rating: rating },
      ]);
      setRating(0);
      setComment("");
      setShowRatingPopup(false);
    } else {
      alert("Please provide both a comment and a rating."); // You can replace this alert with a toast or notification.
    }
  };

  return (
    <div className="reviews-page">
      <div className="tab-bar">
        {/* Likes Icon */}
        <button className="icon-button" onClick={() => setActiveTab("Likes")}>
          <FaRegHeart size={20} />
        </button>

        {/* Reviews Icon */}
        <button
          className={`icon-button ${activeTab === "Reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("Reviews")}
        >
          <FaCommentDots size={20} />
        </button>

        {/* Rating Icon */}
        <button
          className={`icon-button ${activeTab === "Rating" ? "active" : ""}`}
          onClick={() => setShowRatingPopup(true)}
        >
          <FaStar size={20} />
        </button>
      </div>

      {/* Average Rating Section */}
      {/* {activeTab === "Reviews" && (
        <div className="average-rating-section">
          <h3>Rating: {averageRating} / 5 ({reviews.length})</h3>
          <div className="stars">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} color={i < Math.round(averageRating) ? "#FFD700" : "#ddd"} />
            ))}
          </div>
        </div>
      )} */}

      {/* Rating Popup */}
      {showRatingPopup && (
        <div className="rating-popup">
          <div className="popup-content">
            <h3>Rate Us</h3>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size={30}
                  color={i < rating ? "#FFD700" : "#ddd"}
                  onClick={() => setRating(i + 1)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <textarea
              placeholder="Write a review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <button onClick={handleRatingSubmit} className="submit-button">
              Submit Review
            </button>
            <button
              onClick={() => setShowRatingPopup(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="reviews-section">
  <h3>Reviews</h3>
  {reviews.map((review) => (
    <div key={review.id} className="review">
      <div className="Reviewerdetails">
      <img
  src={review.Profile || "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg"} // Updated field name
  alt="Reviewer's profile"
  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
/>
<p>{review.name}</p>
      </div>
   <div className="reviewcontents">

<div className="stars">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar key={i} color={i < review.rating ? "#FFD700" : "#ddd"} />
        ))}
      </div>
      <p>{review.content}</p>
   </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default ReviewsPage;
