<template>
    <div
        :style="computedStyle"
        :class="classes"
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
        }
    },
    computed:{
        computedStyle(){
            return {
                height: this.minHeight,
                width: this.width
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
}
</style>
