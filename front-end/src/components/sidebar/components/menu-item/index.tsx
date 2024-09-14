import { Link, useLocation } from "react-router-dom";
import { IMenuItems } from "../../../../interface/Navigation";

type MenuItemProps = {
    menu: IMenuItems
}

export default function MenuItem ({ menu }: MenuItemProps) {    

    const location = useLocation();

    return (
        <li className="sidebar-item" key={menu.id}>
            <Link 
                className={`sidebar-link${location.pathname === menu.path ? ' active' : ''
                }`} to={`${menu.path}`} role="link">
                {menu.icon}
                <span className="hide-menu">{menu?.name}</span>
            </Link>
        </li>
    );
}