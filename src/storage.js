import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  defaultExpires: null,
  storageBackend: AsyncStorage,
});

export default storage;
