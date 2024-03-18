import React, { useEffect, useState } from "react";
import { HiddenInputFieldComponent, InputTextFieldComponent, PasswordFieldComponent, TextareaComponent } from "@shared/components/input.component"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { authenticateAPI } from "@modules/login/login.api";
import { setLoginInfo } from "@shared/helper/local-storage.helper";
import { DangerAlertComponent } from "@shared/components/alert/alert.component";
import { LogoComponent } from "@shared/components/logo/logo.component";
import { FormPrimaryButton, FormResetButton, PrimaryButton } from "@shared/components/button.component";
import { PreLoaderComponent } from "@shared/components/loader/loader.component";
import useStore from "@shared/store/store";
import { FeedbackFormInterface } from "./feedback.interface";
import { SuccessModalComponent } from "@shared/components/modal.component";
import { submitFeedbackAPI } from "./feedback.api";



export const FeedbackFormComponent = (props: any) => {

    const [loginErr, setLoginErr] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ratingGivenByUser, setRatingGivenByUser] = useState<number>(0);
    const [isRatingDone, setIsRatingDone] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    const { set } = useStore();

    useEffect(() => {
        set(state => {
            state.pageTitle = "Feedback"
        })
    }, [])


    const formik = useFormik({
        initialValues: {
            rating: '',
            message: ''
        },
        validationSchema: Yup.object({
            rating: Yup
                .string()
                .required('You have not provided rating'),
            message: Yup
                .string()
                .required("Message required")
        }),
        onSubmit: (values, { setErrors, resetForm }) => {

            const feedbackData: FeedbackFormInterface = {
                rating: Number(values.rating),
                message: values.message
            };
            console.log(feedbackData);
            setIsLoading(true);
            submitFeedbackAPI(feedbackData).then((response: any) => {
                setIsLoading(false);
                setIsSuccess(true);
                resetFormHandler();
            }, (errResponse) => {
                console.log(errResponse);
                setIsLoading(false);
                setErrors({ ...errResponse });
            })
        }
    });

    const resetFormHandler = () => {
        setRatingGivenByUser(0);
        setIsRatingDone(false);
        formik.resetForm();

    }


    return (
        <div className="flex min-h-screen w-full py-10">
            {isLoading && <PreLoaderComponent />}
            {isSuccess && <SuccessModalComponent
                title={"Submitted"}
                body={"Feedback submitted successfully!"}
                closeButtonLabel={"ok"}
                closeButtonHandler={() => setIsSuccess(false)}
            />}
            <div className="flex w-full h-full items-center justify-center">
                <div className="bg-light-background-primary border w-11/12 h-full px-4 md:px-20 pb-20">

                    <form onSubmit={formik.handleSubmit} className="w-full mt-10 h-full p-1">
                        {loginErr !== null && (
                            <div className="text-light-danger w-full text-center mb-6 capitalize text-md">
                                <DangerAlertComponent message={loginErr} closeHandler={() => setLoginErr(null)} />
                            </div>
                        )}
                        <div className="w-full text-2xl font-special text-light-title-text font-light mb-10">
                            Please rate your experience
                        </div>
                        <div className="flex justify-center w-full gap-4 mb-6">
                            {
                                [1, 2, 3, 4, 5].map((rating) => {
                                    return (
                                        <React.Fragment>
                                            <svg
                                                key={rating}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24"
                                                stroke-width="1" stroke="currentColor"
                                                className={`${rating <= ratingGivenByUser ? 'fill-yellow-400' : ''} w-12 h-12 cursor-pointer`}
                                                onMouseOver={() => {
                                                    setRatingGivenByUser(rating);
                                                }}
                                                onMouseOut={() => {
                                                    if (isRatingDone === false) {
                                                        setRatingGivenByUser(0);
                                                    }
                                                }}
                                                onClick={() => {
                                                    setRatingGivenByUser(0);
                                                    setIsRatingDone(true);
                                                    formik.setFieldValue('rating', ratingGivenByUser);
                                                }}
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                        <div className="flex  w-full gap-4 mb-2">
                            <HiddenInputFieldComponent
                                labelName="Rating"
                                placeholder="rating"
                                name="rating"
                                id="rating"
                                onChangeHandler={formik.handleChange}
                                error={formik.errors.rating}
                                touched={formik.touched.rating}
                                value={formik.values.rating}
                            />
                        </div>
                        <div className="w-full text-xl font-special font-medium capitalize text-center text-light-title-text font-light mb-6">
                            {ratingGivenByUser === 1 && <span className="text-red-700">Very bad</span>}
                            {ratingGivenByUser === 2 && <span className="text-red-500">bad</span>}
                            {ratingGivenByUser === 3 && <span className="text-yellow-500">Good</span>}
                            {ratingGivenByUser === 4 && <span className="text-blue-500">Very Good</span>}
                            {ratingGivenByUser === 5 && <span className="text-green-500">Excellent</span>}
                            {ratingGivenByUser === 0 && <span className="invisible text-green-500">Excellent</span>}
                        </div>

                        <div className="flex  w-full gap-4 mb-6">
                            <TextareaComponent
                                labelName="Message"
                                placeholder="Message"
                                name="message"
                                id="message"
                                onChangeHandler={formik.handleChange}
                                error={formik.errors.message}
                                touched={formik.touched.message}
                                value={formik.values.message}
                            />
                        </div>
                        <div className="flex w-full gap-4 mb-4 mt-8 justify-center">
                            <FormResetButton type="button" onClickHandler={resetFormHandler} label="Reset" classes="uppercase w-2/12" />
                            <FormPrimaryButton type="submit" label="Submit" classes="uppercase w-2/12" />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}