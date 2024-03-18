import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CustomRedirect = ({ path }: any) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Navigate")
        navigate(path);
    }, [])
    return (
        <React.Fragment>
        </React.Fragment>
    )
}