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
        v-for="component in components"
        :key="component.uid"
        :component="component"
        @add-sub="fromSub"
      ></editor-component>
      <h1>{{ currentelement }}</h1>
    </div>
  </div>
</template>

<script>
import EditorComponent from "./EditorComponent2.vue";
import basicElements from "../../assets/components/componentList.js";
import { useComponentStore } from "../../store/useComponent";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useComponentStore();
    const { currentelement, dropElement } = storeToRefs(store);
    //let currentDrop = null;

    /*store.$subscribe((mutation, state) =>{
      //currentDrop = state.dropElement;
      console.log(mutation, state);
    } )*/

    return {
      currentelement,
      store,
      dropElement,
      //currentDrop
    };
  },
  components: {
    EditorComponent,
  },
  watch: {
    dropElement(newval, oldval) {
      //next step is to add component, to nested element
      console.log(
        "newval id is: " +
          newval.componentId +
          " and parent is " +
          newval.parentId
      );
      console.log(
        "oldval id is: " +
          oldval.componentId +
          " and parent is " +
          oldval.parentId
      );
    },
  },
  data() {
    return {
      components: [],
      componetIds: [],
      activeComponent: "",
    };
  },
  provide() {
    return {
      getActive: () => this.activeComponent,
    };
  },
  methods: {
    fromSub(data) {
      console.log("data from sub is: " + data);
    },
    setActive(id) {
      this.activeComponent = id;
    },
    searchComponentTree(element, id) {
      if (element.uid === id) {
        return element;
      } else if (element.components) {
        var result = null;
        element.components.forEach((c) => {
          result = this.searchComponentTree(c, id);
        });
        return result;
      }
      return null;
    },
    getNestedElement(comp) {
      let nested = this.createElement(comp);
      if (comp.components) {
        comp.components.forEach((c) => {
          nested.components.push(this.getNestedElement(c));
          //nested.components = this.getNestedElement(c);
        });
      }
      return nested;
    },
    addElem(comp, to) {
      //let element = this.createElement(comp);
      //element.components = this.getNestedElement(comp);
      let ele = this.getNestedElement(comp);

      if (to.id === "-1") {
        if (to.location) {
          this.components.splice(to.location, 0, ele);
        } else {
          this.components.push(ele);
        }
      } else {
        var addTo = this.searchComponentTree(ele, to);
        if (addTo != null) {
          addTo.components.push(ele);
        } else {
          console.log("could not find the element");
          //this.components.push(element);
        }
      }

      /*this.components.forEach((c) => {
        if(c.uid === to){
          c.components.push(element);
          return;
        }
      })*/
    },
    createElement(data) {
      return {
        name: data.name,
        classes: data.classes,
        uid: Math.random().toString(16).slice(2),
        active: false,
        type: data.type,
        components: [],
      };
    },
    onDropNested(data) {
      const componentDescription = basicElements.find(
        (item) => item.id == data.omponentId
      );
      const componentListDescription = componentDescription;
      if (componentListDescription.components) {
        componentListDescription.components.forEach((c) => {
          //this.addElem(c, data.parentId);
          this.addElem(c, {
            id: data.parentId,
            location: null,
          });
        });
      }
    },
    getLocation(event, selector){
      const dropElementY = event.y;
      // selector '#selector.id
      const compTables = this.$refs.container.querySelectorAll(selector); //might need to take this list from state
      let location = null;
      if (compTables.length >= 1) {
        for (let i = 0; i < compTables.length; i++) {
          const compTablesY1 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height / 2;
          const compTablesY2 =
            compTables[i].getBoundingClientRect().y +
            compTables[i].getBoundingClientRect().height;

          //insert above
          if (dropElementY <= compTablesY1) {
            location = i;
            break;
          }

          //insert below
          if (dropElementY <= compTablesY2) {
            location = i + 1;
            break;
          }
        }
      }
      return location;
    },
    onDrop(event) {
      const componentId = event.dataTransfer.getData("componentId");
      const componentDescription = basicElements.find(
        (item) => item.id == componentId
      );   

      //TO-DO: make sure to add in correct order
      if (componentDescription.components) {
        componentDescription.components.forEach((c) => {
          this.addElem(c, {
            id: "-1",
            location: this.getLocation(event, ".drop-el"),
          });
        });
      }

      /*if(this.components.length == 0){
              compId = Math.random().toString(16).slice(2);
              this.createRootElement();

      }

      component.components.forEach((comp) => {
        this.components = this.add(comp);
      });*/
      //console.log(this.add(component, this.components));
      console.log(this.components);
      //this.components = this.recursion(component);
      /*this.components.forEach((c) => {
        console.log(c);
      });*/
      //console.log(this.components);
      /*component.active = false;
      compId = Math.random().toString(16).slice(2);
      component.uid = compId;
      
      
      this.componetIds.push(compId);

      if (component.isLayout) {
        component.grid.forEach((cell) => {
          cell.active = false;
          compId = Math.random().toString(16).slice(2);

          cell.uid = compId;
          this.componetIds.push(compId);
        });
      }

      if (component.childs) {
        component.childs.forEach((child) => {
          child.active = false;
          compId = Math.random().toString(16).slice(2);

          child.uid = compId;
          this.componetIds.push(compId);
        });
      }

      const dropElementY = event.y;
      const compTables = this.$refs.container.querySelectorAll(".drop-el"); //might need to take this list from state

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

      this.store.resetComponentList();
      this.store.setComponentList(this.components);*/
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
