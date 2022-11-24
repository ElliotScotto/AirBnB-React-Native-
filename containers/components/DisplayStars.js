import { Entypo } from "@expo/vector-icons";
const DisplayStars = (number) => {
  let tab = [];

  for (let i = 1; i <= 5; i++) {
    if (number < i) {
      tab.push(
        <Entypo
          name="star"
          size={20}
          color="#BBBBBB"
          style={{ marginRight: 4 }}
          key={i}
        />
      );
    } else {
      tab.push(
        <Entypo
          name="star"
          size={20}
          color="#FFB100"
          style={{ marginRight: 4 }}
          key={i}
        />
      );
    }
  }

  return tab;
};
export default DisplayStars;
