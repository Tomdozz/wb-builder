<template>
  <div class="main-editor" id="main-zone">
    <div
      class="drop-zone"
      ref="container"
      @drop="onDrop($event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <editor-component
        v-for="(component, index) in components"
        :key="index"
        :component="component"
      ></editor-component>
    </div>
  </div>
</template>

<script>
import EditorComponent from "./EditorComponent.vue";
import basicElements from "../../assets/components/basicComponents_1.js";

export default {
  components: {
    EditorComponent,
  },
  data() {
    return {
      components: [],
    };
  },
  methods: {
    onDrop(event) {
      const componentId = event.dataTransfer.getData("componentId");
      const component = basicElements.find((item) => item.id == componentId);

      const dropElementY = event.y;
      const compTables = this.$refs.container.querySelectorAll(".drop-el");

      if (compTables.length >= 1) {
        let added = false;
        for (let i = 0; i < compTables.length; i++) {
          const compTablesY1 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height / 2;
          const compTablesY2 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height;

          //insert above
          if (dropElementY <= compTablesY1) {
            this.components.splice(i, 0, component);
            added = true;
            break;
          }

          //insert below
          if (dropElementY <= compTablesY2) {
            this.components.splice(i + 1, 0, component);
            added = true;
            break;
          }
        }
        if (!added) {
          this.components.push(component);
        }
      } else {
        this.components.push(component);
      }
    },
  },
};
</script>
<style scoped>
.main-editor {
  width: 80%;
  height: 900px;
}
.drop-zone {
  height: 98%;
  width: 98%;
  margin: 10px auto;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 10px #ccc;
}
</style>
