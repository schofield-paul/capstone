import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSingleSitter,
  fetchSingleSitterRatings,
  fetchSingleSitterReviews,
  selectSitters,
} from '../../slices/sittersSlice';

const SitterProfile = () => {
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const { singleSitter, sitterReviews, sitterRatings } =
    useSelector(selectSitters);

  const id = singleSitter.id;

  const total = ratings.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleSitterReviews(id));
      setReviews(sitterReviews);

      dispatch(fetchSingleSitterRatings(id));
      setRatings(sitterRatings);

      if (sitterRatings) {
        setAvgRating((total / sitterRatings.length).toFixed(1));
      }
    }
  }, [singleSitter, id, ratings]);

  // useEffect(() => {
  //   if (ratings.length > 0)
  //     setAvgRating((total / sitterRatings.length).toFixed(1));
  // }, [ratings]);

  return (
    <div className="font-rubik flex flex-col gap-5">
      <div>
        <h2 className="font-rubikmono">Sitter Profile</h2>
      </div>
      <div className="h-[calc(100vh_-_20rem)] overflow-auto flex flex-col gap-5">
        <div>
          <h2 className="font-rubikmono">About Me</h2>
          <p>{singleSitter.bio}</p>
        </div>
        <div>
          <h2 className="font-rubikmono">Availability</h2>
          <p>to be added</p>
        </div>
        <div>
          <h2 className="font-rubikmono pb-3">Ratings & Reviews</h2>
          <div>
            <div className="pb-3">
              <h3 className="font-rubikmono text-sm pb-3">Ratings</h3>
              <div>
                <p>
                  {avgRating !== NaN && avgRating > 0 ? avgRating : 'loading'} (
                  {ratings.length} ratings)
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-rubikmono text-sm pb-3">Reviews</h3>
              {reviews.length > 0
                ? reviews.map((review) => (
                    <div key={review.id} className="pb-3">
                      <p>{review.createdAt}</p>
                      <p>{review.context}</p>
                      <p>{review.user.fullName}</p>
                    </div>
                  ))
                : 'no reviews!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitterProfile;
