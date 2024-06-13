import React from "react";

const HighlightText = ({ text, bgGradient }) => {
  return (
    <span
      className={`font-bold 
    ${bgGradient ? `${bgGradient}` : "fontGradient1"}
   bg-clip-text text-transparent`}
    >
      {text}
    </span>
  );
};

export default HighlightText;
