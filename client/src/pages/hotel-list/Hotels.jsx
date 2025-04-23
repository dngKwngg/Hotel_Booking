import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { useSearchParams } from 'react-router-dom';
import { fetchAllHotels } from '../../store/hotel/hotelSlice';
import { formatDate } from '../../utils/formatDate';
import { getActiveFilters } from '../../utils/getActiveFilters';
import { Pagination, Spinner, Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../../components/search-box/SearchBar';
import FiltersPanel from '../../components/filter-panel/FIlterPanel';
import SortByFilter from '../../components/sort-by-filter/SortByFilter';
import ResultsContainer from '../../components/results-container/ResultsContainer';
import { getAvailableCities } from '../../api/homeAPI';

const HotelsSearch = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, hotels: hotelList, pagination } = useSelector((state) => state.hotels);
    const [locationInputValue, setLocationInputValue] = useState(searchParams.get('city') || '');
    const [numGuestsInputValue, setNumGuestsInputValue] = useState(searchParams.get('numGuests') || 1);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
    const [currentResultsPage, setCurrentResultsPage] = useState(1);
    const [sortByFilterValue, setSortByFilterValue] = useState({ label: 'Đánh giá cao', value: 'rating_desc' });

    const { data: availableCities = [] } = useSWR('/api/availableCities', getAvailableCities);

    const onSearchButtonAction = () => {
        const activeFilters = getActiveFilters();
        const numGuests = Number(numGuestsInputValue);
        const checkInDate = formatDate(dateRange.startDate);
        const checkOutDate = formatDate(dateRange.endDate);

        setSearchParams({
            city: locationInputValue,
            numGuests: numGuestsInputValue,
        });

        dispatch(
            fetchAllHotels({
                city: locationInputValue,
                guests: numGuests,
                checkInDate,
                checkOutDate,
                filters: activeFilters,
                page: currentResultsPage,
                sortBy: sortByFilterValue.value,
            })
        );
    };

    useEffect(() => {
        if (locationInputValue && numGuestsInputValue) {
            onSearchButtonAction();
        }
    }, [currentResultsPage, sortByFilterValue]);

    const renderPagination = () => {
        const totalPages = pagination?.totalPages || 1;
        return (
            <Pagination className="justify-content-center mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentResultsPage}
                        onClick={() => setCurrentResultsPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        );
    };

    return (
        <div >
            {/* Search Bar Section */}
            <div style={{ backgroundColor: "#08469C", minHeight: "100px", color: "white", padding: "60px 0" }}>
                <Container className="text-center">
                    <SearchBar
                        locationInputValue={locationInputValue}
                        numGuestsInputValue={numGuestsInputValue}
                        isDatePickerVisible={isDatePickerVisible}
                        setisDatePickerVisible={setisDatePickerVisible}
                        onLocationChangeInput={(e) => setLocationInputValue(e.target.value)}
                        onNumGuestsInputChange={(e) => setNumGuestsInputValue(e.target.value)}
                        dateRange={dateRange}
                        onDateChangeHandler={setDateRange}
                        onSearchButtonAction={onSearchButtonAction}
                    />
                </Container>
            </div>

            {/* Filters + Results */}
            <Container className="my-4">
                <Row>
                    <Col lg={3}>
                        <FiltersPanel />
                    </Col>

                    <Col lg={9}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Tìm thấy {pagination?.total || 0} khách sạn</span>
                            <SortByFilter value={sortByFilterValue} onChange={setSortByFilterValue} />
                        </div>

                        {isLoading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="warning" />
                            </div>
                        ) : (
                            <>
                                <ResultsContainer hotelsResults={{ data: hotelList }} />
                                {renderPagination()}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HotelsSearch;
