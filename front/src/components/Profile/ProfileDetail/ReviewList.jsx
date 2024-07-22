import Review from "./Review";

function ReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review, index) => (
        <Review key={index} rating={review?.rating} />
      ))}
    </>
  );
}

export default ReviewList;
