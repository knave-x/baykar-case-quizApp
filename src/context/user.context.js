import React, { useState, useEffect } from "react";
import apiService from "../service/apiService";

export const UserProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const data = await apiService.getQuestions();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      {React.cloneElement(children, { questions })}
    </>
  );
};
