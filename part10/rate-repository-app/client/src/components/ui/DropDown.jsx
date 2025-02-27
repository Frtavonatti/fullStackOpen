import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = ({ setOrderBy, setOrderDirection }) => {
  const options = [
    {
      label: 'Latest repositories',
      value: 'latest'
    },
    {
      label: 'Highest rated repositories',
      value: 'highest'
    },
    {
      label: 'Lowest rated repositories',
      value: 'lowest'
    }
  ];

  const handleValueChange = (value) => {
    switch (value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
    }
  };

  return (
    <RNPickerSelect
      onValueChange={handleValueChange}
      items={options}
      value='latest'
    />
  );
};

export default Dropdown;