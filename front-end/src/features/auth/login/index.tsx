import DefaultButton from "../../../components/button/DefaultButton";
import InputField from "../../../components/fields/InputField";

export default function Login() {

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <div
                className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <p className="text-center">Sign In</p>
                                    <form>
                                        <div className="mb-3">
                                            <InputField 
                                                type="email"
                                                label="Username"
                                                />
                                        </div>
                                        <div className="mb-4">
                                            <InputField 
                                                type="password"
                                                label="Password"
                                                />
                                        </div>
                                        <DefaultButton message="Sign In"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}