<script>
import BaseComp from "../editor-components/BaseComp.vue";
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
  render(createElement) {
    console.log(this.componentData.active);
    let elem = createElement(
      BaseComp,
      {
        props: {
          initialHeigt: this.componentData.pops.minHight,
          id: this.componentData.uid,
          isActive: this.componentData.active,
        },
      },
      [createElement(this.componentData.type, {}, this.componentData.name)]
    );
    return elem;
  },
};
</script>
