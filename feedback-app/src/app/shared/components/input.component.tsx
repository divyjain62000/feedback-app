import { useState } from "react";
import { ReactComponent as EyeClose } from '@assets/icons/eye-close.svg';
import { ReactComponent as EyeOpen } from '@assets/icons/eye-open.svg';

export const InputTextFieldComponent = (props: any) => {

    const { labelName, placeholder, id, name, error, onChangeHandler, value, touched, disabled } = props;
    const isError: boolean = (error && touched);

    return (
        <div className="w-full">
            <label htmlFor={name} className="capitalize block tracking-wide text-light-primary-text text-sm font-body font-bold mb-1">{labelName}</label>
            <input
                type="text"
                id={id}
                name={name}
                className={`appearance-none  font-body block w-full bg-gray-50 text-light-primary-text border ${isError ? 'border-light-danger' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500`}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
                disabled={disabled}
            />
            <p className={`${isError ? '' : 'invisible'} text-red-500 text-xs font-body font-normal`}>{isError ? error : "no-error"}</p>
        </div>
    )
}

export const PasswordFieldComponent = (props: any) => {
    const { labelName, placeholder, id, name, error, onChangeHandler, value, touched, disabled } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isError: boolean = (error && touched);
    return (
        <div className="w-full">
            <label htmlFor={name} className="capitalize block tracking-wide text-light-primary-text text-sm font-body font-bold mb-1">{labelName}</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id={id}
                    name={name}
                    className={`appearance-none  font-body block w-full bg-gray-50 text-light-primary-text border ${isError ? 'border-light-danger' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500`}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    value={value}
                    disabled={disabled}
                />
                <div onClick={(ev) => setShowPassword(!showPassword)} className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 text-light-primary-text rounded">
                    {
                        showPassword ? (<EyeClose />) : (<EyeOpen />)
                    }
                </div>
            </div>
            <p className={`${isError ? '' : 'invisible'} text-red-500 text-xs font-body font-normal`}>{isError ? error : "no error"}</p>
        </div>
    )
}

export const SelectFieldComponent = (props: any) => {
    interface OptionInterface {
        id: any
        name: any
    }
    const { labelName, id, name, error, onChangeHandler, value, touched, optionList, disabled } = props;
    const isError: boolean = (error && touched);
    return (
        <div>
            <label htmlFor={name} className="capitalize block tracking-wide text-light-primary-text text-sm font-body font-bold mb-1">{labelName}</label>
            <div className="relative">
                <select
                    className={`block appearance-none font-body w-full bg-gray-50 border ${isError ? 'border-light-danger' : 'border-gray-300'} text-light-primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500`}
                    id={id}
                    name={name}
                    onChange={onChangeHandler}
                    value={value}
                    disabled={disabled}
                >
                    <option value={'-1'}>Select {labelName}</option>
                    {
                        optionList.map((option: OptionInterface) => {
                            return (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            )
                        })
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-text">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <p className={`${isError ? '' : 'invisible'} text-red-500 text-xs font-body font-normal`}>{isError ? error : "no error"}</p>
        </div>

    )
}

export const TextareaComponent = (props: any) => {

    const { labelName, placeholder, id, name, error, onChangeHandler, value, touched, disabled } = props;
    const isError: boolean = (error && touched);

    return (
        <div className="w-full">
            <label htmlFor={name} className="capitalize block tracking-wide text-light-primary-text text-sm font-body font-bold mb-1">{labelName}</label>
            <textarea
                rows={2}
                id={id}
                name={name}
                className={`appearance-none  font-body block w-full bg-gray-50 text-light-primary-text border ${isError ? 'border-light-danger' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500`}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
                disabled={disabled}
            />
            <p className={`${isError ? '' : 'invisible'} text-red-500 text-xs font-body font-normal`}>{isError ? error : "no-error"}</p>
        </div>
    )
}

export const HiddenInputFieldComponent = (props: any) => {

    const { placeholder, id, name, error, onChangeHandler, value, touched, disabled } = props;
    const isError: boolean = (error && touched);
    console.log(error, touched);
    return (
        <div className="w-full">
            {/* <label htmlFor={name} className="capitalize block tracking-wide text-light-primary-text text-sm font-body font-bold mb-1">{labelName}</label> */}
            <input
                type="hidden"
                id={id}
                name={name}
                className={`appearance-none  font-body block w-full bg-gray-50 text-light-primary-text border ${isError ? 'border-light-danger' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500`}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
                disabled={disabled}
            />
            <p className={`${isError ? '' : 'invisible'} text-red-500 text-xs font-body font-normal`}>{isError ? error : "no-error"}</p>
        </div>
    )
}