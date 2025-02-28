import { useQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/queries';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EditableReview from '../repositories/EditableReview';
import ItemSeparator from '../ui/ItemSeparator';
import layout from '../../layout';

const MyReviews = () => {
  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });

  const reviewNodes = data ? data.me?.reviews?.edges : [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ node }) => node.id}
        renderItem={({ item }) => <EditableReview review={item} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: layout.containerSpacing.top,
    width: '100%',
  }
})

export default MyReviews
