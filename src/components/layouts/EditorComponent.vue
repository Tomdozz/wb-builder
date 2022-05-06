<script>
import BaseComp from "../editor-components/BaseComp.vue";
export default {
  props: {
    component: {
      type: void 0,
    },
  },

  render(createElement) {
    let elem = createElement(
      BaseComp,
      {
        props: {
          height: this.component.pops.minHight,
        },
      },
      [createElement(this.component.type, {}, this.component.name)]
    );
    return elem;
  },
};
</script>
