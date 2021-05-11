import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const AppStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, 
  defaultExpires: 1000 * 3600,
  enableCache: true,
});

export default AppStorage;