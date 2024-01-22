
import * as axiosUtill from './axiosUtill';
import * as StompJs from '@stomp/stompjs';



// getMapping 시 해당 함수로 호출하면 됩니다.
function createClient() {
    const client = new StompJs.Client({
        brokerURL: 'ws://localhost:8093/ws'
    });

    return client;
  }
