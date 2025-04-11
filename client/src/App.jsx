import AppRouters from "./AppRouters";
import MyNavbar from "./components/navbar/MyNavbar";
import Footer from "./components/footer/Footer";
import './App.scss';

// import Container from "react-bootstrap/Container";

const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <MyNavbar />
            <div className="flex-grow-1">
                <AppRouters />
            </div>
            <Footer />
        </div>
    );
};

export default App;
