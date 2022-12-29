<template>
    <button :class="styleClass" class="button">
        <slot/>
    </button>
</template>

<script>
export const TYPE = {
    FILL: 'fill',
    STROKE: 'stroke',
}
export default {
    props: {
        stye: {
            type: String,
            default: TYPE.FILL
        }
    },
    computed:{
        styleClass(){
            return [
                'button-' + this.stye
            ]
        }
    }

}
</script>

<style scoped lang="scss">
@import '../../../public/css/variables.scss';
.button{
    padding: 5px;
    border-radius: 5px;
}

.button-{
    &fill{
        background-color: $accent-color-accent-10;
    }
    &stroke{
        border: 1px solid $accent-color-accent-10;
    }
}

</style>