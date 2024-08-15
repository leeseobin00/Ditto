import { useEffect, useState } from "react";
import Review from "./Review";

function ReviewList({ reviews }) {
  const [reviewList, setReviewList] = useState([]);
  
  useEffect(()=>{
    setReviewList(reviews);
  },[reviews]);

  return (
    <>
      {reviewList?.map((review, index) => (
        <Review 
          key={index}
          rating={review?.rating}
          className={review?.classDetail?.className}
          content={review?.reviewContent}
          reviewer={review?.reviewer?.nickname}
          date={review?.modifiedDate?.split('T')[0]}
        /> 
      ))}
    </>
  );
}

export default ReviewList;
