import {Image, View, StyleSheet } from "react-native";
import Text from "./Text";
const RepositoryItem = ({ repo }) => {
  const round = (n) => {
    if (n >= 1000) {
      const rounder = (n / 1000).toFixed(1);
      return rounder.toString().concat(' k');
    }
    return n;
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>  
        <Image source={{ uri: repo.ownerAvatarUrl }} style={styles.headerImage}/>
        <View style={{ display: 'flex', gap: 8 }}>
          <Text fontWeight={"bold"}>{repo.fullName}</Text>
          <Text>{repo.description}</Text>
          <Text style={styles.tag}>{repo.language}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{round(repo.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{round(repo.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{round(repo.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{round(repo.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
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