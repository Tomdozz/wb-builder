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
     // isDropEmpty: store.isDropEmpty
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
      console.log(this.store.isDropEmpty)
      if(!this.store.isDropEmpty){
        this.onDropNested(newval);
      }
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
        });
      }
      return nested;
    },
    addElem(comp, to) {
      let ele = this.getNestedElement(comp);

      if (to.id === "-1") {
        if (to.location) {
          this.components.splice(to.location, 0, ele);
        } else {
          this.components.push(ele);
        }
      } else {
        var addTo = null;
        for (let i = 0; i < this.components.length; i++) {
          addTo = this.searchComponentTree(this.components[i], to.id);
          if(addTo){
            break;
          }
        }
        if (addTo != null) {
          addTo.components.push(ele);
        } else {
          console.log("could not find the element");
        }
      }
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
      console.log(data);
      const componentDescription = basicElements.find(
        (item) => item.id == data.componentId
      );
      const componentListDescription = componentDescription;
      if (componentListDescription.components) {
        componentListDescription.components.forEach((c) => {
          //this.addElem(c, data.parentId);
          this.addElem(c, {
            id: data.parentId,
            location: this.getLocation(data.y, "." + this.uid),
          });
        });
      }
    },
    getLocation(eventY, selector) {
      const dropElementY = eventY;
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
      if(!this.store.isDropEmpty) {
        this.store.clearDropElemet();
        console.log('dropped in nested')
      } else {
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
