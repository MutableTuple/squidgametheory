"use client";
import { useState, useEffect } from "react";
import { FaComment, FaThumbsUp, FaThumbsDown, FaUser } from "react-icons/fa";
import PixelButton from "./PixelButton";
import { updateTheoryLikes } from "../_lib/data-service"; // Assuming this function exists for DB update

const TheoryCard = ({ id, author, title, content, like, dislike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);

  useEffect(() => {
    // Check if the user has liked the theory previously from localStorage
    const likedTheory = localStorage.getItem(`liked-theory-${id}`);
    if (likedTheory === "true") {
      setIsLiked(true);
    }

    // Check if the user has disliked the theory previously from localStorage
    const dislikedTheory = localStorage.getItem(`disliked-theory-${id}`);
    if (dislikedTheory === "true") {
      setDislikeCount(1); // Set dislike state to 1 if already disliked
    }
  }, [id]);

  const handleLike = async () => {
    let updatedLikeCount;

    if (isLiked) {
      updatedLikeCount = Math.max(likeCount - 1, 0); // Prevent likes from going below 0
      localStorage.setItem(`liked-theory-${id}`, "false");
      setIsLiked(false);
    } else {
      updatedLikeCount = likeCount + 1;
      localStorage.setItem(`liked-theory-${id}`, "true");
      setIsLiked(true);
    }

    // Update like count in state
    setLikeCount(updatedLikeCount);

    // Update the likes in the database with the updated like count
    const result = await updateTheoryLikes(id, updatedLikeCount, dislikeCount);
    if (result) {
      console.log("Likes updated in DB");
    } else {
      console.log("Failed to update likes in DB");
    }
  };

  const handleDislike = async () => {
    if (dislikeCount === 1) {
      setDislikeCount(0); // Remove dislike if it's already disliked
      localStorage.setItem(`disliked-theory-${id}`, "false");

      // Update the dislikes in the database
      const result = await updateTheoryLikes(id, likeCount, 0);
      if (result) {
        console.log("Dislike removed in DB");
      } else {
        console.log("Failed to remove dislike in DB");
      }
    } else {
      setDislikeCount(1); // Set dislike count to 1 if it hasn't been disliked already
      localStorage.setItem(`disliked-theory-${id}`, "true");

      // Update the dislikes in the database
      const result = await updateTheoryLikes(id, likeCount, 1);
      if (result) {
        console.log("Dislike updated in DB");
      } else {
        console.log("Failed to update dislikes in DB");
      }
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pixel-border pixel-shadow bg-white text-black p-4 mb-4 hover:scale-[1.01] transition-transform duration-200">
      {/* Schema Markup for SEO (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            author: {
              "@type": "Person",
              name: author,
            },
            description: content.substring(0, 160),
            datePublished: new Date().toISOString(),
            url: window.location.href,
          }),
        }}
      />

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaUser className="mr-2 text-pink-500" aria-hidden="true" />
          <span className="font-pixel text-sm">{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <FaThumbsUp
              onClick={handleLike}
              className={`mr-1 ${
                isLiked ? "text-green-500" : "text-pink-500"
              } cursor-pointer`}
              aria-label="Like this theory"
            />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center">
            <FaThumbsDown
              onClick={handleDislike}
              className={`mr-1 ${
                dislikeCount > 0 ? "text-red-500" : "text-pink-500"
              } cursor-pointer`}
              aria-label="Dislike this theory"
            />
            <span>{dislikeCount}</span>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-pixel text-pink-600 mb-2">{title}</h3>
      <p className={`${!isExpanded ? "line-clamp-3" : ""}`}>{content}</p>
      {content.length > 200 && (
        <PixelButton
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </PixelButton>
      )}
    </div>
  );
};

export default TheoryCard;
