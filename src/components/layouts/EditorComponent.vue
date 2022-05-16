<script>
import BaseComp from "../editor-components/BaseComp.vue";
import { h } from 'vue'

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

    console.log(this.componentData.childs);
    if (this.componentData.childs) {
      this.componentData.childs.forEach((element) => {
        let c = h(
          BaseComp,
           {
              initialHeigt: element.pops.minHight,
              id: element.uid,
              isActive: element.active,
          },
          [h(element.type, {}, element.name)]
        );
        childs.push(c);
        console.log(childs);
      });
    }

    let elem = h(
      BaseComp,
      {
          initialHeigt: this.componentData.pops.minHight,
          id: this.componentData.uid,
          isActive: this.componentData.active,
      },
      [h(this.componentData.type, {}, childs)]
    );
    return elem;
  },
};
</script>
