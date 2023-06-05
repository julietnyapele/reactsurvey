

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Questions.css";

const MarketSurvey = () => {
  const questions = [
    {
      id: 1,
      question: "1. What is your name?",
      type: "text"
    },
    {
      id: 2,
      question: "2. What is your age?",
      type: "number"
    },
    {
      id: 3,
      question: "3. How likely are you to purchase any of our products again?",
      options: [
        { id: "Extremely well", label: "Extremely well" },
        { id: "Very well", label: "Very well" },
        { id: "Somewhat well", label: "Somewhat well" },
        { id:"Not so well", label: "Not so well" },
        { id:"Not at all well" , label: "Not at all well" }
      ]
    },
    {
      id: 4,
      question: "4. Overall, how satisfied or dissatisfied are you with our company?",
      options: [
        { id: "Very satisfied", label: "Very satisfied" },
        { id: "Somewhat satisfied", label: "Somewhat satisfied" },
        { id: "Neither satisfied nor dissatisfied", label: "Neither satisfied nor dissatisfied" },
        { id: "Feature 4", label: "Somewhat dissatisfied" },
        { id: "Feature 5", label: "Very dissatisfied" }
      ]
    },
    {
      id: 5,
      question: "5. How would you rate this product?",
      type: "stars",
    },
    {
      id: 6,
      questionId: "Q6",
      question: "6. Do you have any additional comments or feedback?",
      type: "comment",
    }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hoverStars, setHoverStars] = useState(0);


  const handleOptionSelect = (questionId, optionId) => {
    const existingAnswer = answers.find(answer => answer.questionId === questionId);
    if (existingAnswer) {
      const updatedAnswers = answers.map(answer => {
        if (answer.questionId === questionId) {
          return { ...answer, optionId };
        }
        return answer;
      });
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { questionId, optionId }]);
    }
  };
 
  const handleStarsChange = (stars) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = { questionId: questions[step].id, stars };
    setAnswers(updatedAnswers);
  };


  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.filter(answer => answer.questionId !== questions[step].id));
    }
  };
  
  const handleNextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.length === questions.length) {
      
      console.log(answers);
      setSubmitted(true);
    } else {
      alert('Please answer all questions before submitting.');
      setStep(0); 
    }
  };

  const handleBackToSurvey = () => {
    setShowResults(false);
  };

return (
  <>
    {submitted ? (
      <div>
        <h3>Thank you for submitting the survey!</h3>
        <p>Your responses have been recorded.</p>
        <Link to="/Home">Back to Home</Link>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        {showResults ? (
          <div>
            <h3>Review Your Answers</h3>
            {questions.map((question) => (
              <div key={question.id} className="form-control">
                <p key={`question-${question.id}`}>{question.question}</p>
                {answers.some((answer) => answer.questionId === question.id) ? (
                  answers
                    .filter((answer) => answer.questionId === question.id)
                    .map((answer) => {
                      if (answer.text) {
                        return <p key={`answer-${answer.id}`}>{answer.text}</p>;
                      } else if (answer.number) {
                        return <p key={`answer-${answer.id}`}>{answer.number}</p>;
                      } else if (answer.optionId) {
                        const option = question.options.find((option) => option.id === answer.optionId);
                        return <p key={`answer-${answer.id}`}>{option.label}</p>;
                      } else if (answer.stars) {
                        return <p key={`answer-${answer.id}`}>{answer.stars} stars</p>;
                      } else if (answer.comment) {
                        return <p key={`answer-${answer.id}`}>{answer.comment}</p>;
                      }
                      return null;
                    })
                ) : (
                  <p>No answer</p>
                )}
              </div>
            ))}
            <div>
              <button type="button" onClick={handleBackToSurvey}>
                Back to Survey
              </button>
              <button type="submit">Submit</button>
            </div>
          </div>
        ) : (
          <>
            {step < questions.length ? (
              <>
                <div className="form-control">
                  <p>{questions[step].question}</p>
                  {questions[step].type === "text" ? (
                    <div>
                      <input
                        type="text"
                        id={`question_${questions[step].id}`}
                        name={`question_${questions[step].id}`}
                        value={answers[step]?.text || ""}
                        onChange={(e) =>
                          setAnswers([
                            ...answers.slice(0, step),
                            { questionId: questions[step].id, text: e.target.value },
                            ...answers.slice(step + 1),
                          ])
                        }
                      />
                    </div>
                  ) : questions[step].type === "number" ? (
                    <div>
                      <input
                        type="number"
                        id={`question_${questions[step].id}`}
                        name={`question_${questions[step].id}`}
                        value={answers[step]?.number || ""}
                        onChange={(e) =>
                          setAnswers([
                            ...answers.slice(0, step),
                            { questionId: questions[step].id, number: e.target.value },
                            ...answers.slice(step + 1),
                          ])
                        }
                      />
                    </div>
                  ) : questions[step].options ? (
                    <div>
                      {questions[step].options.map((option) => (
                        <div key={option.id}>
                          <label htmlFor={option.id}>
                            <input
                              type="radio"
                              id={option.id}
                              name={`question_${questions[step].id}`}
                              value={option.id}
                              onChange={() => handleOptionSelect(questions[step].id, option.id)}
                              checked={answers.some(
                                (answer) =>
                                  answer.questionId === questions[step].id && answer.optionId === option.id
                              )}
                            />
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : questions[step].type === "stars" ? (
                    <div>
                      <div className="stars">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <span
                            key={value}
                            className={`star ${value <= (hoverStars || answers[step]?.stars || 0) ? "filled" : ""}`}
                            onClick={() => handleStarsChange(value)}
                            onMouseEnter={() => setHoverStars(value)}
                            onMouseLeave={() => setHoverStars(0)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : questions[step].type === "comment" ? (
                    <div>
                      <label htmlFor={`comment_${questions[step].id}`}>Additional Comments or Feedback:</label>
                      <textarea
                        id={`comment_${questions[step].id}`}
                        name={`comment_${questions[step].id}`}
                        onChange={(e) => {
                          const updatedAnswer = {
                            ...answers[step],
                            questionId: questions[step].id,
                            comment: e.target.value,
                          };
                          setAnswers([
                            ...answers.slice(0, step),
                            updatedAnswer,
                            ...answers.slice(step + 1),
                          ]);
                        }}
                        value={answers[step]?.comment || ""}
                      ></textarea>
                    </div>
                  ) : null}

                  {step > 0 && (
                    <button type="button" onClick={handlePreviousStep}>
                      Previous
                    </button>
                  )}
                  {step < questions.length - 1 ? (
                    <button type="button" onClick={handleNextStep}>
                      Next
                    </button>
                  ) : (
                    <button type="button" onClick={() => setShowResults(true)}>
                      Complete Survey
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </>
        )}
      </form>
    )}
  </>
);
};

export default MarketSurvey;