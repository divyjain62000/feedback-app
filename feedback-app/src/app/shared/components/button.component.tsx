export const PrimaryButton = (props: any) => {
    const { label, type, classes, onClickHandler } = props;
    return (
        <button
            onClick={onClickHandler}
            type={type}
            className={"min-w-[100px] justify-center text-light-secondary-text tracking-widest bg-light-button-primary hover:bg-light-button-primary-hover focus:outline-none font-body font-medium leading-7 rounded text-sm px-5 py-2.5 text-center inline-flex items-center " + classes}>
            {label}
        </button>
    )
}


export const FormPrimaryButton = (props: any) => {
    const { label, type, onClickHandler } = props;
    return (
        <button
            onClick={onClickHandler}
            type={type}
            className={"min-w-[100px] rounded-md justify-center capitalize text-light-secondary-text tracking-widest bg-light-button-primary hover:bg-light-button-primary-hover focus:outline-none font-body font-medium leading-6 gap-1 text-sm px-5 py-2.5 text-center inline-flex items-center"}>
            {label}
        </button>
    )
}


export const FormResetButton = (props: any) => {
    const { label, type, onClickHandler } = props;
    return (
        <button
            onClick={onClickHandler}
            type={type}
            className={"min-w-[100px] rounded-md justify-center capitalize tracking-widest border border-2 border-light-accent2 text-light-accent2 focus:outline-none font-body font-bold leading-6 text-sm px-5 py-2.5 text-center inline-flex items-center"}>
            {label}
        </button>
    )
}
