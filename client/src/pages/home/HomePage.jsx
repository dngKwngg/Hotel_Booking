import PopularLocations from './components/popular-locations/PopularLocations';
import ResultsContainer from '../../components/results-container/ResultsContainer';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import { formatDate } from '../../utils/formatDate';
import { fetchNearbyHotels } from '../../store/hotel/nearbyHotelSlice';
import { getPopularDestinations, getAvailableCities } from '../../api/homeAPI';
import Search from './components/search/Search';
import {fetchAllHotels} from "../../store/hotel/hotelSlice.js";
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    // const { data: hotelsResults, isLoading: hotelsLoading } = useSelector(
    //     (state) => state.nearbyHotels
    // );

    const { hotels: hotelsResults, loading: hotelsLoading } = useSelector(
        (state) => state.hotels
    );

    // Local state
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
    const [locationInputValue, setLocationInputValue] = useState('');
    const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
    const [popularDestinationsData, setPopularDestinationsData] = useState({
        isLoading: true,
        data: [],
        errors: [],
    });
    const [availableCities, setAvailableCities] = useState([]);
    const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const onDateChangeHandler = (range) => {
        setDateRange(range);
        setisDatePickerVisible(false); // ẩn sau khi chọn
    };
    const onDatePickerIconClick = () => {
        setisDatePickerVisible(!isDatePickerVisible);
    };
    const queryResults = (query, availableCities) => {
        const lowerQuery = typeof query === 'string' ? query.toLowerCase() : '';
        const filteredResults = availableCities.filter((city) =>
            city.toLowerCase().includes(lowerQuery)
        );
        setFilteredTypeheadResults(filteredResults);
    };

    const debounceFn = useCallback(_debounce(queryResults, 1000), []);

    const onLocationChangeInput = (newValue) => {
        setLocationInputValue(newValue);
        debounceFn(newValue, availableCities);
    };

    const MAX_GUESTS_INPUT_VALUE = 10;
    const onNumGuestsInputChange = (numGuests) => {
        if (
            (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) ||
            numGuests === ''
        ) {
            setNumGuestsInputValue(numGuests);
        }
    };

    const onSearchButtonAction = () => {
        const numGuest = Number(numGuestsInputValue);
        const checkInDate = formatDate(dateRange[0].startDate) ?? '';
        const checkOutDate = formatDate(dateRange[0].endDate) ?? '';
        const city = locationInputValue;
        navigate('/hotels', {
            state: {
                numGuest,
                checkInDate,
                checkOutDate,
                city,
            },
        });
    };

    useEffect(() => {
        const getInitialData = async () => {
            // dispatch Redux call
            // dispatch(fetchNearbyHotels());

            dispatch(fetchAllHotels())
            // console.log(hotelsResults);
            // load popularDestinations
            const popularDestinationsResponse = await getPopularDestinations();
            const availableCitiesResponse = await getAvailableCities();

            if (availableCitiesResponse) {
                setAvailableCities(availableCitiesResponse.elements);
            }

            if (popularDestinationsResponse) {
                setPopularDestinationsData({
                    isLoading: false,
                    data: popularDestinationsResponse.elements,
                    errors: [],
                });
            }
        };

        getInitialData();
    }, [dispatch]);

    // console.log(hotelsResults);

    return (
        <>
            <Search
                locationInputValue={locationInputValue}
                locationTypeheadResults={filteredTypeheadResults}
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
            <div className="container mx-auto">
                <PopularLocations popularDestinationsData={popularDestinationsData} />
                <div className="my-8">
                    <h2 className="text-3xl font-medium text-slate-700 text-center my-2">
                        Handpicked nearby hotels for you
                    </h2>
                    <ResultsContainer
                        hotelsResults={{
                            isLoading: hotelsLoading,
                            data: hotelsResults,
                        }}
                        enableFilters={false}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
