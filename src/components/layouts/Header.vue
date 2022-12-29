<template>
  <header>
    <h1>{{ title }}</h1>
    <base-button style="fill"><h4>Log in</h4></base-button>
    <base-button style="stroke"><h4>Log in</h4></base-button>
  </header>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
export default {
  components: {
    BaseButton
  },
  props: ["title"],
};
</script>

<style scoped lang="scss">
@import "../../../public/css/variables.scss";

header {
  width: 100%;
  height: 5rem;
  margin-bottom: 1px;
  background-color: $secondary-color-30;
  box-shadow: 0px 15px 10px -15px #ccc;
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
}
header h1 {
  margin: 0;
}
</style>