<template>
<div class="main-editor">
    <div
      class='drop-zone'
      ref="container"
      @drop="onDrop($event)"
      @dragenter.prevent
      @dragover.prevent>
    </div>
    </div>
</template>
<script>
import basicElements from '../../assets/components/basicComponents.js'
import CompEl from '../editor-components/CompEl.vue'
import Vue from 'vue'

export default {
    methods: {
        onDrop(event){
            console.log(event)
            const componentId = event.dataTransfer.getData('componentId');
            const component = basicElements.find((item) => item.id == componentId);
            var ComponentClass = Vue.extend(CompEl);
            var mainInstance;

            /*var dropzonePostion = event.target.position();
            var elementPosition = event.relatedTarget.position();
            let x = elementPosition.left - dropzonePostion.left;
            let y = elementPosition.top - dropzonePostion.top;*/
            const dropElementY = event.y;

            const compTables = dropzone.querySelectorAll('.actual-comp');

            if (compTables.length >= 1) {
                for (i = 0; i < compTables.length; i++) {

                    //loop through each element we added, defining a Y1 
                    //(top half of the element) and Y2 max height of the element.
                    const compTablesY1 =
                        compTables[i].getBoundingClientRect().y +
                        compTables[i].getBoundingClientRect().height / 2;
                    const compTablesY2 =
                        compTables[i].getBoundingClientRect().y +
                        compTables[i].getBoundingClientRect().height;

                     if (dropElementY <= compTablesY1) {
                        compTables[i].parentNode.insertBefore(clone, compTables[i]);
                        break;
                    }
                    
                }
            // code
            } else {
                // No tables yet
                //appendchild...
            }


            if (component.component_description){
                mainInstance = new ComponentClass({
                    propsData: { 
                        styles: component.component_description.styles,
                        classes: component.component_description.class,
                        width:  component.component_description.width,
                        height: component.component_description.minHight,
                        posX: event.offsetX.toString(),
                        posY: event.offsetY.toString(),

                        //minHeight: component.component_description.minHight,

                    }
                });
            } else {
                mainInstance = new ComponentClass();
            }

            mainInstance.$mount() // pass nothing
            this.$refs.container.appendChild(mainInstance.$el)

            if (component.childs){
                var childInstance;

                component.childs.forEach(element => {

                    if (element.component_description){
                        childInstance = new ComponentClass({
                            propsData: { 
                                styles: element.component_description.styles,
                                classes: element.component_description.class,
                                width:  element.component_description.width,
                                height: element.component_description.minHight,
                                minHeight: element.component_description.minHight, 
                            }
                        });
                    } else {
                        childInstance = new ComponentClass();
                    }

                    childInstance.$mount() // pass nothing
                    mainInstance.$refs.container.appendChild(childInstance.$el)
                });
            }
        }
    },
}
</script>

<style scoped>
.main-editor {
    width: 80%;
    height: 900px;
}
.drop-zone{
    height: 98%;
    width: 98%;
    margin: 10px auto;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px #ccc;
}
</style>