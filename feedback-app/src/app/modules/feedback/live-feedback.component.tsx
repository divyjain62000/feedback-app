import React, { useEffect, useState } from "react";
import { PreLoaderComponent } from "@shared/components/loader/loader.component";
import useStore from "@shared/store/store";
import { getAllFeedbackAPI } from "@modules/feedback/feedback.api";
import { FeedbackInterface, FeedbackPageInterface } from "@modules/feedback/feedback.interface";
import { FeedbackModalComponent } from "@modules/feedback/feedback-modal.component";
import { StarRatingVisualizationComponent } from "@modules/feedback/start-rating.component";
import io from 'socket.io-client';
import { getAccessToken } from "@shared/helper/local-storage.helper";


export const LiveFeedbackComponent = (props: any) => {

    const [feedbackList, setFeedbackList] = useState<Array<FeedbackInterface>>([]);
    const [feedbackData, setFeedbackData] = useState<FeedbackInterface | null>(null);
    const { set } = useStore();

    const socket = io(process.env.REACT_APP_WS_URL !== undefined ? process.env.REACT_APP_WS_URL : '', {
        auth: {
            token: getAccessToken()
        }
    });

    useEffect(() => {
        set(state => {
            state.pageTitle = "Live Feedback"
        })
        socket.on('new_feedback', (msg) => {
            feedbackList.push(JSON.parse(msg));
            setFeedbackList([...feedbackList]);
        });

        return () => {
            socket.disconnect();
        };

    }, [])




    return (
        <div className="flex min-h-screen w-full py-10">
            {feedbackData !== null && <FeedbackModalComponent closeButton={"Close"} closeHandler={() => {
                setFeedbackData(null)
            }} feedback={feedbackData} />}
            <div className="flex w-full h-full items-center justify-center">
                {
                    feedbackList.length === 0 ? (<span className="text-light-primary-text text-xl">No feedback to see</span>) :
                        (<div className="bg-light-background-primary border w-11/12 h-full">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">

                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Rating
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Message
                                            </th>
                                            <th scope="col" className="px-6 py-3">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            feedbackList.map((feedback) => {
                                                return (
                                                    <tr key={feedback._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td scope="row" className="px-6 py-8 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {feedback.user.firstName + " " + feedback.user.lastName}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <StarRatingVisualizationComponent feedbackRating={feedback.rating} />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="max-w-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
                                                                {feedback.message}
                                                            </div>
                                                        </td>
                                                        <td className="py-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6 cursor-pointer hover:text-light-accent1"
                                                                onClick={() => {
                                                                    setFeedbackData(feedback);
                                                                }}
                                                            >
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>)
                }
            </div>
        </div>

    )
}


