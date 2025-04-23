import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelById } from '../../store/hotel/hotelSlice';
import HotelDetailsViewCard from './components/hotel-details-view-card/HotelDetailsViewCard';
import HotelDetailsViewCardSkeleton from './components/hotel-details-view-card-skeleton/HotelDetailsViewCardSkeleton';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  // console.log(hotelId);
  const hotelDetails = useSelector((state) => state.hotels.currentHotel);
  const isLoading = useSelector((state) => state.hotels.isLoading); // ✅ đúng state
  // console.log('hotelDetails', hotelDetails);
  useEffect(() => {
    if (hotelId) {
      dispatch(fetchHotelById(hotelId));
    }
  }, [dispatch, hotelId]);

  return (
    <>
      {isLoading || !hotelDetails ? (
        <HotelDetailsViewCardSkeleton />
      ) : (
        <HotelDetailsViewCard hotelDetails={hotelDetails} />
      )}
    </>
  );
};

export default HotelDetails;
