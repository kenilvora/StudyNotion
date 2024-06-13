import React from "react";

const Spinner = ({height}) => {
  return (
    <div className={`flex justify-center items-center 
    
        ${
          height ? `${height}` : "min-h-[calc(100vh-3.53rem)]"
        }`}>
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
