"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { getRangedTheories, updateTheoryLikes } from "../_lib/data-service";

const ReelsView = () => {
  const [theories, setTheories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastCardRef = useRef(null);

  useEffect(() => {
    const loadTheories = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const fetchedTheories = await getRangedTheories(page, 5);
        setTheories((prev) => [...prev, ...fetchedTheories]);
      } catch (error) {
        console.error("Error fetching theories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTheories();
  }, [page]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLike = async (id) => {
    setTheories((prev) =>
      prev.map((theory) => {
        if (theory.id === id) {
          const isLiked = localStorage.getItem(`liked-theory-${id}`) === "true";
          const newLikeCount = isLiked
            ? Math.max(theory.like - 1, 0)
            : theory.like + 1;
          localStorage.setItem(
            `liked-theory-${id}`,
            !isLiked ? "true" : "false"
          );

          updateTheoryLikes(id, newLikeCount, theory.dislike);

          return { ...theory, like: newLikeCount };
        }
        return theory;
      })
    );
  };

  const handleDislike = async (id) => {
    setTheories((prev) =>
      prev.map((theory) => {
        if (theory.id === id) {
          const isDisliked =
            localStorage.getItem(`disliked-theory-${id}`) === "true";
          const newDislikeCount = isDisliked
            ? Math.max(theory.dislike - 1, 0)
            : theory.dislike + 1;
          localStorage.setItem(
            `disliked-theory-${id}`,
            !isDisliked ? "true" : "false"
          );

          updateTheoryLikes(id, theory.like, newDislikeCount);

          return { ...theory, dislike: newDislikeCount };
        }
        return theory;
      })
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = (e) => {
      if (e.target.scrollTop % window.innerHeight === 0) {
        e.target.scrollTo({
          top: e.target.scrollTop + window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-pink-100 overflow-hidden">
      <div
        className="scroll-container snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {theories.map((theory, index) => (
          <div
            key={theory.id}
            ref={index === theories.length - 1 ? lastCardRef : null}
            className="snap-start h-screen w-full flex justify-center items-center"
          >
            <div className="relative h-full w-full flex justify-center items-center">
              <div className="bg-white text-black p-6 max-w-sm md:max-w-md w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 w-full">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-pink-500" />
                    <span className="text-pink-600 font-bold">
                      {theory.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <FaThumbsUp
                        className={`cursor-pointer ${
                          localStorage.getItem(`liked-theory-${theory.id}`) ===
                          "true"
                            ? "text-green-500"
                            : "text-pink-500"
                        }`}
                        onClick={() => handleLike(theory.id)}
                      />
                      <span className="text-pink-600">{theory.like}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaThumbsDown
                        className={`cursor-pointer ${
                          localStorage.getItem(
                            `disliked-theory-${theory.id}`
                          ) === "true"
                            ? "text-red-500"
                            : "text-pink-500"
                        }`}
                        onClick={() => handleDislike(theory.id)}
                      />
                      <span className="text-pink-600">{theory.dislike}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-pink-600 text-center mb-4">
                  {theory.title}
                </h2>
                <p className="text-lg text-center text-black">
                  {theory.content}
                </p>

                <div className="absolute bottom-10 text-center w-full">
                  <span className="text-sm text-pink-500">{theory.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="h-20 w-full flex items-center justify-center pb-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelsView;
