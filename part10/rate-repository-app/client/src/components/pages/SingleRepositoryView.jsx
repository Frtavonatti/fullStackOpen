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
import { GET_REPOSITORY_DETAILS } from "../../graphql/queries";
import useReviews from "../../hooks/useReviews";
import RepositoryItem from "../repositories/RepositoryItem";
import ReviewItem from "../repositories/ReviewItem";
import ItemSeparator from "../ui/ItemSeparator";
import layout from "../../layout";

const SingleRepositoryView = () => {
  const { id } = useParams();

  const { data, error, loading: repoLoading } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const { reviews, fetchMore, loading: reviewsLoading } = useReviews({ 
    first: 5, 
    id
  });

  if (repoLoading) return <Text>Loading repository...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data?.repository) return <Text>Repository not found</Text>;

  const reviewNodes = reviews ? reviews.edges : [];
  
  const handlePress = () => {
    Linking.openURL(data?.repository.url);
  }

  const onEndReach = () => {
    if (!reviewsLoading) {
      fetchMore();
    }
  }

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
        onEndReached={onEndReach}
        // onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: layout.containerSpacing.top,
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