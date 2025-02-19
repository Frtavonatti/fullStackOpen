import { Link } from 'react-router-native'
import Text from './Text';

const AppBarTab = ({ text, to }) => {
  return (
      <Link to={to}>
        <Text fontSize="subheading" fontWeight="bold" style={{color: '#fff', paddingLeft: 14}}>
          {text}
        </Text>
      </Link>
  )
}

export default AppBarTab
