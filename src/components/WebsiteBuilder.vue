<template>
  <div>
    <div 
      class='drop-zone'
      @drop="onDrop($event, 1)"
      @dragenter.prevent
      @dragover.prevent>
        <div 
          v-for='item in getList(1)' 
          :key='item.title' 
          class='drag-el' 
          draggable="true"
          @dragstart="startDrag($event, item)">
          {{ item.title }}
        </div>
    </div>
    <div 
      class='drop-zone'
      @drop="onDrop($event, 2)"
      @dragenter.prevent
      @dragover.prevent>
        <div v-for='item in getList(2)' 
          :key='item.title' 
          class='drag-el' 
          draggable="true"
          @dragstart="startDrag($event, item)">
          {{ item.title }}
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
    setup() {
        const items = ref([
            { id: 0, title: 'Item A', list: 1 },
            { id: 1, title: 'Item B', list: 1 },
            { id: 2, title: 'Item C', list: 2 }
        ])

        const getList = (list) => {
            return items.value.filter((item) => item.list == list)
        }

        const startDrag = (event, item) =>{
          console.log(item)
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData('itemId', item.id);
        }

        const onDrop = (evt, list) => {
            const itemID = evt.dataTransfer.getData('itemID');
            const item = items.value.find((item) => item.id == itemID);
            item.list = list
        }

        return {
            getList,
            startDrag,
            onDrop
        }
    },
}
</script>


<style scoped>
  .drop-zone {
     width: 50%;
    margin: 50px auto;
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
    min-height: 15px;
  }

  .drag-el {
    background-color: greenyellow;
    margin-bottom: 10px;
    padding: 5px;
  }
  .drag-el:nth-last-of-type(1){
      margin-bottom: 0px;
  }
  
</style>