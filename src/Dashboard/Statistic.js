import React from "react";

export default function Dashboard({props}) {
    return (
        <div className="flex w-full items-center justify-center my-2">
            <div className="w-2/3">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis ">Lection {props?.lection?.id} | {props?.lection?.text}</p>
            </div>
            <div className="w-1/6">
                <div className="pl-12">
                    <div className="max-w-[50px] max-h-[50px] w-full">
                        <svg viewBox="0 0 36 36" className="block stroke-gray-500">
                            <path strokeWidth="3.8" className="fill-none stroke-[#eee]"
                                  d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="fill-none"
                                  strokeWidth="3.8"
                                  strokeLinecap="round"
                                  strokeDasharray={`${props?.progress}, 100`}
                                  d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}