<template>
  <div class="home">
    <div class="app">
      <span>Multiline message is:</span>
      <p>{{message}}</p>
      <br />
      <textarea name v-model="message" placeholder="please write..."></textarea>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
