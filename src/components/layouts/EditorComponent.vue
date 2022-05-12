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
    let childs = [];

    console.log(this.componentData.childs);
    if (this.componentData.childs) {
      this.componentData.childs.forEach((element) => {
        let c = createElement(
          BaseComp,
          {
            props: {
              initialHeigt: element.pops.minHight,
              id: element.uid,
              isActive: element.active,
            },
          },
          [createElement(element.type, {}, element.name)]
        );
        childs.push(c);
        console.log(childs);
      });
    }

    let elem = createElement(
      BaseComp,
      {
        props: {
          initialHeigt: this.componentData.pops.minHight,
          id: this.componentData.uid,
          isActive: this.componentData.active,
        },
      },
      [createElement(this.componentData.type, {}, childs)]
    );
    return elem;
  },
};
</script>
