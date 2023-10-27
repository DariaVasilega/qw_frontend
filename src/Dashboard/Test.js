import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGet} from "../helpers/request";
import Question from "./Test/Question";
import {useLocalStorage} from "@uidotdev/usehooks";

export default function Test() {
    let { tid, qid } = useParams();
    const [test, setTest] = useState();
    const [isPassed, setIsPassed] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(qid);
    const getTest = useGet(`${process.env.REACT_APP_API_URL}/tests?id=${tid}&includes=questions`);
    const [progress, setProgress] = useLocalStorage('progress', {});
    const getNextQuestionId = () => {
        const lastQuestionId = test.questions.filter(question => question.id > currentQuestionId).at(0)?.id;

        return lastQuestionId ? lastQuestionId : null;
    };

    useEffect(() => {
        getTest()
            .then(xhr => {
                if (! xhr.data.data.tests.length) {
                    return null;
                }

                setTest(xhr.data.data.tests[0]);

                return xhr.data.data.tests[0];
            })
            .then((test) => {
                test && ! currentQuestionId && setCurrentQuestionId(test.questions.at(0).id)
                progress.hasOwnProperty(test?.id) && setCurrentQuestionId(progress[test.id])
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (! test) {
        return (<p className="text-center text-lg">No such test</p>);
    }

    if ((progress.hasOwnProperty(test?.id) && ! progress[test.id]) || isPassed) {
        return (<p className="text-center text-lg">You have already completed the test</p>);
    }

    return (
        <div className="flex flex-col">
            <div className="mb-8">
                <p className="text-2xl mb-4">Test: {test.label}</p>
            </div>
            <Question props={{
                test: test,
                id: currentQuestionId,
                next: getNextQuestionId(),
                progress: progress,
                setProgress: setProgress,
                setIsPassed: setIsPassed
            }} />
        </div>
    );
}