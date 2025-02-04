import React from "react";
import Form from "../_components/Form";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen bg-pink-100 p-4 overflow-hidden">
      <div className="max-w-2xl mx-auto mb-4">
        <Link href={"/"} className="">
          <div className="b-4 pixel-border pixel-shadow bg-pink-500 text-white px-4 py-2 hover:bg-pink-600  w-fit mb-4">
            &larr; go back
          </div>
        </Link>
        <Form />
      </div>
    </div>
  );
}
