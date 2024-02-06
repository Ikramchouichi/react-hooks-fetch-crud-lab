import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, deleteQuestion, updateQuestion }) {
    return (
        <ul>
            {questions.map(question => (
                <QuestionItem
                    key={question.id}
                    question={question}
                    onDelete={deleteQuestion}
                    onUpdate={updateQuestion}
                />
            ))}
        </ul>
    );
}

export default QuestionList;
