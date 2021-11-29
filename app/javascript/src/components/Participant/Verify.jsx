import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

import publicQuizApi from "apis/public";

const Verify = () => {
  const { slug, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const history = useHistory();

  const fetchQuiz = async () => {
    try {
      const response = await publicQuizApi.show({ slug });
      setData(response.data.quiz);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto pt-48">
        <PageLoader />
      </div>
    );
  }

  if (!data) {
    history.push("/public/notfound");
    return <></>;
  }
  history.push(`/public/${id}/${slug}/attempt/new`);
  return <></>;
};

export default Verify;
