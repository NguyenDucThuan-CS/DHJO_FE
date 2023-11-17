// WebSocketService.ts
import SockJS from 'sockjs-client';

interface Message {
  text: string;
}

class WebSocketService {
  private socket: any;

  constructor() {
    this.socket = new SockJS('http://localhost:8080/notify');
    this.socket.onopen = this.handleOpen;
    this.socket.onmessage = this.handleMessage;
    this.socket.onclose = this.handleClose;
  }

  private handleOpen = () => {
    console.log('WebSocket connection opened.');
  };

  private handleMessage = (event: MessageEvent) => {
    const data: Message = JSON.parse(event.data);
    console.log('Received message:', data.text);
    // Handle incoming messages here
  };

  private handleClose = () => {
    console.log('WebSocket connection closed.');
  };

  sendMessage = (message: Message) => {
    // Send a message to the server
    this.socket.send(JSON.stringify(message));
  };

  closeConnection = () => {
    // Close the WebSocket connection
    this.socket.close();
  };
}

export default WebSocketService;
