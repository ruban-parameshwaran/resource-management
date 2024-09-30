import { transformCapitalize } from "@src/utils/helper";
import { Link, Location, useLocation } from "react-router-dom";

const Breadcrumb = () => {

    const location: Location = useLocation();
    const path: string = transformCapitalize (location.pathname);
    const breadcrumb: string[] | string = path.split("/");
    const title: string = breadcrumb[0];
    
    return (
        <div className="mb-4">
            <div className="row align-items-center">
                <div className="col-md-6 col-lg-5">
                    <h4 className="mb-8 breadcrumb-title">Overview : <span className="text-primary">{title}</span>
                    </h4>
                    <nav aria-label="breadcrumb" className="theme-breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">{breadcrumb}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb;