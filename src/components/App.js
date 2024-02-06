import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
    const [page, setPage] = useState("List");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error)); // Make sure to handle errors
    }, []);

    const addQuestion = (newQuestion) => {
        setQuestions(currentQuestions => [...currentQuestions, newQuestion]);
    };

    const deleteQuestion = (questionId) => {
        fetch(`http://localhost:4000/questions/${questionId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setQuestions(currentQuestions => currentQuestions.filter(question => question.id !== questionId));
                } else {
                    // Handle server-side error (response not ok)
                    console.error(`Failed to delete question with id: ${questionId}`);
                }
            })
            .catch(error => console.error('Error deleting question:', error)); // Handle network error
    };

    const updateQuestion = (id, newCorrectIndex) => {
        fetch(`http://localhost:4000/questions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correctIndex: newCorrectIndex }),
        })
        .then(response => response.json())
        .then(updatedQuestion => {
            setQuestions(currentQuestions => currentQuestions.map(question => {
                return question.id === id ? updatedQuestion : question;
            }));
        })
        .catch(error => console.error('Error updating question:', error)); // Handle network error
    };

    return (
        <main>
            <AdminNavBar onChangePage={setPage} />
            {page === "Form" ? (
                <QuestionForm addQuestion={addQuestion} />
            ) : (
                <QuestionList 
                    questions={questions} 
                    deleteQuestion={deleteQuestion} 
                    updateQuestion={updateQuestion}
                />
            )}
        </main>
    );
}

export default App;
