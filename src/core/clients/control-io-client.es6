/* control-io-client.es6 */
import SocketClient from 'socket.io-client';

export default function () {
  const controlIOClient = new SocketClient(`${window.location.origin}/ControlIO`);
  controlIOClient.on('connect', () => {
    console.log('Connected to ControlIO Websocket');
    attachSocketListeners(controlIOClient);
  });
}

// === Private ===
function attachSocketListeners(io) {
  io.on('test', () => {
    console.log('Received test message from ControlIO');
  });
}
