const HotelViewCardSkeleton = () => {
    return (
        <div
            className="card border p-4 flex flex-col md:flex-row gap-4 w-full animate-pulse rounded-lg shadow-sm"
            data-testid="hotel-view-card-skeleton"
        >
            {/* Image placeholder */}
            <div className="md:w-[220px] md:h-[140px] bg-gray-200 rounded-lg"></div>

            {/* Content area */}
            <div className="flex flex-col justify-between flex-1 space-y-3">
                <div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-1.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-1.5"></div>
                </div>

                {/* Amenities placeholder */}
                <div className="space-y-1">
                    <div className="h-2.5 bg-gray-200 rounded w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded w-28"></div>
                </div>
            </div>

            {/* Right section (rating & button) */}
            <div className="flex flex-col justify-between items-end md:items-center border-l md:pl-4 mt-4 md:mt-0">
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="mt-4">
                    <div className="h-8 bg-gray-300 rounded w-28"></div>
                </div>
            </div>
        </div>
    );
};

export default HotelViewCardSkeleton;
