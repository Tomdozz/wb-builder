<template>
  <div class="main-editor">
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
import EditorComponent from "./EditorComponent.vue"
import basicElements from "../../assets/components/basicComponents_1.js";


export default {
    components:{
        EditorComponent
    },
    data() {
      return {
        components: []
      }
    },
    methods: {
      onDrop(event){
        const componentId = event.dataTransfer.getData("componentId");
        const component = basicElements.find((item) => item.id == componentId);

    /*  const dropElementY = event.y;
      const compTables = this.$refs.container.querySelectorAll(".drop-el");
      
        
        if (compTables.length >= 1) {
        for (let i = 0; i < compTables.length; i++) {
          const compTablesY1 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height / 2;
          const compTablesY2 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height;

          if (dropElementY <= compTablesY1) {
            compTables[i].parentNode.insertBefore(
              mainInstance.$el,
              compTables[i]
            );
            break;
          }

          if (dropElementY <= compTablesY2) {
            compTables[i].parentNode.insertBefore(
              mainInstance.$el,
              compTables[i].nextSibling
            );
            break;
          }

          this.$refs.container.appendChild(mainInstance.$el);
        }
      } else {
        this.$refs.container.appendChild(mainInstance.$el);
      }*/
        
        this.components.push(component);
        console.log(this.components); 
      }
   }
}
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