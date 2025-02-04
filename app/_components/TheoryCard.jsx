"use client";
import { useState, useEffect } from "react";
import { FaComment, FaThumbsUp, FaThumbsDown, FaUser } from "react-icons/fa";
import PixelButton from "./PixelButton";
import { updateTheoryLikes } from "../_lib/data-service"; // Assuming this function exists for DB update

const TheoryCard = ({ id, author, title, content, like, dislike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
      const likedTheory = localStorage.getItem(`liked-theory-${id}`);
      const dislikedTheory = localStorage.getItem(`disliked-theory-${id}`);

      setIsLiked(likedTheory === "true");
      setIsDisliked(dislikedTheory === "true");
    }
  }, [id]);

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
      localStorage.setItem(`liked-theory-${id}`, "false");
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      localStorage.setItem(`liked-theory-${id}`, "true");

      if (isDisliked) {
        setIsDisliked(false);
        setDislikeCount((prev) => Math.max(prev - 1, 0));
        localStorage.setItem(`disliked-theory-${id}`, "false");
      }
    }

    await updateTheoryLikes(
      id,
      likeCount + (isLiked ? -1 : 1),
      isDisliked ? 0 : dislikeCount
    );
  };

  const handleDislike = async () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikeCount(0);
      localStorage.setItem(`disliked-theory-${id}`, "false");
    } else {
      setIsDisliked(true);
      setDislikeCount(1);
      localStorage.setItem(`disliked-theory-${id}`, "true");

      if (isLiked) {
        setIsLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
        localStorage.setItem(`liked-theory-${id}`, "false");
      }
    }

    await updateTheoryLikes(id, isLiked ? 0 : likeCount, isDisliked ? 0 : 1);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pixel-border pixel-shadow bg-white text-black p-4 mb-4 hover:scale-[1.01] transition-transform duration-200">
      {/* Schema Markup for SEO (JSON-LD) */}
      {currentURL && (
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
              url: currentURL,
            }),
          }}
        />
      )}

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
                isDisliked ? "text-red-500" : "text-pink-500"
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
