import { User2 } from "lucide-react";
import Rating from "@mui/material/Rating";
import { useAppSelector } from "../../store/hooks";

const ReviewSection = () => {
  const { reviews } = useAppSelector((state) => state.product);
  if (reviews.length === 0) {
    return (
      <div>
        <p>No reviews created </p>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 max-w-3xl mx-auto space-y-6">
      <h3 className="text-center text-xl font-semibold">Customer Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="flex gap-4">
          {/* User Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 border rounded-full flex items-center justify-center bg-gray-100">
              <User2 className="w-6 h-6 text-gray-500" />
            </div>
          </div>

          {/* Name, Rating, Comment */}
          <div className="flex-1">
            <div className="flex justify-between gap-2">
              <h4 className="font-medium">Koshish khadka</h4>
              <Rating
                name="read-only"
                value={review.rating}
                readOnly
                size="small"
              />
            </div>
            <p className="text-gray-700 mt-1">{review.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
