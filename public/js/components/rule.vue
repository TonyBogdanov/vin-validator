<template>
    <li :class="[ 'list-group-item', {
        'list-group-item-light': ! validate,
        'list-group-item-danger': validate && ! valid,
        'list-group-item-success': validate && valid,
    } ]">
        <span class="symbol check" v-if="validate && valid"></span>
        <span class="symbol error" v-if="validate && ! valid"></span>
        <span class="symbol pending" v-if="! validate"></span>
        <slot></slot>
    </li>
</template>

<style lang="scss">
    .list-group-item {
        position: relative;
        font-size: 14px;
        padding-left: 3rem;

        .symbol {
            display: block;
            position: absolute;
            top: 50%;
            left: 0.5rem;
            width: 2rem;
            height: 2rem;
            transform: translateY( -50% );

            &.check {
                &::before,
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 10%;
                    top: 65%;
                    left: 40%;
                    background: #155724;
                    transform-origin: 0 0;
                }

                &::before {
                    width: 50%;
                    transform: rotate( -45deg );
                }

                &::after {
                    width: 20%;
                    transform: rotate( -135deg );
                }
            }

            &.error {
                &::before,
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 10%;
                    width: 60%;
                    top: 50%;
                    left: 50%;
                    background: #721c24;
                }

                &::before {
                    transform: translate( -50%, -50% ) rotate( -45deg );
                }

                &::after {
                    transform: translate( -50%, -50% ) rotate( 45deg );
                }
            }

            &.pending {
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 10%;
                    width: 50%;
                    top: 50%;
                    left: 50%;
                    background: #ccc;
                    transform: translate( -50%, -50% );
                }
            }
        }
    }
</style>

<script>
    export default {

        props: {

            validate: Boolean,
            validator: Function,

        },

        data() {

            return {

                valid: false,

            };

        },

        watch: {

            validate: {

                immediate: true,
                handler( value ) {

                    if ( ! value ) {

                        return;

                    }

                    this.valid = this.validator();

                },

            },

        },

    };
</script>
