import React, { useEffect, useState } from "react";
import apiService from "../../src/service/apiService";

import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const fetchPosts = async () => {
    try {
      const result = await apiService.getQuestions();
      setQuestions(result.slice(0,10));
    } catch (error) {
      console.error("Error fetching postsQuestions:", error);
    }
  };
console.log("sorular: ",questions);
  useEffect(() => {
    fetchPosts();
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isClickable, setIsClickable] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 3000); 

    const nextQuestionTimer = setTimeout(() => {
      handleNextQuestion();
    }, 6000); 

    return () => {
      clearTimeout(timer);
      clearTimeout(nextQuestionTimer);
    };
  }, [currentQuestionIndex]);

  const handleAnswerClick = (answer) => {
    if (isClickable) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = answer;
      setSelectedAnswers(newSelectedAnswers);
      setSelectedAnswer(answer)
    } 
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsClickable(true);
      setSelectedAnswer("")
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Soru</TableCell>
              <TableCell>Verilen Yanıt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell>{question.title}</TableCell>
                <TableCell>{selectedAnswers[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Box>
      <Typography variant="h5">{currentQuestion.title}</Typography>
      <Box>
        {["A", "B", "C", "D"].map((option) => (
          <Button
            key={option}
            variant="contained"
            onClick={() => handleAnswerClick(option)}
            disabled={!isClickable}
            style={{ margin: "10px" }}
          >
            {option}
          </Button>
        ))}
      </Box>
      {selectedAnswer && <Typography variant="h6">Seçtiğiniz cevap: {selectedAnswer}</Typography>}
    </Box>
  );
};

export default QuestionPage;
