import React from "react";
import { Fragment } from "react";
import Slider from "react-slick";

const MovieReview = ({ reviews }) => {
  const reviewsSlice = reviews.results.slice(0, reviews.results.length > 6 ? 6 : reviews.results.length);
  console.log(reviewsSlice);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
  };
  return (
    <Fragment>
      <div className='mb-5 pl-4 mx-auto' style={{ width: "95%" }}>
        <div className='d-flex justify-content-between px-3'>
          <h5>Reviews</h5>
          <a href='#!' target='_blank' rel='noreferrer'>
            See All Reviews
          </a>
        </div>
        <div
          style={{
            width: "95%",
            border: "#30363d 2px solid",
            borderRadius: "20px",
            backgroundColor: "#16161d",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
          }}
          className='mx-auto mt-2'>
          <Slider {...settings}>
            {reviewsSlice.map((review, index) => {
              return (
                <div className='d-flex' key={`review_${index}_${review.id}`}>
                  <span>
                    {console.log(review["author_details"]["avatar_path"])}
                    <img
                      src={
                        review["author_details"]["avatar_path"] !== null
                          ? review["author_details"]["avatar_path"].includes("gravatar")
                            ? review["author_details"]["avatar_path"].substring(1)
                            : `https://image.tmdb.org/t/p/w185${review["author_details"]["avatar_path"]}`
                          : null
                      }
                      alt='avatar'
                      className='d-none d-md-inline pt-2 pb-auto pl-3'
                      style={{
                        width: "96px",
                        height: "88px",
                      }}
                    />
                  </span>
                  <div className='pl-4 pt-2'>
                    <div className='d-flex flex-column'>
                      <strong>{review.author}</strong>
                      <span>{review.created_at.substring(0, 10)}</span>
                      <p className='pt-2 pr-3'>{review.content.substring(0, 700) + "....."}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieReview;
