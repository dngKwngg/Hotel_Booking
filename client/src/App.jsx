import AppRouters from "./AppRouters";
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";

const App = () => {
    return (
        <>
            <MyNavbar />
            <Container className="mt-4">
                <AppRouters />
            </Container>
            <Footer />
        </>

    );
}

export default App;
