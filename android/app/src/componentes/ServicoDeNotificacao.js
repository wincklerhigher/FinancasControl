import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class ServicoDeNotificacao {
  configurar() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notificacao) {
        console.log("NOTIFICAÇÃO:", notificacao);
        notificacao.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notificacao) {
        console.log("AÇÃO:", notificacao.action);
        console.log("NOTIFICAÇÃO:", notificacao);
      },
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel", 
        channelDescription: "A default channel", 
        soundName: "default", 
        importance: 4, 
        vibrate: true, 
      },      
    );
  }

  mostrarNotificacao(titulo, mensagem, delay = 0) {
    console.log('Mostrar notificação:', titulo, mensagem);
    setTimeout(() => {
      PushNotification.localNotification({
        channelId: "default-channel-id",
        title: titulo,
        message: mensagem,
      });
    }, delay);
  }

  mostrarNotificacaoAtrasada(titulo, mensagem) {
    const delay = 10000; // 10 segundos
    this.mostrarNotificacao(titulo, mensagem, delay);
  }
}

export const servicoDeNotificacao = new ServicoDeNotificacao();