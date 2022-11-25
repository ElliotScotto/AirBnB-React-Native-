import { Foundation } from "@expo/vector-icons";
const generateStars = (ratingValue) => {
  const starsArray = [];
  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      starsArray.push(
        <Foundation name="star" size={24} color="#DAA520" key={i} />
      );
    } else {
      starsArray.push(
        <Foundation name="star" size={24} color="grey" key={i} />
      );
    }
  }

  return starsArray;
};
export default generateStars;
