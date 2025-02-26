import { Formik } from "formik";
import * as yup from "yup";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations";
import useSignIn from "../../hooks/useSignIn";
import FormikTextInput from "../ui/FormikTextInput";
import Text from "../ui/Text";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      const { data } = await signIn({ username, password });
      if (data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text 
        fontWeight={'bold'}
        style={styles.title}
      >Sign Up</Text>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.form}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
              secureTextEntry
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
  },
  form: {
    width: '70%',
    display: 'flex',
    gap: 10
  },
  title: {
    color: '#1e90ff', 
    fontSize: 24,
    marginBottom: 40
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default SignUp;