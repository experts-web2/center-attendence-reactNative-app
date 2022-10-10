import AsyncStorage from '@react-native-async-storage/async-storage';
class AsyncStorageManager {
  storeDataValue = async (key, value) => {
    try {
      console.log('sdsdsdsd', key, value);
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('SAVING ERROR');
    }
  };

  storeDataObject = async (key, value) => {
    try {
      console.log('sdsdsdsd', key, value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('SAVING ERROR');
    }
  };

  getDataValue = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value != null ? JSON.parse(value) : null;
      }
    } catch (e) {
      console.log('Getting ERROR');
    }
  };

  getDataObject = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log('jsonValue', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Getting ERROR');
    }
  };

  async clearAllAsyncData() {
    await AsyncStorage.clear();
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
  }
}

export default new AsyncStorageManager();
