import React from "react";
import Item from "./Sidebar/Item";
import {BrowserRouter} from "react-router-dom";

export default function Sidebar({props}) {
    return (
        <aside id="default-sidebar" className={`fixed z-40 w-64 h-screen transition-transform ${props.isShown ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:float-left sm:my-0.5`} aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <BrowserRouter>
                        {
                            props.lections.map(lection => <Item key={lection.id} lection={lection} />)
                        }
                    </BrowserRouter>
                </ul>
            </div>
        </aside>
    );
}