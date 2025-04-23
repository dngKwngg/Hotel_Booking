import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, submitReview } from "../../../../store/review/reviewSlice";
import { useNavigate } from "react-router-dom";

const UserReviews = ({ hotelId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy thông tin từ Redux
    const user = localStorage.getItem("user");
    const accountId = user ? JSON.parse(user).userId : null;
    const { items: reviews, loading } = useSelector((state) => state.reviews);
    console.log("✅ Reviews:", reviews);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const isLoggedIn = !!accountId;

    // Lấy dữ liệu review khi hotelId thay đổi
    useEffect(() => {
        dispatch(fetchReviews(hotelId));
    }, [dispatch, hotelId]);

    // Lấy review của user hiện tại nếu có
    const userReview = reviews.find((r) => r.userId === accountId);

    useEffect(() => {
        if (userReview) {
            setRating(userReview.rating);
            setComment(userReview.comment);
        } else {
            setRating(0);
            setComment("");
        }
    }, [userReview]);

    // Tính điểm rating trung bình của hotel
    const averageRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // Tính số lượng đánh giá theo từng sao
    const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
    }));

    // Xử lý submit hoặc update review
    const handleSubmit = () => {
        if (!isLoggedIn) return navigate("/login");

        dispatch(
            submitReview({
                hotelId,
                userId: accountId,
                rating,
                comment,
            })
        );
    };

    return (
        <div className="mt-4">
            <h4 className="fw-bold">User Reviews</h4>

            {/* Tổng quan rating */}
            <div className="mb-4">
                <div className="h2 fw-bold">
                    {averageRating} <FaStar color="gold" />
                </div>
                <div>{reviews.length} votes</div>
                {ratingBreakdown.map(({ star, count }) => (
                    <div key={star}>
                        {star} <FaStar color="gold" size={14} />: {count}
                    </div>
                ))}
            </div>

            {/* Form đánh giá cho người dùng đã đăng nhập */}
            {isLoggedIn && (
                <div className="border rounded p-3 mb-4 bg-light">
                    <h6 className="fw-semibold">
                        {userReview ? "Update Your Review" : "Write a Review"}
                    </h6>
                    <div className="mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar
                                key={s}
                                color={s <= rating ? "orange" : "gray"}
                                size={20}
                                onClick={() => setRating(s)}
                                style={{ cursor: "pointer" }}
                            />
                        ))}
                    </div>
                    <textarea
                        className="form-control"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                    />
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleSubmit}
                        disabled={rating === 0 || !comment}
                    >
                        {userReview ? "Update Review" : "Submit Review"}
                    </button>
                </div>
            )}

            {/* Hiển thị các bình luận khác */}
            <div>
                <h5 className="fw-semibold">Other Reviews</h5>
                {reviews.map((r) => (
                    <div key={r.id} className="border-bottom py-2">
                        <strong>
                            {r.userId === accountId ? "You" : r.userName || "Anonymous"}
                        </strong>
                        <div>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <FaStar
                                    key={s}
                                    size={14}
                                    color={s <= r.rating ? "gold" : "lightgray"}
                                />
                            ))}
                        </div>
                        <p className="mb-1">{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
