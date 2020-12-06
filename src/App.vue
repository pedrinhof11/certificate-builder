<template>
  <div id="app">
    <div class="container">
      <certificate></certificate>
    </div>
  </div>
</template>

<script>
import Certificate from "./components/VCertificate.vue";
export default {
  name: "App",
  components: {
    Certificate
  }
};
</script>
