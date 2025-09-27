import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';

function Main() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

registerRootComponent(Main);
