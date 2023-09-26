<script>
import BaseComp from "../editor-components/BaseComp2.vue";
/*import BaseLayout from "../editor-components/BaseLayout.vue";
import LayoutComponent from "../editor-components/LayoutComponent.vue";*/

import { h } from "vue";
var getTree = function (data) {
  let childs = [];
  if (data.components) {
    data.components.forEach((c) => {
      childs.push(getTree(c));
    });
  }

  let classes = [];
  data.classes.forEach((c) => {
    classes.push(c.name);
  });
  let finalclass = classes.join(" ");
  console.log(data);

  let result = h(
    BaseComp,
    {
      //initialHeigt: this.componentData.pops.minHight,
      uid: data.uid,
      isActive: data.active,
      classes: finalclass,
      htmlType: data.htmlType,
      type: data.type,
      class: finalclass,
      fullyResizable: data.fullyResizable,
      initWidth: data.initWidth,
      initialHeigt: data.initialHeigt,
      rezizers: data.rezizers,
      //on: this.$attrs,
    },
    childs
    /*[
      h(
        data.type,
        {
          class: finalclass,
        },
        childs
      ),
    ]*/
  );

  return result;
};
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
    let element = getTree(this.componentData);
    return element;
  },
};
</script>
