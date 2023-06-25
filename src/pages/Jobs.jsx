import axios from "axios";

import React from "react";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { Pagination } from "@material-tailwind/react";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
const origin = "https://jobifyy.onrender.com/v1";
// const origin = "http://localhost:5000/v1";
const Jobs = () => {
  const token =
    localStorage.getItem("accessToken") &&
    `Bearer ${localStorage.getItem("accessToken")}`;
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useLocation().search;
  const getJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${origin}/admin/jobs${params}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getJobs();
  }, [params]);
  console.log({ jobs });
  if (isLoading) {
    return (
      <h1 className="mt-40">
        <Loading />
      </h1>
    );
  }
  return (
    <>
      {!jobs?.length > 0 ? (
        <h1>No Users</h1>
      ) : (
        <Table
          thead={[, "Title", "Category"]}
          data={jobs}
          page="Jobs"
          getData={getJobs}
          pagination={pagination}
        />
      )}
    </>
  );
};

export default Jobs;
