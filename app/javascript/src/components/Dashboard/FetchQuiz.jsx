import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { either, isNil, isEmpty } from "ramda";
import { useTable } from "react-table";

import quizzesApi from "../../apis/quizzes";

const FetchQuiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizList(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const data = useMemo(() => quizList, [quizList]);
  const columns = useMemo(
    () => [
      {
        Header: "Quiz name",
        accessor: "quiz_name",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (either(isNil, isEmpty)(quizList)) {
    return (
      <div className="align-middle text-center pt-40">
        <Typography style="h3" weight="extralight">
          You have not created any quiz.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table
        className="shadow-lg border-4 bg-white w-9/12 mx-auto"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  className="bg-blue-100 border text-left px-8 py-4"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      className="border px-8 py-4"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FetchQuiz;
