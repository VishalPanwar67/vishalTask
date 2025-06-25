function Header() {
    return (
        <>
            <header className="header-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="logo">
                                <a href="/"><img src="/assets/images/logo.svg" alt="Logo" /></a>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="header-menu">
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/">Services</a></li>
                                    <li><a href="/">Our Project</a></li>
                                    <li><a href="/">Testimonials</a></li>
                                </ul>
                                <div className="common-btn">
                                <a href="https://flipr-admin.vercel.app/" target="_blank">Admin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
