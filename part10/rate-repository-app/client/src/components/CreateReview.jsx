import { View, Pressable, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-native"
import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"
import FormikTextInput from "./FormikTextInput"
import Text from "./Text"

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: 0,
  review: "",
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  review: yup.string(),
})

const CreateReview = () => {
  const navigate = useNavigate()

  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = async (values) => {
    const formattedValues = {
      review: {
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: Number(values.rating),
        text: values.review
      }
    };

    try {
      const { data } = await createReview({ 
        variables: formattedValues 
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (error) { 
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        fontSize={'subheading'} 
        fontWeight={'bold'}> 
          Create Review
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View style={styles.form}>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput
              name="review"
              placeholder="Review"
            />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 15
  },
  form: {
    width: "100%",
    display: "flex",
    gap: 10,
    padding: 15
  },
  button: {
    backgroundColor: "#0366d6",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    padding: 10,
  },
})

export default CreateReview