import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGet} from "../helpers/request";
import Question from "./Test/Question";
import {useLocalStorage} from "@uidotdev/usehooks";

const collectCompletedQuestionsIds = (scores) => scores.map(score => score.question_id);

export default function Test() {
    let { id } = useParams();
    const [test, setTest] = useState();
    const [uncompletedQuestions, setUncompletedQuestions] = useState([]);
    const [isPassed, setIsPassed] = useState(false);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [email] = useLocalStorage('email', {});
    const getTest = useGet(`${process.env.REACT_APP_API_URL}/tests?id=${id}&includes=questions`);
    const getScores = useGet(`${process.env.REACT_APP_API_URL}/scores?limit=9999999999&test_id=${id}&email=${email}`);
    const getNextQuestionId = () => {
        const lastQuestionId = uncompletedQuestions.filter(question => question.id > currentQuestionId).at(0)?.id;

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
            .then(async (test) => {
                const response = await getScores();
                const completedQuestionIds = collectCompletedQuestionsIds(response.data.data.scores);
                const uncompletedQuestions = test.questions.filter(
                    (question) => ! completedQuestionIds.includes(question.id)
                );

                setUncompletedQuestions(uncompletedQuestions);

                if (! uncompletedQuestions.length) {
                    setIsPassed(true);

                    return test;
                }

                test && ! currentQuestionId
                    && uncompletedQuestions.length
                    && setCurrentQuestionId(uncompletedQuestions.at(0).id);

                return test;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (! test) {
        return (<p className="text-center text-lg">No such test</p>);
    }

    if (isPassed || ! currentQuestionId) {
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
                setIsPassed: setIsPassed
            }} />
        </div>
    );
}