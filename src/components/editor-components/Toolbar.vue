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
  position: relative;
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(0%, -50%);
  display: flex;
  flex-direction: row;
}
</style>
