import React from "react";
import {useParams} from "react-router-dom";

export default function Lection ({props}) {
    const { id } = useParams();
    const lection = props.getLectionById(id);

    if (! lection) {
        return (<p className="text-center text-lg">No such lection</p>);
    }

    return (
        <div className="flex flex-col">
            <div className="mb-8">
                <p className="text-2xl">Lection: {lection.id}</p>
            </div>
            <div dangerouslySetInnerHTML={{__html: lection.text}}></div>
        </div>

    );
}