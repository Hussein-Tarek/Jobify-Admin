import axios from "axios";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Pagination from "./Pagination";
import Delete from "./Delete";
import Loading from "./Loading";
import CheckIcon from "./CheckIcon";
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Table = ({ thead, data, page, getData, pagination }) => {
  const origin = "http://35.158.95.84:5000/v1";
  // const origin = "http://localhost:5000/v1";
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  console.log({ data });
  const handleDelete = async (id) => {
    setError(false);
    setIsLoading(true);
    try {
      const response = await axios.delete(`${origin}/admin/${page}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        getData();
      }, 1500);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors[0].message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <h1 className=" mb-5 font-bold md:text-3xl text-blue-600 mt-32  ">
        {page}
      </h1>
      <div className="w-full overflow-auto overflow-x-auto h-[500px] mb-20">
        <table className="table w-full border-2">
          <thead>
            <tr className="text-white bg-blue-600 text-lg lg:text-xl">
              <th>{thead[1]}</th>
              <th>{thead[2]}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                {page == "Jobs" ? (
                  <>
                    <td>
                      <div>
                        <div className="font-bold">{item.title}</div>
                      </div>
                    </td>
                    <td>
                      {item.category}
                      <br />
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <div>
                        {item.name ? (
                          <div className="font-bold">{item.name}</div>
                        ) : (
                          <div className="font-bold">{`${item.first_name} ${item.last_name}`}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      {item.email}
                      <br />
                    </td>
                  </>
                )}

                <td>
                  {/* <button onClick={() => handleDelete(item.id)}>
                    <MdDeleteForever className="text-2xl text-red-500" />
                  </button> */}

                  {/* <Delete id={item.id} page={page} getData={getData} /> */}

                  {isOpen ? (
                    <div className="fixed inset-0 flex items-center justify-center z-40  bg-black bg-opacity-5 ">
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
                        htmlFor={`my-modal-3${item.id}`}
                        // className={`${styles.Button} cursor-pointer bg-transparent text-black border-2 hover:bg-red-600 hover:text-white w-auto`}
                      >
                        <MdDeleteForever className="text-2xl text-red-500" />
                      </label>
                      <input
                        type="checkbox"
                        id={`my-modal-3${item.id}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box relative m-auto">
                          <label
                            htmlFor={`my-modal-3${item.id}`}
                            className="btn btn-sm btn-circle absolute right-2 top-2 border-none"
                          >
                            ✕
                          </label>
                          <h3 className="text-lg text-center font-bold">
                            Are you sure?..
                          </h3>
                          <p className="py-4 text-center">
                            This job will be deleted permanently.
                          </p>
                          {error && (
                            <p className="mb-5 text-center text-red-500">
                              {error}
                            </p>
                          )}
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <div className="flex justify-center gap-5 p-5">
                              <button
                                className={` btn w-32 text-white  bg-red-700  hover:bg-red-800 hover:text-white`}
                                onClick={() => handleDelete(item.id)}
                              >
                                Yes
                              </button>
                              <label
                                htmlFor={`my-modal-3${item.id}`}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-10">
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};

export default Table;
