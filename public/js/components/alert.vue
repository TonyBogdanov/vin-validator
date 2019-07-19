<template>
    <div :class="[ 'alert-wrapper', { 'show': show } ]">
        <div ref="alert" :class="[ 'alert alert-' + type ]" role="alert">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
    .alert-wrapper {
        display: block;
        width: 100%;
        height: 0;
        overflow: hidden;
        margin: 0;
        transition: height 0.25s ease-in-out, margin 0.25s ease-in-out;

        &.show {
            margin: 0 0 0.5rem;
        }

        .alert {
            font-size: 14px;
            padding: 0.5rem 1rem;
        }
    }
</style>

<script>
    export default {

        props: {

            type: String,
            show: { type: Boolean, default: false },

        },

        watch: {

            show( value ) {

                this.$el.style.height = ( value ? this.$refs.alert.offsetHeight : 0 ) + 'px';

            },

        },

    };
</script>
