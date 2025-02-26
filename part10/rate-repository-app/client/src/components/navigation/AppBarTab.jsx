import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../ui/Text';

const AppBarTab = ({ text, to, onPress }) => {
  const content = 
  <Text 
    fontSize="subheading" 
    fontWeight="bold"
    style={styles.text}> 
    {text}
  </Text>;

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return (
    <Link to={to}>
      {content}
    </Link>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    paddingHorizontal: 15,
  }
});

export default AppBarTab
