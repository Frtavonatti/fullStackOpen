import Constants from 'expo-constants';

const layout = {
  statusBar: Constants.statusBarHeight,
  containerSpacing: {
    top: Constants.statusBarHeight + 80, // Considering appBar Height
  }
};

export default layout;