import React, { useEffect, useState } from 'react'
import apiService from "../src/service/apiService"
const App = () => {
  const [questions,setQuestions]=useState([])
  const fetchPosts = async () => {
    try {
      const result = await apiService.getQuestions();
      setQuestions(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("test: ",questions);
  return (
    <div>
      
    </div>
  )
}

export default App
