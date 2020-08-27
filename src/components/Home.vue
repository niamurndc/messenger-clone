<template>
  <div class="home">
    <div class="container">
      <div class="welcome">
        <img src="../assets/messenger.png" alt="messenger-logo" class="logo">
        <h3>Welcome to</h3>
        <h1>Messenger</h1>
        <form @submit.prevent="enterRoom">
          <input type="text" v-model="name" class="field" placeholder="Name">
          <p v-if="feedback != ''" class="feedback">{{feedback}}</p>
          <input type="submit" value="Enter" class="btn">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import db from '../firebase/init'

export default {
  name: 'Home',
  data(){
    return{
      name: '',
      feedback: ''
    }
  },

  methods: {
    enterRoom(){
      if(this.name){
        this.feedback = ''
        this.$router.push({name: 'Chat', params: {name: this.name }})
      }else{
        this.feedback = 'Please enter your name for create room'
      }
    }
  }
}
</script>

<style scoped>
.container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome{
  width: 500px;
  background: #fff;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
}

.dark-theme{
  color: #fff;
  background: #000;
}

.logo{
  height: 70px;
  widows: 70px;
}

.field{
  border: none;
  border-bottom: 2px solid #777;
  display: block;
  width: 300px;
  margin: 20px auto;
  margin-bottom: 5px;
}

.btn{
  background: #0784c7;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
}

.feedback{
  color: red;
  font-size: 14px;
}
</style>
