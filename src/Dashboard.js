import React, {useEffect, useState} from 'react';
import {useGet} from './helpers/request';
import {useLocalStorage} from '@uidotdev/usehooks';
import Statistic from './Dashboard/Statistic';

export default function Dashboard({props}) {
    const [statistic, setStatistic] = useState([]);
    const [email] = useLocalStorage('email', '');
    const getTests = useGet(`${process.env.REACT_APP_API_URL}/tests?limit=9999999&includes=questions`);
    const getScores = useGet(`${process.env.REACT_APP_API_URL}/scores?limit=9999999&email=${email}`);

    useEffect(() => {
        getTests()
            .then(xhr => {
                return xhr.data.data.tests;
            }).then(async (data) => {
                const scoresResponse = await getScores();

                return {tests: data, scores: scoresResponse.data.data.scores}
            }).then((data) => {
                const scores = [];

                data.tests.forEach(test => {
                    const totalQuestions = test.questions.length;
                    const passedQuestions = data.scores.filter(score => score.test_id === test.id).length;
                    let coveragePercent = passedQuestions
                        ? Math.round((passedQuestions * 100) / totalQuestions)
                        : 0

                    coveragePercent = coveragePercent > 100 ? 100 : coveragePercent;

                    scores.push({
                        lection: props.lections.filter(lection => lection.id === test.lection_id)[0],
                        progress: coveragePercent
                    });
                });

                setStatistic(scores);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.lections]);


    return (
        <main className="min-h-screen">
            <div className="sm:ml-64 p-4 md:p-8">
                <div className="content">
                    <div className="flex flex-col">
                        {
                            statistic.map((stat, index) => (
                                <Statistic key={index} props={{lection: stat?.lection, progress: stat?.progress}} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}