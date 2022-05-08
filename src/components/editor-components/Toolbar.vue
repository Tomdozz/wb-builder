<template>
  <div class="tools">
    <div>
      <p><font-awesome-icon icon="fa-gear" /></p>
    </div>
    <div>
      <p><font-awesome-icon icon="grip" /></p>
    </div>
    <div>
      <p><font-awesome-icon icon="fa-trash" /></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tools {
  position: absolute;
  top: 0;
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(-50%, -0%);
  display: flex;
  flex-direction: row;

  background-color: grey;
}
.tools div {
  margin: 0px 5px 0px 5px;
}
.tools div p {
  margin: 0;
}
</style>
