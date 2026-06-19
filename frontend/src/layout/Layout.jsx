import Header from "../components/Header";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div
                style={{
                    fontFamily: "'Inter', sans-serif",
                    minHeight: "100vh",
                    background: "#F0F2F5",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Layout;
