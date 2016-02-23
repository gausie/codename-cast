/* global cast */
import { namespace } from './config.json';
import loader from './loader.js';

function handleError(errorInfo) {
  console.error(errorInfo);
}

function initialize() {
  const manager = cast.receiver.castReceiverManager.getInstance();
  const typeJSON = cast.receiver.CastMessageBus.MessageType.JSON;
  const messageBus = manager.getCastMessageBus(namespace, typeJSON);

  manager.onReady = () => manager.setApplicationState('Ready');
  manager.onSenderDisconnected = () => { if (manager.getSenders().length === 0) window.close(); };

  messageBus.onMessage = function onMessage(event) {
    console.log(event);
  };

  manager.start({ statusText: 'Starting' });
}

loader('//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js')
  .then(() => new Promise((resolve, reject) => {
    window.__onGCastApiAvailable = function gCastApiAvailable(loaded, errorInfo) {
      if (!loaded) {
        reject(errorInfo);
      } else {
        resolve();
      }
    };
  }))
  .then(initialize)
  .catch(handleError);
