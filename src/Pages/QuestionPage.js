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
  CardContent,
  CardActions,
  Card,
  CardMedia,
  Grid,
} from "@mui/material";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isClickable, setIsClickable] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const fetchPosts = async () => {
    try {
      const result = await apiService.getQuestions();
      setQuestions(result.slice(0, 3));
    } catch (error) {
      console.error("Error fetching postsQuestions:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const enableClickTimer = setTimeout(() => {
      setIsClickable(true);
    }, 3000);

    return () => {
      clearTimeout(enableClickTimer);
    };
  }, [currentQuestionIndex]);

  const handleAnswerClick = (answer) => {
    if (isClickable) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = answer;
      setSelectedAnswers(newSelectedAnswers);
      setSelectedAnswer(answer);
      setIsClickable(true);
      setTimeout(() => {
        handleNextQuestion();
      }, 6000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setIsClickable(false);
    } else {
      setCurrentQuestionIndex(questions.length);
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f0f0"
    >
      <Card variant="outlined" style={{ width: "50%", height: "50%" }}>
        <CardContent>
          <Typography variant="h6" align="left">
            Soru {currentQuestionIndex + 1}/{questions.length}
          </Typography>
          <Typography variant="h5" align="center" style={{ margin: "20px 0" }}>
            {currentQuestion?.title}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {["A", "B", "C", "D"].map((option) => (
              <Button
                key={option}
                variant="contained"
                onClick={() => handleAnswerClick(option)}
                disabled={!isClickable}
                style={{ margin: "10px", width: "80%" }}
              >
                {option}
              </Button>
            ))}
          </Box>
          {selectedAnswer && (
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Seçtiğiniz cevap: {selectedAnswer}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionPage;
