<template>
  <div class="about">
    <div class="container">
      <div class="room">
        <div class="room-head">
          <img src="../assets/messenger.png" class="logo" alt="logo">
          <h1>{{name}}</h1>
        </div>
        <div class="messages" v-chat-scroll>
          
          <div v-for="(msg, index) in msgs" :key="index">
            <div v-if="msg.name == name"  class="block-right">
              <span>{{msg.name}}</span>
              <p>{{msg.message}}</p>
              <span>{{msg.time}}</span>
            </div>
            <div v-else class="block-left">
              <span>{{msg.name}}</span>
              <p>{{msg.message}}</p>
              <span>{{msg.time}}</span>
            </div>
          </div>

          
          
        </div>
        <div class="enter-msg">
          <input type="text" class="chat-input" v-model="newmessage">
          <button class="btn" @click="addmsg"> > </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import db from '../firebase/init'
import moment from 'moment'
import VueChatScrolle from 'vue-chat-scroll'

Vue.use(VueChatScrolle)
export default {
  name: 'Chat',
  props: {
    name: String
  },
  data(){
    return{
      newmessage: '',
      sender: this.name,
      time: Date.now(),
      msgs: []
    }
  }, 

  methods: {
    addmsg(){
      console.log(this.newmessage, this.sender, this.time)
      db.collection('messages').add({
        name: this.sender,
        message: this.newmessage,
        time: this.time
      })
        .then(() => {
          console.log('added successfull')
          this.newmessage = ''
        })
        .catch(err => console.log(err))
    }
  },

  created(){
    let ref = db.collection('messages').orderBy('time')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let msg = change.doc.data()
          msg.time = moment(change.doc.data().time).format('LT')
          this.msgs.push(msg)
        }
        
      })
    })
  }
}
</script>

<style scoped>
.container{
  height: 100vh;
  display: flex;
  background: #000;
  justify-content: center;
  align-items: center;
}

.room{
  width: 500px;
  background: #fff;
  text-align: center;
  margin: 0 auto;
  height: 100%;
}

.room-head{
  background: #0784c7;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  height: 50px;
  align-items: center;
}

.logo{
  height: 40px;
  widows: 40px;
  margin: 0 20px
}

.messages{
  background: #fff;
  height: 86%;
  overflow: auto;
}

.messages::-webkit-scrollbar{
  width: 5px;
}

.messages::-webkit-scrollbar-track{
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb{
  background: #999;
}

.block-right{
  text-align: right;
  padding: 0 10px;
}

.block-left{
  text-align: left;
  padding: 0 10px;
}

.block-right p{
  font-size: 16px;
  color: #fff;
  background: #0784c7;
  padding: 5px 10px;
  display: inline;
  border-radius: 15px;
}

.block-left p{
  font-size: 16px;
  color: #000;
  background: #eee;
  padding: 5px 10px;
  display: inline;
  border-radius: 15px;
}

.block-right span, .block-left span{
  font-size: 10px;
  color: #777;
  display: block;
  padding: 9px 0;
}

.enter-msg{
  border-top: 1px solid #444;
  text-align: left;
  padding: 10px;
}

.chat-input{
  border: none;
  border: 1px solid #777;
  border-radius: 15px;
  width: 340px;
  height: 30px;
  margin: 0 20px;
  font-size: 18px;
  padding: 0 10px;
}

.btn{
  background: #0784c7;
  color: #fff;
  border: none;
  padding: 10px 13px;
  cursor: pointer;
  border-radius: 50%;
}
</style>

