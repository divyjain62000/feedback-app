import { useEffect, useState } from "react"
import { logoutAPI } from "../../../modules/login/login.api";
import { cleanLocalStorage } from "../../helper/local-storage.helper";
import { useNavigate } from "react-router-dom";
import { getCurrentUserName, getCurrentUserRole } from "../../helper/authentication.helper";
import { Role, roles } from "../../../constants/roles";
import useStore from "@shared/store/store";

export const NavbarComponent = () => {

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);

    const { pageTitle } = useStore();

    const navigate = useNavigate();



    const logoutHandler = () => {
        logoutAPI().then((response: any) => {
            cleanLocalStorage();
            navigate("/login");
        })
    }

    return (
        <nav className="flex w-full justify-between h-[55px] items-center z-50 px-8 bg-light-background-primary shadow-sm border border-t-0 border-r-0 b border-light-border rounded-b-3xl">
            <span className="font-open-sans font-medium text-lg text-light-title-text">
                {pageTitle}
            </span>
            <div className="flex items-center gap-4">
                <div id="notification">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className="w-6 h-6 text-light-accent1 cursor-pointer"
                    >
                        <path d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6l2 2m-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10v-7z" />
                    </svg>
                </div>
                <div id="userProfile">
                    <svg onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-light-accent1 cursor-pointer">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                    {isProfileDropdownOpen && <div className="absolute border divide-y w-40 right-0 top-0 z-50 bg-white mt-[2.8rem] shadow-lg mx-4">
                        <ul>
                            <li className="py-4 text-center text-light-title-text px-2 font-open-sans text-md font-normal">
                                <p className="pb-1 text-light-accent1 font-medium">{getCurrentUserName()}</p>
                                <p className="text-xs font-bold text-light-title-text">{roles[getCurrentUserRole() as Role]}</p>
                            </li>
                            <li className="w-full border-0 border-t border-light-border py-4 bg-gray-50 text-center">
                                <button type="button" onClick={logoutHandler} className="flex gap-1 text-light-secondary-text bg-light-danger hover:bg-light-danger focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>
        </nav >
    )
}