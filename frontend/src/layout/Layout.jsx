import Header from "../components/Header";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-(--cit-bg) text-(--cit-text)">
            <Header />
            <main className="min-h-screen font-sans">{children}</main>
        </div>
    );
};

export default Layout;
