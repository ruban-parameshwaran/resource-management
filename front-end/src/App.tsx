import Header from "./components/header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./services/protected-routes";
import Breadcrumb from "./components/breadcrumb";

export default function App() {
  return (
    // Body wrapper
    <ProtectedRoute>
        <div
          className="page-wrapper"
          id="main-wrapper"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
        >
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
              {/* Breadcrumb */}
              <Breadcrumb />
              {/* End of Breadcrumb */}
              <Outlet />
              {/* <ErrorBoundary>
                            </ErrorBoundary> */}
              {/* Footer */}
              {/* <Footer /> */}
              {/* End of Footer */}
            </div>
            {/* End of Main Content */}
          </div>
        </div>
    </ProtectedRoute>
  );
}
