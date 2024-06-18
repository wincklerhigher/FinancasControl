import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TransactionProvider } from './android/app/src/TransacaoComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './android/app/src/styles/FinancasStyle';
import RelatorioContas from './android/app/src/telas/RelatorioContas';
import Orçamentos from './android/app/src/telas/Orçamentos';
import Metas from './android/app/src/telas/Metas';
import { servicoDeNotificacao } from './android/app/src/componentes/ServicoDeNotificacao';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    servicoDeNotificacao.configurar();         
  }, []);

  const HomeScreen = ({ navigation }) => {
    const handleButtonClick = () => {
      servicoDeNotificacao.mostrarNotificacao("Teste", "Essa é uma notificação de teste!");
    };
  
    const handleDelayedNotification = () => {
      servicoDeNotificacao.mostrarNotificacaoAtrasada("Notificação Atrasada", "Esta notificação é enviada após 10 segundos.");
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('RelatorioContas')}>
          <Text style={styles.dashboardButtonText}>Relatório de Contas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('Orçamentos')}>
          <Text style={styles.dashboardButtonText}>Orçamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('Metas')}>
          <Text style={styles.dashboardButtonText}>Metas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboardButton} onPress={handleButtonClick}>
          <Text style={styles.dashboardButtonText}>Enviar Notificação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboardButton} onPress={handleDelayedNotification}>
          <Text style={styles.dashboardButtonText}>Enviar Notificação Atrasada</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Página Inicial" component={HomeScreen} />
          <Stack.Screen name="RelatorioContas" component={RelatorioContas} />
          <Stack.Screen name="Orçamentos" component={Orçamentos} />
          <Stack.Screen name="Metas" component={Metas} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}

export default App;