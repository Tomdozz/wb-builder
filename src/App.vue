<template>
  <div id="app">
    
    <the-header title="Eiron"/>
    <div class="editor-layout">
      <!--<main-editor/>-->
      <main-area></main-area>
      <component-menu/>
        <!--<website-builder/>-->
        
    </div>

  </div>
</template>

<script>
import ComponentMenu from './components/layouts/ComponentMenu.vue'
//import MainEditor from './components/layouts/MainEditor.vue'
import TheHeader from './components/layouts/Header.vue'
import MainArea from './components/layouts/MainArea.vue'

export default {
  name: 'App',
  components: {
    ComponentMenu,
    //MainEditor,
    TheHeader,
    MainArea
  }
}
</script>

<style>
.editor-layout{
  display: flex;
}
body{
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(224, 224, 224);

}
</style>
