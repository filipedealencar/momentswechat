import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Home} from './src/screens/home';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#424242'} />

        <Home />
      </SafeAreaView>
    </Provider>
  );
}
export default App;
