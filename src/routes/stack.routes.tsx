import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Parceiros from "../screens/Parceiros";
import HomeScreen from "../screens/HomeScreen";
import Campeonato from "../screens/Campeonato";
import Contato from "../screens/Contato";
import Leiloes from "../screens/Leiloes";
import Play from "../screens/Play";
import Noticias from "../screens/Noticias";
import Ranking from "../screens/Ranking";
import Vaquejadas from "../screens/Vaquejadas";
import SplashScreen from "../screens/SplashScreen";

const { Screen, Navigator } = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator>
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Parceiros"
        component={Parceiros}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Campeonato"
        component={Campeonato}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Contato"
        component={Contato}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Leiloes"
        component={Leiloes}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Noticias"
        component={Noticias}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="Play"
        component={Play}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Ranking"
        component={Ranking}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Vaquejadas"
        component={Vaquejadas}
        options={{
          headerShown: false,
        }}
      />
       <Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
