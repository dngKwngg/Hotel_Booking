import { Container } from "react-bootstrap";
import SearchBar from "../../../../components/search-box/SearchBar";

const Search = (props) => {
    const {
        locationInputValue,
        numGuestsInputValue,
        isDatePickerVisible,
        onLocationChangeInput,
        onNumGuestsInputChange,
        dateRange,
        onDateChangeHandler,
        onDatePickerIconClick,
        onSearchButtonAction,
        locationTypeheadResults,
        setisDatePickerVisible,
    } = props;

    return (
        <div style={{ backgroundColor: "#08469C", minHeight: "400px", color: "white", padding: "60px 0" }}>
            <Container className="text-center">
                <div className="mb-4">
                    <h3 className="display-5 fw-bold">
                        Discover your perfect stay around the globe
                    </h3>
                    <p className="lead">
                        Enter your dates to see the latest prices and begin your journey of
                        relaxation and adventure today.
                    </p>
                </div>

                <div>
                    <SearchBar
                        locationInputValue={locationInputValue}
                        locationTypeheadResults={locationTypeheadResults}
                        numGuestsInputValue={numGuestsInputValue}
                        isDatePickerVisible={isDatePickerVisible}
                        setisDatePickerVisible={setisDatePickerVisible}
                        onLocationChangeInput={onLocationChangeInput}
                        onNumGuestsInputChange={onNumGuestsInputChange}
                        dateRange={dateRange}
                        onDateChangeHandler={onDateChangeHandler}
                        onDatePickerIconClick={onDatePickerIconClick}
                        onSearchButtonAction={onSearchButtonAction}
                    />
                </div>
            </Container>
        </div>
    );
};

export default Search;
