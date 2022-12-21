<script>
import BaseComp from "../editor-components/BaseComp.vue";
import BaseLayout from "../editor-components/BaseLayout.vue";
import LayoutComponent from "../editor-components/LayoutComponent.vue";

import { h } from "vue";

export default {
  data() {
    return {
      componentData: this.component,
    };
  },
  props: {
    component: {
      type: void 0,
    },
  },
  render() {
    let childs = [];
    let grid = [];

    if (!this.componentData.isLayout) {
      if (this.componentData.childs) {
        this.componentData.childs.forEach((element) => {
          let c = h(
            BaseComp,
            {
              initialHeigt: element.pops.minHight,
              id: element.uid,
              isActive: element.active,
              fullyResizable: element.fullyResizable,
            },
            [h(element.type, {}, element.name)]
          );
          childs.push(c);
          console.log(childs);
        });
      }
    } else {
      if (this.componentData.grid) {
        this.componentData.grid.forEach((elem) => {
          let childrens = [];
          if (elem.childs) {
            elem.childs.forEach((child) => {
              let c = h(
                LayoutComponent,
                {
                  id: elem.uid,
                  foundationClass: child.foundation,
                  parentId: this.componentData.uid,
                },
                [
                  h(
                    child.type,
                    {
                      class: child.foundation,
                    },
                    h("div", ".")
                  ),
                ]
              );

              childrens.push(c);
            });
          }

          let gridEntry;
          if (elem.isContained) {
            let element = h(
              elem.type,
              {
                class: elem.foundation,
              },
              childrens
            );
            gridEntry = h(
              "div",
              {
                class: "grid-container",
              },
              [element]
            );
          } else {
            gridEntry = h(
              elem.type,
              {
                class: elem.foundation,
              },
              childrens
            );
          }
          grid.push(gridEntry);
        });
      }
    }

    console.log(grid);

    let elem;
    if (this.componentData.isLayout) {
      console.log("component is: " + this.componentData.uid);
      elem = h(
        BaseLayout,
        {
          id: this.componentData.uid,
          on: this.$attrs,
        },
        /* {
            initialHeigt: this.componentData.pops.minHight,
            id: this.componentData.uid,
            isActive: this.componentData.active,
        }*/ grid
      );
    } else {
      elem = h(
        BaseComp,
        {
          initialHeigt: this.componentData.pops.minHight,
          id: this.componentData.uid,
          isActive: this.componentData.active,
          on: this.$attrs,
        },
        [h(this.componentData.type, {}, childs)]
      );
    }

    return elem;
  },
};
</script>
