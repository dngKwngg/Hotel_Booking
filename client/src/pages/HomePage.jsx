import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
    return (
        <Container className="text-center mt-4">
            <div className="p-5 bg-light">
                <SearchBar />
                <h1>Welcome to Booking Hotel</h1>
                <p>Find your perfect stay at the best hotels worldwide.</p>
            </div>
        </Container>
    );
}

export default HomePage;
