import React from "react";

export default function Answer({props}) {
    return (
        <div className="flex items-center mb-4">
            <input id={props.answer.id} onChange={() => props.selectAnswer(props.answer)} name="answer_id" type="radio" value={props.answer.id} className="w-4 h-4 ml-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label htmlFor={props.answer.id} className="ml-2 font-medium text-gray-900 dark:text-gray-300">{props.answer.text}</label>
        </div>
    );
}