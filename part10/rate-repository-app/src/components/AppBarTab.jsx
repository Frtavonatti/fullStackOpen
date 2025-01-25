import { TouchableWithoutFeedback } from 'react-native';
import Text from './Text';

const AppBarTab = ({ text }) => {
  return (
      <TouchableWithoutFeedback onPress={(event) => alert('hello world')}>
        <Text fontSize="subheading" fontWeight="bold" style={{color: '#fff'}}>{text}</Text>
      </TouchableWithoutFeedback>
  )
}

export default AppBarTab
