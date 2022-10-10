const deviceTokenAndAuthorization = async () => {
    const deviceToken = await messaging().getToken();
    console.log('token device', deviceToken);
    const authPermission = await messaging().requestPermission();
    const isEnabled =
      messaging.AuthorizationStatus.AUTHORIZED ||
      messaging.AuthorizationStatus.PROVISIONAL;
    if (authPermission && isEnabled) {
      console.log('Permission Granted');
    } else {
      console.log('Permission Denied');
    }
     messaging().onMessage(async remoteMessage => {
        console.log("Message received. ", remoteMessage);
    createChannel();
     });
  };
