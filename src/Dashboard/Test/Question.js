import React, {useEffect, useState} from "react";
import {useGet} from "../../helpers/request";
import Answer from "./Question/Answer";
import Next from "./Question/Next";

export default function Question({props}) {
    const [question, setQuestion] = useState();
    const [selectedAnswer, setSelectedAnswer] = useState();
    const getQuestion = useGet(`${process.env.REACT_APP_API_URL}/questions?id=${props.id}&includes=answers`);

    useEffect(() => {
        getQuestion().then(xhr => xhr.data.data.questions.length && setQuestion(xhr.data.data.questions[0]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (! props.id || ! question) {
        return (<p className="text-center text-lg">The test has no questions yet</p>);
    }

    return (
        <div className="flex flex-col">
            <p className="text-lg mb-4">{question.text}</p>
            <div className="flex flex-col mb-8">
                {
                    question.answers.length
                        ? question.answers.map((answer => <Answer key={answer.id} props={{answer: answer, selectAnswer: setSelectedAnswer}} />))
                        : (<p className="text-center text-lg">The questions has no answers yet</p>)
                }
                <Next props={{
                    test: props.test,
                    question: question,
                    answerToSubmit: selectedAnswer,
                    isLastQuestion: props.test.questions.at(-1)?.id === question?.id,
                    next: props.next,
                    progress: props.progress,
                    setProgress: props.setProgress,
                    setIsPassed: props.setIsPassed
                }}/>
            </div>
        </div>
    );
}