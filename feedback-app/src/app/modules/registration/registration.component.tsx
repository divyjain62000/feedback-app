import React, { useState } from "react";
import { InputTextFieldComponent, PasswordFieldComponent } from "@shared/components/input.component"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { AuthenticationInterface } from "@modules/login/login.interface";
import { authenticateAPI } from "@modules/login/login.api";
import { setLoginInfo } from "@shared/helper/local-storage.helper";
import { DangerAlertComponent } from "@shared/components/alert/alert.component";
import { LogoComponent } from "@shared/components/logo/logo.component";
import { PrimaryButton } from "@shared/components/button.component";
import { PreLoaderComponent } from "@shared/components/loader/loader.component";
import { FormComponent } from "@shared/components/wrapper/form-wrapper.component";
import { registrationAPI } from "./registration.api";
import { RegistrationRequestInterface } from "./registration.interface";
import { roles } from "@constants/roles";


export const RegistrationComponent = () => {

    return (
        <React.Fragment>
            <RegistrationFormComponent />
        </React.Fragment>
    )
}


export const RegistrationFormComponent = (props: any) => {

    const [loginErr, setLoginErr] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailId: '',
            mobileNumber: '',
            password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("First name required"),
            lastName: Yup.string()
                .required("Last name required"),
            emailId: Yup.string()
                .email("Invalid email-id")
                .required("Email-Id required"),
            mobileNumber: Yup.string()
                .matches(/^[0-9]{10}$/, "Invalid mobile number")
                .required("Mobile number required"),
            password: Yup
                .string()
                .required("Password required")
        }),
        onSubmit: (values, { setErrors, resetForm }) => {
            setLoginErr(null);
            const registrationData: RegistrationRequestInterface = {
                firstName: values.firstName,
                lastName: values.lastName,
                mobileNumber: values.mobileNumber,
                emailId: values.emailId,
                password: values.password,
                role: "CUSTOMER"
            };
            setIsLoading(true);
            registrationAPI(registrationData).then((response: any) => {
                setIsLoading(false);
                resetForm();
                navigate("/login");
            }, (errResponse) => {
                setIsLoading(false);
                console.log("error", errResponse);
                setErrors({ ...errResponse });
            })
        }
    });


    return (
        <div className="flex bg-light-background-secondary min-h-screen w-full items-center">
            {isLoading && <PreLoaderComponent />}
            <div className="flex w-full h-full items-center justify-center">
                <div className="bg-light-background-primary w-11/12 lg:w-6/12 md:w-8/12 shadow-lg h-full rounded-xl px-4 md:px-20 pb-20">
                    <LogoComponent classes="w-full pt-8" />
                    <div className="w-full text-3xl font-special text-light-title-text font-light mt-8">Create account</div>
                    <form onSubmit={formik.handleSubmit} className="w-full mt-10 h-full p-1">
                        {loginErr !== null && (
                            <div className="text-light-danger w-full text-center mb-6 capitalize text-md">
                                <DangerAlertComponent message={loginErr} closeHandler={() => setLoginErr(null)} />
                            </div>
                        )}
                        <div className="flex flex-wrap w-full lg:gap-4 lg:flex-nowrap mb-6">
                            <div className="lg:w-6/12 w-full mb-4 lg:mb-0">
                                <InputTextFieldComponent
                                    labelName="First Name"
                                    placeholder="First Name"
                                    name="firstName"
                                    id="firstName"
                                    onChangeHandler={formik.handleChange}
                                    error={formik.errors.firstName}
                                    touched={formik.touched.firstName}
                                    value={formik.values.firstName}
                                />
                            </div>
                            <div className="lg:w-6/12 w-full">
                                <InputTextFieldComponent
                                    labelName="Last Name"
                                    placeholder="Last Name"
                                    name="lastName"
                                    id="lastName"
                                    onChangeHandler={formik.handleChange}
                                    error={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                    value={formik.values.lastName}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap w-full lg:gap-4 lg:flex-nowrap mb-6">
                            <div className="lg:w-6/12 w-full mb-4 lg:mb-0">
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
                            <div className="lg:w-6/12 w-full">
                                <InputTextFieldComponent
                                    labelName="Mobile Number"
                                    placeholder="Mobile Number"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    onChangeHandler={formik.handleChange}
                                    error={formik.errors.mobileNumber}
                                    touched={formik.touched.mobileNumber}
                                    value={formik.values.mobileNumber}
                                />
                            </div>
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
                            <PrimaryButton type="submit" label="Register" classes="uppercase w-full" />
                        </div>
                        <div className="flex w-full gap-1 text-light-primary-text justify-center font-body font-semibold text-md items-center">
                            <span>Already have an account?</span>
                            <Link to="/login" className="cursor-pointer text-light-button-secondary hover:text-light-button-secondary-hover font-body font-semibold">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}