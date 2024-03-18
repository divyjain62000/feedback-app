import { useRef } from "react";

export const MainContainer = ({ children }: any) => {
    return (
        <div className="flex flex-wrap gap-16">
            {children}
        </div>
    )
}

export const ContainerComponent = ({ children, onScroll }: any) => {

    const scrollableDivRef = useRef<HTMLDivElement | null>(null);


    return (
        <div
            ref={scrollableDivRef}
            onScroll={() => {
                if (typeof onScroll === "function") {
                    onScroll(scrollableDivRef)
                }
            }}
            className="w-full h-full py-5 px-1 max-h-[calc(100vh-55px)] overflow-y-auto"
        >
            <div className="border w-full p-8 rounded-xl bg-light-background-primary ">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}