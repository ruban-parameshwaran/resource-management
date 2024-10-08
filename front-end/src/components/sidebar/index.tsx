import { Link } from "react-router-dom"
import { IMenuItems } from "../../interface/Navigation"
import { NavigationItems } from "../../services/navigation"
import MenuItem from "./components/menu-item"

export default function Sidebar() {
    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <Link to={'/dashboard'} className="text-nowrap logo-img">
                        RMS
                    </Link>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                {/* Sidebar Navigation */}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        {NavigationItems.map((menu: IMenuItems) => (
                            <MenuItem 
                                menu={menu}
                                key={menu?.id}/>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}