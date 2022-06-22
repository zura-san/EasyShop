import React from "react";

const Rating = ({ value, text, color }) => {
  const ListRatingIcons = () => {
    let icons = [];
    for (let i = 0; i <= 4; i++) {
      icons.push(
        <span key={i}>
          <i
            style={{ color }}
            className={
              value >= i + 1
                ? "fas fa-star"
                : value >= i + 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      );
    }
    return icons;
  };

  return (
    <div className="rating">
      <ListRatingIcons />
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
