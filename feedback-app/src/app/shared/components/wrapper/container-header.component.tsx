export const ContainerHeaderComponent = (props: any) => {
    const { leftDivClasses, rightDivClasses, viewList, setCurrentView, currentView } = props;
    return (
        <div className="flex w-full">
            <div className={leftDivClasses}>
                <div className="flex w-full">

                    {
                        viewList.map((view: string, index: number) => {
                            return (
                                <>
                                    {
                                        index === 0 ? (<div
                                            onClick={() => {
                                                setCurrentView(index);
                                            }}
                                            className={`border border-2 ${currentView === index ? 'bg-light-accent2 text-light-secondary-text border-light-accent2' : 'bg-light-background-secondary text-light-primary-text border-light-border'} flex flex-1 justify-center items-center py-2  px-4 hover:border-light-accent2 border-r-0  rounded-l-3xl w-fit cursor-pointer hover:bg-light-accent2 hover:text-light-secondary-text`}
                                        >
                                            {view}
                                        </div>) :
                                            (index === viewList.length - 1) ? (
                                                <div
                                                    onClick={() => {
                                                        setCurrentView(index);
                                                    }}
                                                    className={`border border-2 ${currentView === index ? 'bg-light-accent2 text-light-secondary-text border-light-accent2' : 'bg-light-background-secondary text-light-primary-text border-light-border'} flex flex-1 justify-center items-center py-2 px-4 hover:border-light-accent2 rounded-r-3xl w-fit cursor-pointer hover:bg-light-accent2 hover:text-light-secondary-text`}>
                                                    {view}
                                                </div>) : (<div
                                                    onClick={() => {
                                                        setCurrentView(index);
                                                    }}
                                                    className={`border border-2 ${currentView === index ? 'bg-light-accent2 text-light-secondary-text border-light-accent2' : 'bg-light-background-secondary text-light-primary-text border-light-border'} flex flex-1 justify-center items-center py-2 px-4  hover:border-light-accent2 border-r-0 w-fit cursor-pointer hover:bg-light-accent2 hover:text-light-secondary-text`}>
                                                    {view}
                                                </div>)
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"flex " + rightDivClasses}>
            </div>
        </div>
    )
}