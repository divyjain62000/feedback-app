import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarMenuList } from '../../../constants/sidebar-menu';
import { MenuInterface } from "../../interfaces/interfaces";
import { SidebarRouteFilter } from "../../helper/route-filter.helper";


export const SidebarComponent = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [menuList, setMenuList] = useState<MenuInterface[]>(sidebarMenuList);
    const [menuHistory, setMenuHistory] = useState<MenuInterface[][]>([sidebarMenuList]);
    const [activePath, setActivePath] = useState<string>(window.location.pathname);
    const [menuPathHistory, setMenuPathHistory] = useState<string[]>(['/dashboard']);

    const navigate = useNavigate();

    const menuHandler = (menuItem: MenuInterface) => {
        console.log(menuItem);
        if (menuItem.hasOwnProperty("childMenu")) {
            menuHistory.push(menuList);
            setMenuHistory(menuHistory);
            setMenuList(menuItem.childMenu !== undefined ? [...menuItem.childMenu] : []);
            menuPathHistory.push(menuItem.path);
            setActivePath(menuItem.path);
            navigate(menuItem.path);
        } else {
            setActivePath(menuItem.path);
            navigate(menuItem.path);
        }
    }

    const backButtonHandler = () => {
        if (menuHistory.length > 1) {
            menuHistory.pop();
            menuPathHistory.pop();
            setMenuList(menuHistory[menuHistory.length - 1]);
            setActivePath(menuPathHistory[menuPathHistory.length - 1]);
            navigate(menuPathHistory[menuPathHistory.length - 1]);
        }
    }


    return (
        <aside className={`${isSidebarOpen ? 'w-[270px]' : 'w-[70px]'} z-50 h-full shadow-sm border border-0 border-r border-light-border bg-light-background-primary transition-all ease-linear duration-200 rounded-tr-3xl`}>

            <div className={`flex flex-wrap ${isSidebarOpen ? 'justify-start' : 'justify-center'} items-center w-full h-14 px-4 py-4`}>
                <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-light-accent1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                    {isSidebarOpen && <div className="text-light-accent1 text-xl font-special font-normal">FeedbackApp</div>}
                </div>
                {isSidebarOpen && <div className="text-light-accent1 text-xs pl-1 font-special font-normal">Your opinion matter us</div>}
            </div>

            <div className={`flex ${isSidebarOpen ? 'justify-end' : 'justify-center'} items-center w-full h-14 px-4`}>
                <svg onClick={() => setIsSidebarOpen(!isSidebarOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 text-light-primary-text hover:text-light-accent2 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                </svg>
            </div>
            <div className="h-10">
            </div>
            <div className={`w-full h-full ${isSidebarOpen ? 'pr-4' : 'pr-2'} max-h-80 pb-4  max-h-[calc(100%-9.5rem)] overflow-y-auto`}>
                <div className="flex flex-wrap w-full gap-2">
                    {menuHistory.length > 1 && <div onClick={backButtonHandler} className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'} font-semibold text-sm font-open-sans w-full p-2 gap-2 text-light-primary-text hover:text-light-accent2 cursor-pointer rounded-r-3xl`}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        {isSidebarOpen && <span>Back</span>}
                    </div>}
                    {

                        menuList.map((menuItem: MenuInterface) => {
                            return (
                                <SidebarRouteFilter allowedRoles={menuItem.allowedRoles}>
                                    <div key={menuItem.title} onClick={() => {
                                        menuHandler(menuItem);
                                    }} className={`flex items-center border ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${activePath === menuItem.path ? 'border-light-accent2 text-light-accent2 bg-light-accent2 bg-opacity-5' : 'text-light-primary-text'} font-semibold text-sm font-open-sans  w-full p-2 gap-2  hover:border-light-accent2 hover:text-light-accent2 hover:bg-light-accent2 hover:bg-opacity-5 cursor-pointer rounded-r-3xl`}>
                                        <span>{menuItem.icon}</span>
                                        {isSidebarOpen && <span>{menuItem.title}</span>}
                                    </div>
                                </SidebarRouteFilter>
                            )
                        })

                    }
                </div>
            </div>
        </aside>
    )
}

