import axios from "axios";

import React, { useState } from "react";

import CheckIcon from "./CheckIcon";
import Loading from "./Loading";
import styles from "../style/Button.module.css";
import { MdDeleteForever } from "react-icons/md";

const Delete = ({ page, id, getData }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const origin = "http://localhost:5000/v1";
  console.log(id);

  const handleDelete = async () => {
    try {
      setError(false);
      setIsLoading(true);
      const response = await axios.delete(`${origin}/admin/${page}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      // setIsOpen(true);
      // setTimeout(() => {
      //   setIsOpen(false);

      // }, 1000);
      getData();
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors[0].message);
    }
    setIsLoading(false);
  };
  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-40  bg-black bg-opacity-50 ">
          <div className="bg-white lg:w-[500px] mx-5 rounded-lg p-5 py-10 z-50 opacity-100 ">
            <h2 className="text-3xl text-center font-bold m-2 text-primary">
              Deleted Successfully
            </h2>
            <div className="flex justify-center items-center w-full mb-2">
              <CheckIcon />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-black">
          <label
            onClick={() => {
              setError(false);
            }}
            htmlFor={`my-modal-3`}
            // className={`${styles.Button} cursor-pointer bg-transparent text-black border-2 hover:bg-red-600 hover:text-white w-auto`}
          >
            <MdDeleteForever className="text-2xl text-red-500" />
          </label>
          <input type="checkbox" id={`my-modal-3`} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative m-auto">
              <label
                htmlFor={`my-modal-3`}
                className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
              >
                ✕
              </label>
              <h3 className="text-lg text-center font-bold">Are you sure?..</h3>
              <p className="py-4 text-center">
                This job will be deleted permanently.
              </p>
              {error && (
                <p className="mb-5 text-center text-red-500">{error}</p>
              )}
              {isLoading ? (
                <Loading />
              ) : (
                <div className="flex justify-center gap-5 p-5">
                  <button
                    className={` btn w-32 text-white  bg-red-700  hover:bg-red-800 hover:text-white`}
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                  <label
                    htmlFor="my-modal-3"
                    className={` btn  w-32 bg-transparent text-black border-2 cursor-pointer hover:bg-gray-500 `}
                  >
                    Cancel
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;
