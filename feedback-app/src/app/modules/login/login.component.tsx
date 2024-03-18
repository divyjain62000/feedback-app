import React, { useState } from "react";
import { InputTextFieldComponent, PasswordFieldComponent } from "@shared/components/input.component"
import loginImage from '@assets/images/login/login.svg';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { AuthenticationInterface } from "@modules/login/login.interface";
import { authenticateAPI } from "@modules/login/login.api";
import { setLoginInfo } from "@shared/helper/local-storage.helper";
import { DangerAlertComponent } from "@shared/components/alert/alert.component";
import { LogoComponent } from "@shared/components/logo/logo.component";
import { PrimaryButton } from "@shared/components/button.component";
import { ReactComponent as BigDotSvg } from '@assets/icons/big-dot.svg';
import { PreLoaderComponent } from "@shared/components/loader/loader.component";
import { FormComponent } from "@shared/components/wrapper/form-wrapper.component";
import { roles } from "@constants/roles";


export const LoginComponent = () => {

    return (
        <React.Fragment>
            <LoginFormComponent />
        </React.Fragment>
    )
}


export const LoginFormComponent = (props: any) => {

    const [loginErr, setLoginErr] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            emailId: '',
            password: ''
        },
        validationSchema: Yup.object({
            emailId: Yup.string()
                .required("Email-Id required"),
            password: Yup
                .string()
                .required("Password required")
        }),
        onSubmit: (values, { setErrors, resetForm }) => {
            setLoginErr(null);
            const authenticationData: AuthenticationInterface = {
                emailId: values.emailId,
                password: values.password
            };
            setIsLoading(true);
            authenticateAPI(authenticationData).then((response: any) => {
                setIsLoading(false);
                resetForm();
                console.log(response);
                setLoginInfo(response);
                if (response.userData.role === roles.CUSTOMER) {
                    navigate("/feedback-form");
                } else {
                    navigate("/live-feedbacks");
                }

            }, (errResponse) => {
                console.log(errResponse);
                setIsLoading(false);
                if (errResponse.hasOwnProperty("authError")) {
                    setLoginErr(errResponse.authError);
                } else {
                    console.log("error", errResponse);
                    setErrors({ ...errResponse });
                }
            })
        }
    });


    return (
        <div className="flex bg-light-background-secondary min-h-screen w-full items-center">
            {isLoading && <PreLoaderComponent />}
            <div className="flex w-full h-full items-center justify-center">
                <div className="bg-light-background-primary w-11/12 lg:w-6/12 md:w-8/12 shadow-lg h-full rounded-xl px-4 md:px-20 pb-20">
                    <LogoComponent classes="w-full pt-8" />
                    <div className="w-full text-3xl font-special text-light-title-text font-light mt-8">Welcome Back!</div>
                    <form onSubmit={formik.handleSubmit} className="w-full mt-10 h-full p-1">
                        {loginErr !== null && (
                            <div className="text-light-danger w-full text-center mb-6 capitalize text-md">
                                <DangerAlertComponent message={loginErr} closeHandler={() => setLoginErr(null)} />
                            </div>
                        )}
                        <div className="flex  w-full gap-4 mb-6">
                            <InputTextFieldComponent
                                labelName="Email-Id"
                                placeholder="Email-Id"
                                name="emailId"
                                id="emailId"
                                onChangeHandler={formik.handleChange}
                                error={formik.errors.emailId}
                                touched={formik.touched.emailId}
                                value={formik.values.emailId}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <PasswordFieldComponent
                                labelName="Password"
                                placeholder="********"
                                name="password"
                                id="password"
                                onChangeHandler={formik.handleChange}
                                error={formik.errors.password}
                                touched={formik.touched.password}
                                value={formik.values.password}
                            />
                        </div>
                        <div className="flex w-full gap-4 mb-4 mt-8">
                            <PrimaryButton type="submit" label="Login" classes="uppercase w-full" />
                        </div>
                        <div className="flex w-full gap-1 text-light-primary-text justify-center font-body font-semibold text-md items-center">
                            <span>Don't have an account?</span>
                            <Link to="/create-account" className="cursor-pointer text-light-button-secondary hover:text-light-button-secondary-hover font-body font-semibold">
                                Create account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}