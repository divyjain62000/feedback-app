import { Outlet } from "react-router-dom"
import { NavbarComponent } from "../../shared/components/bars/navbar.component"
import { SidebarComponent } from "../../shared/components/bars/sidebar.component"

export const HomeComponent = () => {

    return (
        <div className="flex w-full h-screen max-h-screen overflow-y-hidden">
            <SidebarComponent />
            <div className="w-full h-full px-2">
                <NavbarComponent />
                <Outlet />
            </div>
        </div>
    )
}