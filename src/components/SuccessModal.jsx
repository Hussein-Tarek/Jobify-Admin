import React from "react";
import CheckIcon from "./CheckIcon";

const SuccessModal = ({ msg }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40  bg-black bg-opacity-50 ">
      <div className="bg-white lg:w-[500px] mx-5 rounded-lg p-5 py-10 z-50 opacity-100 ">
        <h2 className="text-3xl text-center font-bold m-2 text-primary">
          {msg}
        </h2>
        <div className="flex justify-center items-center w-full mb-2">
          <CheckIcon />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
