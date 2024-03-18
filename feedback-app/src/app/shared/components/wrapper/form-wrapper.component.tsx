export const FormComponent = ({ onSubmitHandler, children }: any) => {
    return (
        <form
            onSubmit={onSubmitHandler}
            className="w-full"
        >
            {children}
        </form>
    )
}

export const FormContentContainer = ({ children }: any) => {
    return (
        <div className="flex w-full mb-6 gap-4">
            {children}
        </div>
    )
}