import { useQuery } from "@apollo/client"; 
import { useParams } from "react-router-native";
import { View, Text, Pressable, Linking } from "react-native";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

const SingleRepositoryView = () => {
  const { id } = useParams();
  
  const { data, loading, error } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('GraphQL error:', error);
    }
  });

  const handlePress = () => {
    const url = data?.repository.url;
    Linking.openURL(url);
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      <RepositoryItem repo={data?.repository} />
      <Pressable>
        <Text fontWeight={"bold"} 
          style={{ backgroundColor: '#0366d6', color: 'white', padding: 10, textAlign: 'center' }} 
          onPress={handlePress}
          testID="button">
            Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
}

export default SingleRepositoryView;