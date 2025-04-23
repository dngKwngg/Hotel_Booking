import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HotelBookingDetailsCard from '../hotel-booking-details-card/HotelBookingDetailsCard';
// import UserReviews from '../user-reviews/UserReviews';

const HotelDetailsViewCard = ({ hotelDetails }) => {
    if (!hotelDetails) return null;

    const {
        title,
        subtitle,
        description,
        benefits = [],
        images = [],
        location,
        distanceFromCenter
    } = hotelDetails;

    // const galleryImages = images.map(img => ({
    //     original: img.imageUrl,
    //     thumbnail: img.imageUrl
    // }));

    return (
        <div className="container my-4">
            <style>
                {`
                    .image-gallery-slide img {
                        height: 400px;
                        object-fit: cover;
                    }
                    .image-gallery-thumbnail img {
                        height: 60px;
                        object-fit: cover;
                    }
                `}
            </style>

            <div className="row">
                {/* Bên trái: Thông tin khách sạn + review */}
                <div className="col-md-8">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={true}
                        slideOnThumbnailOver={true}
                        thumbnailPosition="bottom"
                    />

                    <div className="mt-4">
                        <h2 className="fw-bold">{title}</h2>
                        <p className="text-muted">
                            {location} | {distanceFromCenter || "Near center"}
                        </p>
                        <p className="lead">{subtitle}</p>
                        <p>{description}</p>

                        <h5 className="fw-semibold mt-4">Amenities</h5>
                        <ul className="list-inline">
                            {benefits.map((item, index) => (
                                <li
                                    key={index}
                                    className="list-inline-item badge bg-secondary me-2 my-1"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 👉 Component review */}
                    {/* <div className="mt-5">
                        <UserReviews hotelCode={hotelDetails.hotelCode} />
                    </div> */}
                </div>

                {/* Bên phải: Xác nhận đặt phòng */}
                <div className="col-md-4">
                    <HotelBookingDetailsCard hotelDetails={hotelDetails} />
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsViewCard;
