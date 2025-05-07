import HotelViewCard from '../hotel-view-card/HotelViewCard';
import VerticalFilters from '../vertical-filters/VerticalFilters';
import HotelViewCardSkeleton from '../hotel-view-card-skeleton/HotelViewCardSkeleton';
import VerticalFiltersSkeleton from '../vertical-filters-skeleton/VerticalFiltersSkeleton';
import EmptyHotelsState from '../empty-hotels-state/EmptyHotelsState';
import { useRef, useState } from 'react';
import useOutsideClickHandler from '../../hooks/UseOutsideClickHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ResultsContainer = ({
    hotelsResults = {},
    enableFilters = false,
    filtersData = {},
    selectedFiltersState = [],
    onFiltersUpdate = () => { },
    onClearFiltersAction = () => { },
    sortingFilterOptions = [],
    sortByFilterValue,
    onSortingFilterChange = () => { },
}) => {
    const { isLoading = false, data = [] } = hotelsResults;
    const isSortingFilterVisible = sortingFilterOptions.length > 0;
    const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);
    const wrapperRef = useRef();
    const buttonRef = useRef();

    useOutsideClickHandler(wrapperRef, (event) => {
        if (!buttonRef.current?.contains(event.target)) {
            setIsVerticalFiltersOpen(false);
        }
    });

    const toggleVerticalFiltersAction = () => {
        setIsVerticalFiltersOpen((prevState) => !prevState);
    };

    return (
        <Container fluid>
            <Row>
                {/* 📌 Filter Sidebar */}
                {enableFilters && selectedFiltersState.length > 0 && (
                    <Col md={3} ref={wrapperRef} className="mb-3">
                        <VerticalFilters
                            filtersData={selectedFiltersState}
                            onFiltersUpdate={onFiltersUpdate}
                            onClearFiltersAction={onClearFiltersAction}
                            isVerticalFiltersOpen={isVerticalFiltersOpen}
                        />
                    </Col>
                )}
                {enableFilters && filtersData?.isLoading && (
                    <Col md={3}><VerticalFiltersSkeleton /></Col>
                )}

                {/* 📌 Main Results */}
                <Col>
                    <Row className="align-items-center mb-3">
                        <Col xs="auto" className="d-md-none mb-2">
                            {enableFilters && (
                                <Button
                                    ref={buttonRef}
                                    variant="outline-secondary"
                                    onClick={toggleVerticalFiltersAction}
                                >
                                    <FontAwesomeIcon icon={faFilter} className="me-1" /> Filters
                                </Button>
                            )}
                        </Col>
                        <Col className="text-end">
                            {isSortingFilterVisible && (
                                <Select
                                    value={sortByFilterValue}
                                    onChange={onSortingFilterChange}
                                    options={sortingFilterOptions}
                                    className="w-100 w-md-25"
                                />
                            )}
                        </Col>
                    </Row>

                    {/* 📌 Hotels List */}
                    <Row className="gy-3">
                        {isLoading ? (
                            Array.from({ length: 5 }, (_, index) => (
                                <Col key={index} xs={12}><HotelViewCardSkeleton /></Col>
                            ))
                        ) : data.length > 0 ? (
                            data.map((hotel, index) => (
                                <Col key={hotel.hotelId || index} xs={12}>
                                    <HotelViewCard {...hotel} />
                                </Col>
                            ))
                        ) : (
                            <Col><EmptyHotelsState /></Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ResultsContainer;
