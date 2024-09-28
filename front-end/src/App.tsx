import Footer from "./components/footer";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";

export default function App() {
    return (
        // Body wrapper
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            {/* Sidebar start */}
                <Sidebar />
            {/* End of sidebar */}
            {/* Main Wrapper */}
            <div className="body-wrapper">
                {/* Header Start */}
                    <Header />
                {/* Header End */}
                {/* Main Content */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <Outlet />
                        </div>
                        {/* Footer */}
                        <Footer />
                        {/* End of Footer */}
                    </div>
                </div>
                {/* End of Main Content */}
            </div>
        </div>
    )
}