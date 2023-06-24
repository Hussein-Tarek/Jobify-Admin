import axios from "axios";

import React, { useState, useEffect } from "react";
import useApiRequest from "../hooks/reqHook";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

const Employers = () => {
  // const origin = "https://jobify-duec.onrender.com/v1";
  const origin = "http://localhost:5000/v1";
  const params = useLocation().search;
  const token =
    localStorage.getItem("accessToken") &&
    `Bearer ${localStorage.getItem("accessToken")}`;
  const [employers, setEmployers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getEmployers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${origin}/admin/employers${params}`, {
        headers: { Authorization: token },
      });
      console.log(response);
      setEmployers(response.data.employers);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getEmployers();
  }, [params]);

  if (isLoading) {
    return (
      <h1 className="mt-40">
        <Loading />
      </h1>
    );
  }
  return (
    <>
      {!employers.length > 0 ? (
        <h1>No Users</h1>
      ) : (
        <Table
          thead={[, "Name", "Email"]}
          data={employers}
          page="Employers"
          getData={getEmployers}
          pagination={pagination}
        />
      )}
    </>
  );
};

export default Employers;
