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
  Card,
} from "@mui/material";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isClickable, setIsClickable] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const fetchQuestions = async () => {
    try {
      const result = await apiService.getQuestions();
      setQuestions(result.slice(0, 10));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setIsClickable(false);
    setTimeLeft(30);

    const enableClickTimer = setTimeout(() => {
      setIsClickable(true);
    }, 10000);

    const nextQuestionTimer = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
      } else {
        setCurrentQuestionIndex(questions.length);
      }
    }, 30000);

    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(enableClickTimer);
      clearTimeout(nextQuestionTimer);
      clearInterval(countdownTimer);
    };
  }, [isQuizStarted, currentQuestionIndex, questions.length]);

  const handleAnswerClick = (option) => {
    if (isClickable) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: option,
      }));
      setSelectedAnswer(option);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    return (
      <TableContainer
        component={Paper}
        aria-label="simple table"
        style={{
          backgroundColor: "#64b5f6",
          margin: "auto",
          marginTop: "50px",
          maxWidth: "80%",
          color: "white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Question No</TableCell>
              <TableCell style={{ color: "white" }}>Question</TableCell>
              <TableCell style={{ color: "white" }}>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: "white" }}>{question.id}</TableCell>
                <TableCell style={{ color: "white" }}>
                  {question.title}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {selectedAnswers[index]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    fetchQuestions();
  };
  if (!isQuizStarted) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f0f0f0"
      >
        <Card variant="outlined" style={{ width: "500px", padding: "20px" }}>
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              style={{ marginBottom: "20px" }}
            >
              Quiz Rules
            </Typography>
            <Typography
              variant="body1"
              align="left"
              style={{ marginBottom: "20px" }}
            >
              1. You will have 30 seconds for each question.
              <br />
              2. Each question will advance automatically.
              <br />
              3. You cannot mark for the first 10 seconds.
              <br />
              4. You can see your answers at the end of the quiz.
              <br />
              5.You can change your answer before time runs out.
              <br/>
              6.You can't switch between questions

            </Typography>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartQuiz}
              >
                Start
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
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
      <Card variant="outlined" style={{ width: "500px", height: "500px" }}>
        <CardContent>
          <Typography variant="h6" align="left">
            Questions {currentQuestionIndex + 1}/{questions.length}
          </Typography>
          <Typography variant="h5" align="center" style={{ margin: "20px 0" }}>
            Question: {currentQuestion?.title}
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
              Selected Answer: {selectedAnswer}
            </Typography>
          )}
        </CardContent>
        <Typography
          variant="body1"
          align="center"
          style={{ marginBottom: "20px" }}
        >
          Time left: {timeLeft} sec
        </Typography>
      </Card>
    </Box>
  );
};

export default QuestionPage;
