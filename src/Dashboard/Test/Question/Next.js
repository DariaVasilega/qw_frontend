import React, {useEffect, useState} from "react";
import {useLocalStorage} from "@uidotdev/usehooks";
import {usePost} from "../../../helpers/request";
import {useNavigate} from "react-router-dom";


export default function Next({props}) {
    const moveTo = useNavigate();
    const [next, setNext] = useState(false);
    const [email] = useLocalStorage('email', '');
    const completeQuestion = usePost(
        `${process.env.REACT_APP_API_URL}/score`,
        {
            email: email,
            test_id: props.test.id,
            question_id: props?.question?.id,
            answer_id: props.answerToSubmit?.id,
            points: props.answerToSubmit?.points
        }
    );
    const submitAnswer = () => {
        completeQuestion()
            .then(() => setNext(true))
            .catch(() =>  props.setIsPassed(true))
            .finally(() => moveTo(`/test/${props.test.id}`));
    }

    useEffect(() => {
        next && moveTo(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [next]);

    if (! props.answerToSubmit) {
        return;
    }

    return (
        <div className="w-10/12 flex justify-end">
            <button onClick={submitAnswer} className="py-2 text-gray-500 hover:text-gray-900">
                <div className="flex items-center">
                    <span className="font-medium text-lg">{props.isLastQuestion ? 'Finish' : 'Next'}</span>
                    <span className="ml-2">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </span>
                </div>
            </button>
        </div>
    );
}