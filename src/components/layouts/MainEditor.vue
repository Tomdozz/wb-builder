<template>
  <div class="main-editor">
    <div
      class="drop-zone"
      ref="container"
      @drop="onDrop($event)"
      @dragenter.prevent
      @dragover.prevent
    ></div>
  </div>
</template>
<script>
import basicElements from "../../assets/components/basicComponents.js";
import CompEl from "../editor-components/CompEl.vue";
import Vue from "vue";

export default {
  data() {
    return {
      activated: -1,
    };
  },
  methods: {
    getInstanceFromDescription(component, ComponentClass, componentId, event) {
      var instance;

      if (component.component_description) {
        instance = new ComponentClass({
          propsData: {
            id: componentId,
            styles: component.component_description.styles,
            classes: component.component_description.class,
            width: component.component_description.width,
            height: component.component_description.minHight,
            posX: event.offsetX.toString(),
            posY: event.offsetY.toString(),
          },
        });
      } else {
        instance = new ComponentClass();
      }
      return instance;
    },
    onDrop(event) {
      console.log(event);
      const componentId = event.dataTransfer.getData("componentId");
      const component = basicElements.find((item) => item.id == componentId);

      var ComponentClass = Vue.extend(CompEl);
      var mainInstance;

      mainInstance = this.getInstanceFromDescription(
        component,
        ComponentClass,
        componentId,
        event
      );

      mainInstance.$mount();
      mainInstance.$on("activated", (id) => {
        console.log(id);
        this.activated = id;
      });

      //for sections we want to know the order of
      const dropElementY = event.y;
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
      }

      if (component.childs) {
        var childInstance;
        component.childs.forEach((element) => {
          childInstance = this.getInstanceFromDescription(
            element,
            ComponentClass,
            element.id,
            event
          );

          childInstance.$mount(); // pass nothing
          mainInstance.$refs.container.appendChild(childInstance.$el);
        });
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
