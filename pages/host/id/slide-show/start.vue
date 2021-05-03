<template>
  <v-container
    style="margin:0;padding:0;"
  >
    <v-row
      justify="center"
    class="frame"
    >
      <v-col
        class="opening_content"
        v-on:click="startSlideShow" 
      >
        <div v-if="nowState === 1">
          <div class="start_phrase">Let's share your smile!</div>
          <!-- <button class="startButton">スライドショーをはじめます！</button> -->
        </div>
        <v-progress-circular
          v-if="nowState === 2"
          indeterminate
          color="primary"
        />
        <div v-if="nowState === 3">
          <div class="start_phrase">{{dispCount}}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      counter: 5 as Number,
      dispCount: 0 as Number | String,
      nowState: 0 as Number,
      states: {
        showMessage: 1,
        loading: 2,
        countdown: 3
      },
      isShowMessage: true as Boolean,
      isStartCountdown: false as Boolean,
      isLoadingList: false as Boolean
    }
  },
  mounted () {
    this.counter = 5;
    this.nowState = this.states.showMessage;
    this.dispCount = this.counter;
  },
  methods: {
    countdown() {
      if (this.counter >= 2) {
        setTimeout(function () {
          this.counter = this.counter - 1;
          this.dispCount = this.counter;
          this.countdown();
        }.bind(this), 1000);
      } else if (this.counter === 1) {
        setTimeout(function () {
          this.counter = this.counter - 1;
          this.dispCount = 'Start!';
          this.countdown();
        }.bind(this), 1000);
      } else if (this.counter === 0) {
        setTimeout(function () {
          this.counter = this.counter - 1;
          this.countdown();
        }.bind(this), 1000);
      } else {
        console.log('start!!');
        this.$router.push(`../main/`);
      }
    },

    async startSlideShow () {
      try {
        this.nowState = this.states.loading;
        await this.$store.dispatch('imagesList/getImagesList', 'resized');
        const list = this.$store.getters['imagesList/getList'];
        console.log(list);
        this.nowState = this.states.countdown;
        this.countdown();
      } catch {
        
      }
      
    }
  }
})
</script>

<style scoped>
.frame {
  background-color: black;
  background: linear-gradient(-135deg, #E4A972, #9941D8);
  background-size: cover;
  color: white;
  height: 100vh;
  width: 100vw;
  max-width: 100vw!important;
  font-family: 'MyFont';
  margin: 0;
}

.opening_content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.start_phrase {
    font-size: 70px;
}
</style>