import React, { useState } from "react";
import Confetti from "react-dom-confetti";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

const config = {
  angle: 80,
  spread: 90,
  startVelocity: 40,
  elementCount: 50,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const ConfettiButton = ({ children, onClick, className, ...props }) => {
  const router = useRouter();
  const [isConfetti, setIsConfetti] = useState(false);
  const { pending } = useFormStatus(); // Getting form submission status (pending state)

  const handleClick = (e) => {
    setIsConfetti(true);

    // Reset confetti after a short delay
    setTimeout(() => {
      setIsConfetti(false);
    }, 300);

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
    setTimeout(() => {
      // Redirect after 2 seconds
      router.push("/");
    }, 3000); // 2 seconds delay before routing
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`${className} ${pending ? "opacity-50 cursor-wait" : ""}`} // Add styles for when the form is submitting
        {...props}
      >
        {children}
      </button>

      {pending && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
          Submitting...
        </span>
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Confetti active={isConfetti} config={config} />
      </div>
    </div>
  );
};

export default ConfettiButton;
