import { utcToISTFormat } from "@shared/utils/datetime.util"
import { StarRatingVisualizationComponent } from "@modules/feedback/start-rating.component";

export const FeedbackModalComponent = (props: any) => {
    const { feedback, closeButton, closeHandler } = props
    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <div className="mt-2 font-medium w-full text-left">
                                        <p className="text-md text-gray-500">{feedback.user.firstName + " " + feedback.user.lastName}</p>
                                        <p className="text-sm text-gray-500 font-normal">{(feedback.user.emailId !== undefined ? feedback.user.emailId : "") + " " + (feedback.user.mobileNumber !== undefined ? feedback.user.mobileNumber : "")}</p>
                                    </div>
                                    <div className="mt-2 flex justify-between w-full">
                                        <div className="w-full">
                                            <StarRatingVisualizationComponent feedbackRating={feedback.rating} />
                                        </div>
                                        <div className="w-full text-sm text-right">{utcToISTFormat(feedback.timestamp)}</div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 text-justify">{feedback.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" onClick={closeHandler} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto capitalize">{closeButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}