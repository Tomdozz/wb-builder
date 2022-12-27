<template>
    <div class="content-card-wrapper">
        <div @click="toggleCollapsed" class="card-title">
            <i class="icon fa-solid" :class="isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
            <slot name="title"/>
        </div>
        <transition name="collapse">
            <div class="collapsed" v-if="!isCollapsed">
                <div>
                    <slot name="actions"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return{
            isCollapsed: this.collapsed
        }
    },
    props:{
        collapsed: {
            type: Boolean
        }
    },
    methods: {
        toggleCollapsed(){
            this.isCollapsed = !this.isCollapsed
            this.$emit('update', {alue: this.isCollapsed})
        }
    }
}
</script>

<style scoped>
.content-card-wrapper {
    /*margin-bottom: 10px;*/
    box-shadow: 0 1px 4px 1px #edeeee;
    border-radius: 10px;
    padding: 5px;
    background-color: rgb(255, 255, 255);

}
.card-title{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.icon{
    padding-right: 5px;
    padding-left: 5px;
}
.collapsed{
  padding: 10px;
}

.collapse-enter-active {
  transition: all .8s ease-in;
}

.collapse-leave-active {
  transition: all .3s cubic-bezier(0, 1, .5, 1);
}

.collapse-enter-to,
.collapse-leave {
  overflow: hidden;
  max-height: 999px;
}

.collapse-enter,
.collapse-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>