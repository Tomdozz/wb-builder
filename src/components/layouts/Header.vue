<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="actions">
      <base-button type="ghost"><h5>Preview</h5></base-button>
      <base-button @click="exportDom" type="stroke"><h5>Export</h5></base-button>
      <base-button type="fill"><h5>Save</h5></base-button>
    </div>
  </header>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'
export default {
  components: {
    BaseButton
  },
  props: ["title"],
  methods: {
    exportDom(){
      var html = document.getElementById('drop-zone-id').innerHTML;
      html = html.replace(/<!--.*?-->/sg, "")
      console.log(html);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/css/variables.scss";

header {
  width: 100%;
  height: 5rem;
  margin-bottom: 1px;
  padding: 5px;
  background-color: $secondary-color-30;
  box-shadow: 0px 15px 10px -15px #ccc;
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  position: fixed;
}
header h1 {
  margin: 0;
}

.actions{
  box-shadow: -15px 0px 10px -15px #ccc;
  button{
    margin: 10px;
  }
}
</style>