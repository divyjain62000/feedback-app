import React, { useEffect, useState } from "react";
import { PreLoaderComponent } from "@shared/components/loader/loader.component";
import useStore from "@shared/store/store";
import { changeFeedbackVisibility, getAllFeedbackAPI } from "@modules/feedback/feedback.api";
import { FeedbackInterface, FeedbackPageInterface } from "@modules/feedback/feedback.interface";
import { FeedbackModalComponent } from "@modules/feedback/feedback-modal.component";
import { StarRatingVisualizationComponent } from "@modules/feedback/start-rating.component";
import { isCurrentUserAdmin } from "@shared/helper/authentication.helper";
import { SuccessModalComponent } from "@shared/components/modal.component";


export const FeedbackListComponent = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [feedbackPageObj, setFeedbackPageObj] = useState<FeedbackPageInterface | null>(null);
    const [feedbackData, setFeedbackData] = useState<FeedbackInterface | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { set } = useStore();
    const pageSize = 5;

    useEffect(() => {
        set(state => {
            state.pageTitle = "Feedback"
        })
        getAllFeedback(1);
    }, [])

    const getAllFeedback = (pageNumber: number) => {
        setIsLoading(true);
        getAllFeedbackAPI(pageNumber, pageSize).then((response: any) => {
            setIsLoading(false);
            setFeedbackPageObj(response);
        })
    }

    const requestNextPageData = () => {
        if (feedbackPageObj?.hasNextPage === true) {
            getAllFeedback(feedbackPageObj?.nextPage !== null ? feedbackPageObj?.nextPage : 1);
        }
    }
    const requestPrevPageData = () => {
        if (feedbackPageObj?.hasPrevPage === true) {
            getAllFeedback(feedbackPageObj?.prevPage !== null ? feedbackPageObj?.prevPage : 1);
        }
    }

    const feedbackVisibilityChangeHandler = (id: string, visibility: boolean) => {
        changeFeedbackVisibility(id, visibility).then((response) => {
            setIsSuccess(true);
        })
    }


    return (
        <div className="flex min-h-screen w-full py-10">
            {isLoading && <PreLoaderComponent />}
            {isSuccess && <SuccessModalComponent
                title={"Successful"}
                body={"Feedback visibility changed successfully!"}
                closeButtonLabel={"ok"}
                closeButtonHandler={() => setIsSuccess(false)}
            />}
            {feedbackData !== null && <FeedbackModalComponent closeButton={"Close"} closeHandler={() => {
                setFeedbackData(null)
            }} feedback={feedbackData} />}
            <div className="flex w-full h-full items-center justify-center">
                {
                    feedbackPageObj?.docs.length === 0 ? (<span className="text-light-primary-text text-xl">No feedback to see</span>) :
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
                                            {
                                                isCurrentUserAdmin() &&
                                                <th scope="col" className="px-6 py-3">
                                                    Hide
                                                </th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            feedbackPageObj?.docs.map((feedback) => {
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
                                                        {
                                                            isCurrentUserAdmin() &&
                                                            <td className="px-6 py-4">

                                                                <label className="inline-flex items-center cursor-pointer">
                                                                    <input type="checkbox" onChange={(ev) => {
                                                                        feedbackVisibilityChangeHandler(feedback._id, !ev.target.checked);
                                                                        feedback.public = !ev.target.checked;
                                                                    }} value="" checked={!feedback.public} className="sr-only peer" />
                                                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                </label>

                                                            </td>
                                                        }

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex gap-4 my-2 px-4 justify-center lg:justify-end py-8">
                                <div className={`py-1 font-medium border-2 px-4 rounded  border  ${feedbackPageObj?.hasPrevPage === true ? 'border-light-button-secondary text-light-accent2 cursor-pointer' : 'border-light-border text-light-primary-text cursor-not-allowed'}`} onClick={requestPrevPageData}>Prev</div>
                                <div className={`py-1 font-medium border-2 px-4 rounded  border  ${feedbackPageObj?.hasNextPage === true ? 'border-light-button-primary text-light-accent1 cursor-pointer' : 'border-light-border text-light-primary-text cursor-not-allowed'}`} onClick={requestNextPageData}>Next</div>
                            </div>

                        </div>)
                }
            </div>
        </div>

    )
}


