<template>
  <v-row
    justify="center"
    class="btn-pos"
  >
    <v-col
      class="center"
    >
      <v-btn
        depressed
        color="primary"
        rounded
        v-text="btn_dscr"
        @click="goRegister"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      btn_dscr: 'シェアする' as String
    }
  },
  methods: {
    goRegister() {
      this.$router.push('/host/register/');
    }
  }
})
</script>

<style scoped>
.btn-pos {
  height: 20%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .btn-pos {
    height: 40%;
  }
}
</style>
