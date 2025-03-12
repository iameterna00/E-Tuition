import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaStar, FaCommentDots } from "react-icons/fa";
import { webApi } from "../../api";

function ReviewsPage({ loginmodal, gigsData, user }) {
  const [activeTab, setActiveTab] = useState("Reviews"); // Default tab
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews if gigsData is available
  useEffect(() => {
    if (gigsData?.id) {
      setLoading(true);
      console.log("Fetching reviews for class ID:", gigsData.id);
      axios
        .get(`${webApi}/api/classes/${gigsData.id}/reviews`)
        .then((response) => {
          console.log("Fetched reviews:", response.data);
          setReviews(response.data);  // Assuming the data is an array of reviews
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [gigsData]);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;
 const handleRatingSubmit = async () => {
        if (!user) {
      window.alert('please login')
      return
        }
      
        if (rating > 0 && comment.trim() !== "") {
          try {
            const response = await axios.post(`${webApi}/api/classes/${gigsData.id}/reviews`, {
              rating,
              content: comment,
              userid: user?.uid,
            });
      
         
            const username = user?.name || "Unknown"; 
            const profile = user?.profile || "default-profile.jpg";  
      
          
            const newReview = {
              id: response.data.id,  
              rating: response.data.rating,
              content: response.data.content,
              username,      
              profile,                
            };
      
            // Update the reviews state by adding the new review
            setReviews((prevReviews) => [...prevReviews, newReview]);
      
            setRating(0);
            setComment("");
            setShowRatingPopup(false);
          } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
          }
        } else {
          alert("Please provide both a comment and a rating.");
        }
      };
      

  return (
    <div className="reviews-page">
      <div className="tab-bar">
        {/* Likes Icon */}
        {/* <button className="icon-button">
          <FaRegHeart size={20} />
        </button> */}

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
      {activeTab === "Reviews" && (
        <div className="average-rating-section">
          <h3>Rating: {averageRating} / 5 ({reviews.length})</h3>
          <div className="stars">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} color={i < Math.round(averageRating) ? "#FFD700" : "#ddd"} />
            ))}
          </div>
        </div>
      )}

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
            className="ratingtextarea"
              placeholder="Write a review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              style={{
                margin: "10px 0",
                padding: "10px",
                border:"none",
                borderRadius: "10px",
              }}
            />
            <button 
            style={{borderRadius:'10px'}}
            onClick={handleRatingSubmit} className="submit-button">
              Submit Review
            </button>
            <button
             style={{borderRadius:'10px'}}
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
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <div className="reviewer-details" style={{display:'flex'}}>
                <img 
                  src={
                    review.profile 
                  }
                  alt="Reviewer's profile"
                  style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit:'cover' }}
                />
                <p>{review.username}</p>
              </div>
              <div className="review-contents">
                <div className="reviewcontent_insiders">
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} color={i < review.rating ? "#FFD700" : "#ddd"} />
                  ))}
                </div>
                <p>{review.content}</p>
              </div>
                </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
