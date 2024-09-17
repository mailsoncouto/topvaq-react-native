import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DrawerLayoutAndroid } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';


type RootDrawerParamList = {
  Noticias: undefined;
  Vaquejadas: undefined;
  Campeonato: undefined;
  Ranking: undefined;
  Leiloes: undefined;
  Play: undefined;
  Contato: undefined;
};

type HomeScreenProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const drawer = useRef<DrawerLayoutAndroid | null>(null);

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerText}>Menu</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Noticias')}>
        <Text style={styles.menuItem}>Notícias</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Vaquejadas')}>
        <Text style={styles.menuItem}>Vaquejadas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Campeonato')}>
        <Text style={styles.menuItem}>Campeonato</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
        <Text style={styles.menuItem}>Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Leiloes')}>
        <Text style={styles.menuItem}>Leilões</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Play')}>
        <Text style={styles.menuItem}>Play</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Contato')}>
        <Text style={styles.menuItem}>Contato</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => drawer.current?.openDrawer()}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  drawerText: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 100,
    fontWeight: '500',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
  menuButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerLine: {
    width: 30,
    height: 3,
    backgroundColor: '#333',
    marginVertical: 2,
  },
});

export default HomeScreen;
