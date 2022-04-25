<template>
    <div
        :style="computedStyle"
        :class="classes"
        class="drop-el"
        ref="container">
    </div>
</template>

<script>
export default {
    props: {
        styles: {
            type: void 0
        },
        classes: {
            type: String
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
        minHeight: {
            type: String
        },
        posX: {
            type: String
        },
        posY: {
            type: String
        }
    },
    computed:{
        computedStyle(){
            console.log('pos X is: ' + this.posX)
            console.log('pos Y is: ' + this.posY)
            console.log({
                height: this.minHeight,
                width: this.width,
                top: this.posY + 'px',
                left: this.posX + 'px'
            })
            return {
                height: this.minHeight,
                width: this.width,
                top: this.posY + 'px',
                left: this.posX + 'px'
            };
        },
        classData(){
            return this.classes
        }
    },
}
</script>

<style scoped>
.columns{
    display: flex;
}
div{
    border: 1px dotted black;
    padding: 3px;
    position: relative;
}
</style>
