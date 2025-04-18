import {Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "../ui/Text";

const RepositoryItem = ({ repo }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/repository/${repo.id}`);
  }

  const round = (n) => {
    if (n >= 1000) {
      const rounder = (n / 1000).toFixed(1);
      return rounder.toString().concat(' k');
    }
    return n;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container} testID="repositoryItem">
        <View style={styles.header}>  
          <Image source={{ uri: repo.ownerAvatarUrl }} style={styles.headerImage} testID="avatar"/>
          <View style={{ display: 'flex', gap: 8 }}>
            <Text fontWeight={"bold"} testID="fullName">{repo.fullName}</Text>
            <Text testID="description">{repo.description}</Text>
            <Text style={styles.tag} testID="language">{repo.language}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text fontWeight={"bold"} testID="stars">{round(repo.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.stats}>
            <Text fontWeight={"bold"} testID="forks">{round(repo.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.stats}>
            <Text fontWeight={"bold"} testID="reviews">{round(repo.reviewCount)}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.stats}>
            <Text fontWeight={"bold"} testID="rating">{round(repo.ratingAverage)}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  }, 
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    padding: 10
  },
  headerImage: {
    width: 50,
    height: 50
  },
  tag: {
    backgroundColor: '#0366d6',
    color: 'white',
    fontWeight: 'bold',
    padding: 4,
    borderRadius: 5,
    alignSelf: 'flex-start'
  }, 
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    margin: 5
  }
})

export default RepositoryItem;