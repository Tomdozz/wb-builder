<script>
import BaseComp from '../editor-components/BaseComp.vue'
export default {
    props:{
        component: {
            type: void 0
        }
    },
  
    render(createElement){
        console.log(this.component)
        let elem = createElement(BaseComp, {},[
            createElement(this.component.type, {}, this.component.name)]
        );
        return elem;
    }
}
</script>