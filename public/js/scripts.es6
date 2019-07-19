import Vue from 'vue/dist/vue.esm';

function resolveName( path ) {

    return path
        .replace( /^\.\//, '' )
        .replace( /\.[a-z0-9]+$/i, '' )
        .replace( /\//g, '-' )
        .toLowerCase();

}

function registerComponents( context, type ) {

    context.keys().forEach( path => Vue[ type ]( resolveName( path ), context( path ).default ) );

}

window.addEventListener( 'DOMContentLoaded', () => {

    registerComponents( require.context( './components', true, /\.vue$/ ), 'component' );
    window.root = new Vue( { el: '#root' } );

} );
