import Header from "./Header";
import React, {useEffect, useState} from "react";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import {useGet} from "./helpers/request";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Lection from "./Dashboard/Lection";
import Test from "./Dashboard/Test";

export default function UserCabinet() {
    const [isShownSidebar, setIsShownSidebar] = useState(false);
    const switchSidebar = () => setIsShownSidebar(!isShownSidebar);
    const [lections, setLections] = useState([]);
    const doGetLectionsRequest = useGet(`${process.env.REACT_APP_API_URL}/lections?limit=9999999`);
    const getLectionById = (id) => lections.filter((lection) => lection.id === parseInt(id)).pop()

    useEffect(() => {
        doGetLectionsRequest().then(xhr => setLections(xhr.data.data.lections));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header switchSidebar={switchSidebar} />
            <div className="after:content-[''] after:table after:clear-both">
                <Sidebar props={{isShown: isShownSidebar, lections: lections}} />
                <main className="min-h-screen">
                    <div className="sm:ml-64 p-4 md:p-8">
                        <div className="content">
                            <BrowserRouter basename="/">
                                <Routes>
                                    <Route path="/" element={<Dashboard props={{lections: lections}} />} />
                                    <Route path="/lection/:id" element={<Lection props={{getLectionById: getLectionById}} />} />
                                    <Route path="/test/:tid" element={<Test />} />
                                    <Route path="/test/:tid/question/:qid" element={<Test />} />
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}