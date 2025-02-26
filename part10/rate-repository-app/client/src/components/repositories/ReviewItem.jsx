import { View, StyleSheet } from "react-native";
import Text from "../ui/Text";

const ReviewItem = ({ review }) => {
  const formattedDate = (date) => date.split('T')[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.node.rating}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text fontWeight="bold">{review.node.user.username}</Text>
          <Text style={styles.date}>{ formattedDate(review.node.createdAt) }</Text>
          <Text style={styles.text}>{review.node.text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    color: '#0366d6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  date: {
    marginBottom: 5,
    color: '#586069',
  },
  text: {
    flexWrap: 'wrap',
  }
});

export default ReviewItem;