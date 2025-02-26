import { useQuery } from "@apollo/client"; 
import { useParams } from "react-router-native";
import { 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  Linking, 
  FlatList, 
  SafeAreaView 
} from "react-native";
import { GET_REPOSITORY_DETAILS, GET_REPOSITORY_REVIEWS } from "../../graphql/queries";
import RepositoryItem from "../repositories/RepositoryItem";
import ReviewItem from "../repositories/ReviewItem";

const SingleRepositoryView = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('GraphQL error:', error);
    }
  });

  const { data: reviewsData, loading: reviewsLoading } = useQuery(GET_REPOSITORY_REVIEWS, {
    variables: { id },
  });

  const reviewNodes = reviewsData
    ? reviewsData.repository.reviews.edges
    : [];
  
  const handlePress = () => {
    const url = data?.repository.url;
    Linking.openURL(url);
  }

  if (loading || reviewsLoading) return <Text>Loading...</Text>;

  const ItemSeparator = () => <View style={{ height: 10 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.repository}>
        <RepositoryItem repo={data?.repository} />
        <Pressable>
          <Text fontWeight={"bold"} 
            style={styles.button} 
            onPress={handlePress}
            testID="button">
              Open in GitHub
          </Text>
        </Pressable>
      </View>

      <ItemSeparator />
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    width: '100%',
  },
  repository: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    borderRadius: 5,
  }
});

export default SingleRepositoryView;