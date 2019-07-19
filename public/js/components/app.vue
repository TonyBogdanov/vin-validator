<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">

                <br />
                <h1 class="text-center">VIN Validator</h1>
                <br />

                <input type="text"
                       class="input form-control form-control-lg"
                       placeholder="VIN Number"
                       maxlength="17"
                       v-model="value" />

                <pre class="vin">
                    <div class="wmi" title="World Manufacturer Identifier">{{ wmi }}</div>
                    <div class="vds" title="Vehicle Descriptor Section">{{ vds }}</div>
                    <div class="vis" title="Vehicle Identifier Section">{{ vis }}</div>
                </pre>

                <alert type="danger" :show="! inputEmpty && ! inputValid">
                    VIN numbers must be exactly 17 characters long.
                </alert>

                <alert type="warning" :show="inputFiltered">
                    A non-standard character (standard are A-Z and 0-9) was detected in the input and has been
                    transformed or removed.
                </alert>

                <br />
                <p>Validations:</p>

                <ul class="list-group">
                    <rule :validate="! inputEmpty && inputValid" :validator="validate_4and5Characters">
                        Symbols 4 &amp; 5 must be characters.
                    </rule>
                    <rule :validate="! inputEmpty && inputValid" :validator="validate_6and7Numeric">
                        Symbols 6 &amp; 7 must be numeric.
                    </rule>
                    <rule :validate="! inputEmpty && inputValid" :validator="validate_13through17Numeric">
                        Symbols 13 through 17 must be numeric.
                    </rule>
                    <rule :validate="! inputEmpty && inputValid" :validator="validate_noIOQ">
                        VIN should not include I, O or Q.
                    </rule>
                    <rule :validate="! inputEmpty && inputValid" :validator="validate_yearNoUZ0">
                        Model year (symbol 10) should not be U, Z or 0.
                    </rule>
                </ul>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../../.bin/node_modules/bootstrap/scss/bootstrap";

    .input {
        position: relative;
        margin: 0 0 0.5rem;
        z-index: 1000;
    }

    .vin {
        display: flex;
        width: 17rem;
        height: 1.5rem;
        font-size: 1rem;
        line-height: 1.5rem;
        letter-spacing: 0.4rem;
        margin: 0 auto 1rem auto;
        border-radius: 2px;
        overflow: hidden;

        .wmi,
        .vds,
        .vis {
            padding-left: 0.3rem;
        }

        .wmi {
            width: ( ( 3 / 17 ) * 100% );
            background: #ffbbf3;
        }

        .vds {
            width: ( ( 6 / 17 ) * 100% );
            background: #fde4bb;
        }

        .vis {
            width: ( ( 8 / 17 ) * 100% );
            background: #d4eccd;
        }
    }
</style>

<script>
    export default {

        data() {

            return {

                value: '',
                inputFiltered: false,
                inputFilteredTimeout: null,

            };

        },

        computed: {

            input() {

                return this.value.trim().toUpperCase().replace( /[^A-Z0-9]+/g, '' );

            },

            inputEmpty() {

                return 0 === this.input.length;

            },

            inputValid() {

                return 17 === this.input.length;

            },

            wmi() {

                return this.input.substr( 0, 3 );

            },

            vds() {

                return this.input.substr( 3, 6 );

            },

            vis() {

                return this.input.substr( 9 );

            },

            year() {

                return this.input.substr( 9, 1 );

            },

        },

        watch: {

            value( value ) {

                if ( value !== this.input ) {

                    this.inputFiltered = true;
                    this.value = this.input;

                }

            },

            inputFiltered() {

                clearTimeout( this.inputFilteredTimeout );
                this.inputFilteredTimeout = setTimeout( () => this.inputFiltered = false, 5000 );

            },

        },

        methods: {

            isNumeric( value ) {

                return null !== value.match( /^[0-9]$/ );

            },

            isCharacter( value ) {

                return null !== value.match( /^[A-Z]$/ );

            },

            validate_4and5Characters() {

                return (
                    this.isCharacter( this.input.substr( 3, 1 ) ) &&
                    this.isCharacter( this.input.substr( 4, 1 ) )
                );

            },

            validate_6and7Numeric() {

                return (
                    this.isNumeric( this.input.substr( 5, 1 ) ) &&
                    this.isNumeric( this.input.substr( 6, 1 ) )
                );

            },

            validate_13through17Numeric() {

                return (
                    this.isNumeric( this.input.substr( 12, 1 ) ) &&
                    this.isNumeric( this.input.substr( 13, 1 ) ) &&
                    this.isNumeric( this.input.substr( 14, 1 ) ) &&
                    this.isNumeric( this.input.substr( 15, 1 ) ) &&
                    this.isNumeric( this.input.substr( 16, 1 ) )
                );

            },

            validate_noIOQ() {

                return null === this.input.match( /[IOQ]/ );

            },

            validate_yearNoUZ0() {

                return null === this.year.match( /[UZ0]/ );

            },

        },

    };
</script>
