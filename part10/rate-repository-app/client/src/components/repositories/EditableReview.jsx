import { Platform, Pressable, Text, View, Alert, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER } from '../../graphql/queries'
import { DELETE_REVIEW } from '../../graphql/mutations'
import ReviewItem from './ReviewItem'

const EditableReview = ({ review }) => {
  const navigate = useNavigate()

  const { refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });

  const [mutation] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetch()
    }
  });

  const deleteReview = (id) => {
    const confirmDelete = () => {
      mutation({
        variables: { id },
      });
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this review?')) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            onPress: confirmDelete,
            style: 'destructive'
          }
        ]
      );
    }
  };
    
  const viewRepository = (id) => {
    navigate(`/repository/${id}`)
  }

  return (
    <View style={styles.container}>
      <ReviewItem review={review} />
      
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={() => viewRepository(review.node.repository.id)}
          style={styles.viewRepositoryButton}
        >
          <Text style={styles.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable 
          onPress={() => deleteReview(review.node.id)}
          style={styles.deleteReviewButton}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewRepositoryButton: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
  deleteReviewButton: {
    backgroundColor: '#d73a4a',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
})

export default EditableReview