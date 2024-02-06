import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
    const { id, prompt, answers, correctIndex } = question;

    const handleDelete = () => {
        onDelete(id);
    };

    const handleAnswerChange = (event) => {
        const newCorrectIndex = parseInt(event.target.value);
        onUpdate(id, newCorrectIndex);
    };

    return (
        <li>
            <h4>Question {id}</h4>
            <h5>{prompt}</h5>
            <select value={correctIndex} onChange={handleAnswerChange}>
                {answers.map((answer, index) => (
                    <option key={index} value={index}>
                        {answer}
                    </option>
                ))}
            </select>
            <button onClick={handleDelete}>Delete Question</button>
        </li>
    );
}

export default QuestionItem;
