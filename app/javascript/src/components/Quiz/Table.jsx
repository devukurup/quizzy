import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { Tooltip } from "@bigbinary/neetoui/v2";
import { either, isNil, isEmpty } from "ramda";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

import quizzesApi from "apis/quizzes";
import { useQuiz } from "contexts/quiz";

import DeleteQuiz from "./Delete";

const FetchQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    setDeleteQuiz,
    setDeleteId,
    deleteQuiz,
    setDashboardHeader,
    quizList,
    setQuizList,
  } = useQuiz();
  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizList(response.data.quizzes);
      response.data.quizzes.length > 0
        ? setDashboardHeader(true)
        : setDashboardHeader(false);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [deleteQuiz]);

  const rowData = quizList.map(item => {
    let row = {};

    row.quiz_name = (
      <Link
        to={{
          pathname: `/quiz/${item.id}/show`,
          state: item,
        }}
      >
        {" "}
        <Typography textTransform="capitalize" style="body1">
          {item.quiz_name}
        </Typography>
      </Link>
    );

    row.edit_delete = (
      <div className="flex space-x-5 justify-end">
        <Tooltip content="Edit" position="bottom">
          <Link
            to={{
              pathname: `/quiz/${item.id}/edit`,
              state: item,
            }}
          >
            <Edit color="#808080" />
          </Link>
        </Tooltip>
        <Tooltip content="Delete" position="bottom">
          <Button
            icon={Delete}
            style="danger"
            onClick={() => {
              setDeleteId(item.id);
              setQuizName(item.quiz_name);
              setDeleteQuiz(true);
            }}
          />
        </Tooltip>
      </div>
    );

    return row;
  });

  const data = useMemo(() => rowData, [quizList]);

  const columns = useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz_name",
      },
      {
        Header: "",
        accessor: "edit_delete",
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
    return <PageLoader />;
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
      <table className="border-2 bg-white w-8/12 mx-auto" {...getTableProps()}>
        <thead className="bg-gradient-to-r from-green-300 to-blue-400  border font-semibold text-lg text-left px-8 py-4">
          {headerGroups.map((headerGroup, index) => (
            <tr key={index + 1} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  className="px-2 py-5"
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
              <tr
                key={i}
                className=" cursor-pointer border "
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps()}
                      className="px-2 py-3"
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
      {deleteQuiz && <DeleteQuiz quizName={quizName} />}
    </div>
  );
};

export default FetchQuiz;
