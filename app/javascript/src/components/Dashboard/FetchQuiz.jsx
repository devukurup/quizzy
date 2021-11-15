import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { either, isNil, isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { useTable } from "react-table";

import DeleteQuiz from "./DeleteQuiz";

import quizzesApi from "../../apis/quizzes";
import { useQuiz } from "../../contexts/quiz";

const FetchQuiz = () => {
  const history = useHistory();
  const [quizName, setQuizName] = useState("");
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setDeleteQuiz, setDeleteId, deleteQuiz, setDashboardHeader } =
    useQuiz();

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
  useEffect(() => {
    fetchQuizzes();
  }, [deleteQuiz]);

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
    return <PageLoader />;
  }

  if (either(isNil, isEmpty)(quizList)) {
    return (
      <div className="align-middle text-center pt-40">
        {setDashboardHeader(false)}
        <Typography style="h3" weight="extralight">
          You have not created any quiz.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      {setDashboardHeader(true)}
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
              <tr
                key={i}
                className="cursor-pointer border px-8 py-4 "
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <div key={index} className="grid grid-cols-2 px-8 py-4 ">
                      <div
                        onClick={e => {
                          e.stopPropagation();
                          history.push({
                            pathname: `/showQuiz/${row?.original?.id}`,
                            state: row?.original,
                          });
                        }}
                      >
                        <td key={index} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      </div>
                      <div className="space-x-5 flex justify-end ">
                        <td key={index}>
                          <Button
                            label="Edit"
                            onClick={() => {
                              history.push({
                                pathname: `/EditQuiz/${row?.original?.id}`,
                                state: row?.original,
                              });
                            }}
                          />
                        </td>
                        <td key={index}>
                          <Button
                            label="Delete"
                            onClick={() => {
                              setDeleteId(row?.original?.id);
                              setQuizName(row?.original?.quiz_name);
                              setDeleteQuiz(true);
                            }}
                          />
                        </td>
                      </div>
                    </div>
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
