"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import PixelButton from "./PixelButton";
import ConfettiButton from "./ConfettiButton";
import { createTheory } from "../_lib/data-service";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

export default function Form() {
  const [newTheory, setNewTheory] = useState({
    author: "",
    title: "",
    content: "",
    twitter_handle: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Use useEffect to retrieve saved data from localStorage when the component mounts
  useEffect(() => {
    const savedAuthor = localStorage.getItem("author");
    const savedTwitterHandle = localStorage.getItem("twitter_handle");

    if (savedAuthor && savedTwitterHandle) {
      setNewTheory({
        ...newTheory,
        author: savedAuthor,
        twitter_handle: savedTwitterHandle,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTheory((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!newTheory.author || !newTheory.title || !newTheory.content) {
      toast.error("Please fill all fields."); // Show error toast
      return;
    }

    try {
      // Call Supabase function to insert the theory
      const result = await createTheory(
        newTheory.author,
        newTheory.content,
        newTheory.title,
        newTheory.twitter_handle
      );

      // Check result and show success/failure
      if (result) {
        toast.success("Theory submitted successfully! redirecting.."); // Show success toast
        triggerConfetti();

        // Save username and twitter handle to localStorage for next submission
        localStorage.setItem("author", newTheory.author);
        localStorage.setItem("twitter_handle", newTheory.twitter_handle);

        setNewTheory({
          author: "",
          title: "",
          content: "",
          twitter_handle: "",
        });
      } else {
        toast.error("Something went wrong. Please try again."); // Show error toast
      }
    } catch (error) {
      console.error("Error submitting theory:", error);
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <div className="pixel-border pixel-shadow bg-white p-8 mb-8 relative ">
      {/* Toast container to render toasts */}
      <Toaster position="top-center" reverseOrder={false} />

      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}
      <h2 className="text-3xl font-pixel text-pink-600 mb-6 text-center">
        Submit Theory
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="author"
          value={newTheory.author}
          onChange={handleInputChange}
          placeholder="Username"
          className="pixel-input pixel-border w-full p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="twitter_handle"
          value={newTheory.twitter_handle}
          onChange={handleInputChange}
          placeholder="@twitter_handle (optional)"
          className="pixel-input pixel-border w-full p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="title"
          value={newTheory.title}
          onChange={handleInputChange}
          placeholder="Theory Title"
          className="pixel-input pixel-border w-full p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <textarea
          name="content"
          value={newTheory.content}
          onChange={handleInputChange}
          placeholder="Your theory..."
          rows="6"
          className="pixel-input pixel-border w-full p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        ></textarea>
        <div className="flex justify-center">
          <ConfettiButton
            type="submit"
            className="pixel-button b-4 pixel-border pixel-shadow bg-pink-500 text-white px-8 py-3 hover:bg-pink-600 transition-all duration-200 w-full max-w-xs mb-4"
          >
            Submit
          </ConfettiButton>
        </div>
      </form>
    </div>
  );
}
