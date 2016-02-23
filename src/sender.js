/* global chrome */
// import { applicationId } from './config.json';
import loader from './loader.js';

function handleError(errorInfo) {
  console.error(errorInfo);
}

function sessionListener(session) {
  console.log('Session Listener called', session);
}

function receiverListener(receiverAvailability) {
  console.log('Receiver Listener called', receiverAvailability);
}

function onInitSuccess() {}

function initialize() {
  if (!chrome.cast || !chrome.cast.isAvailable) {
    return Promise.reject('Cannot load Cast API');
  }

  const applicationId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;

  const sessionRequest = new chrome.cast.SessionRequest(applicationId);
  const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
  return chrome.cast.initialize(apiConfig, onInitSuccess, handleError);
}

loader('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js')
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
