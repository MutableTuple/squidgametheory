"use client";
import React, { useState } from "react";
import { FaUser, FaThumbsUp, FaComment } from "react-icons/fa";
import { FaMask } from "react-icons/fa";
import TheoryCard from "./TheoryCard";
import PixelButton from "./PixelButton";
import Link from "next/link";
import Countdown from "./Countdown";

export default function Homepage({ theories, theory_count }) {
  const [sortMethod, setSortMethod] = useState("latest");

  // Function to shuffle the theories randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Sort theories based on the selected sort method
  const sortedTheories = (() => {
    switch (sortMethod) {
      case "latest":
        return theories.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "mostLiked":
        return theories.sort((a, b) => b.like - a.like);
      case "random":
        return shuffleArray(theories);
      default:
        return theories;
    }
  })();

  return (
    <div className="min-h-screen bg-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl text-center font-pixel text-pink-600 mb-8 flex items-center justify-center">
          <FaMask className="mr-4" /> Squid Game Theories
          <FaMask className="ml-4" />
        </h1>
        <div className="flex items-center gap-2 justify-center py-5 text-xl">
          {theory_count} theories submitted
        </div>
        <div>
          <Countdown />
        </div>
        <Link href="/create">
          <div className="min-w-full flex items-center justify-center justify-self-center">
            <div className="mb-4 pixel-border pixel-shadow bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-all duration-200 w-full sm:w-md text-center sm:max-w-sm relative overflow-hidden ">
              Add a theory
            </div>
          </div>
        </Link>
        <Link href="/shortview">
          <div className="min-w-full flex items-center justify-center justify-self-center">
            <div className="mb-4 pixel-border pixel-shadow bg-rose-500 text-white px-4 py-2 hover:bg-rose-600 transition-all duration-200 w-full sm:w-md text-center sm:max-w-sm relative overflow-hidden ">
              Browse like Reels
            </div>
          </div>
        </Link>

        {/* Sort tabs */}
        <div className="flex justify-center mb-6 space-x-6">
          <button
            className={`text-lg ${
              sortMethod === "latest" ? "text-green-500" : "text-pink-500"
            }`}
            onClick={() => setSortMethod("latest")}
          >
            <FaMask className="mr-2 inline" /> Latest
          </button>
          <button
            className={`text-lg ${
              sortMethod === "mostLiked" ? "text-green-500" : "text-pink-500"
            }`}
            onClick={() => setSortMethod("mostLiked")}
          >
            <FaThumbsUp className="mr-2 inline" /> Most Liked
          </button>
          <button
            className={`text-lg ${
              sortMethod === "random" ? "text-green-500" : "text-pink-500"
            }`}
            onClick={() => setSortMethod("random")}
          >
            <FaMask className="mr-2 inline" /> Random
          </button>
        </div>

        {/* Display sorted theories */}
        <div>
          {sortedTheories.map((theory) => (
            <TheoryCard key={theory.id} {...theory} />
          ))}
        </div>
      </div>
    </div>
  );
}
