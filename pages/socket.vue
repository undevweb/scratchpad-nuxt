<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-12">
      <h1 class="text-center">{{ title }}</h1>
      <br>
      <div id="status"></div>
      <div id="chat">
        <input type="text" v-model="name" id="username" class="form-control" placeholder="Enter name...">
        <br>
        <div class="card">
          <div id="messages" class="card-block">
            <ul>
              <li v-for="message of messages">{{ message.name }}: {{ message.text }}</li>
            </ul>
          </div>
        </div>
        <br>
        <textarea id="textarea" class="form-control" v-model="text" placeholder="Enter message..."></textarea>
        <br>
        <button id="send" class="btn" @click.prevent="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
  import socket from '@/plugins/socket.io.js'
  export default { data() { return {
      title: 'Nestjs Websockets Chat',
      name: '',
      text: '',
      messages: [],
      socket: null
    }},
    methods: {
      sendMessage() {
          socket.emit('msgToServer', 'just yolo')
      },
      receivedMessage(message) {
        this.messages.push(message)
      },
    },
    created() {
      socket.on('msgToClient', (message) => {
        console.log("Il répond !!!",message);
      })
    }

  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html {
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }
  html, input {
    font-family:
      "HelveticaNeue-Light",
      "Helvetica Neue Light",
      "Helvetica Neue",
      Helvetica,
      Arial,
      "Lucida Grande",
      sans-serif;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    word-wrap: break-word;
  }
  /* Pages */
  .pages {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .page {
    height: 100%;
    position: absolute;
    width: 100%;
  }
  /* Font */
  .messages {
    font-size: 150%;
  }
  .inputMessage {
    font-size: 100%;
  }
  .log {
    color: gray;
    font-size: 70%;
    margin: 5px;
    text-align: center;
  }
  /* Messages */
  .chatArea {
    height: 100%;
    padding-bottom: 60px;
  }
  .messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
  }
  /* Input */
  .inputMessage {
    border: 10px solid #3B8070;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    padding-left: 10px;
    position: absolute;
    right: 0;
    width: 100%;
  }
</style>
