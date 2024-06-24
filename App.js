import React, { useEffect } from 'react';
import { View } from 'react-native';
import { TransactionProvider } from './android/app/src/TransacaoComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Button } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import RelatorioContas from './android/app/src/telas/RelatorioContas';
import Orçamentos from './android/app/src/telas/Orçamentos';
import Metas from './android/app/src/telas/Metas';
import { servicoDeNotificacao } from './android/app/src/componentes/ServicoDeNotificacao';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const handleButtonClick = () => {
    servicoDeNotificacao.mostrarNotificacao("Teste", "Essa é uma notificação de teste!");
  };

  const handleDelayedNotification = () => {
    servicoDeNotificacao.mostrarNotificacaoAtrasada("Notificação Atrasada", "Esta notificação é enviada após 10 segundos.");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Página Inicial" titleStyle={{ alignSelf: 'center' }} />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}>
        <Button
          style={{ marginBottom: 10 }}
          icon={() => <Icon name="description" size={20} color="white" />}
          mode="contained"
          onPress={() => navigation.navigate('RelatorioContas')}>
          Relatório de Contas
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          icon={() => <Icon name="attach-money" size={20} color="white" />}
          mode="contained"
          onPress={() => navigation.navigate('Orçamentos')}>
          Orçamentos
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          icon={() => <Icon name="star" size={20} color="white" />}
          mode="contained"
          onPress={() => navigation.navigate('Metas')}>
          Metas
        </Button>
        <Button
          style={{ marginBottom: 10, backgroundColor: '#2196F3' }}
          icon={() => <Icon name="notifications" size={20} color="white" />}
          mode="contained"
          onPress={handleButtonClick}>
          Enviar Notificação
        </Button>
        <Button
          style={{ marginBottom: 10, backgroundColor: '#2196F3' }}
          icon={() => <Icon name="schedule" size={20} color="white" />}
          mode="contained"
          onPress={handleDelayedNotification}>
          Enviar Notificação Atrasada
        </Button>
      </View>
    </View>
  );
};

const App = () => {
  useEffect(() => {
    servicoDeNotificacao.configurar();
  }, []);

  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Página Inicial">
          <Stack.Screen name="Página Inicial" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RelatorioContas" component={RelatorioContas} options={{ title: 'Relatório de Contas' }} />
          <Stack.Screen name="Orçamentos" component={Orçamentos} options={{ title: 'Orçamentos' }} />
          <Stack.Screen name="Metas" component={Metas} options={{ title: 'Metas' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;