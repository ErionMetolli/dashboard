/**
 * Created by noire on 1/8/17.
 */
Ext.define('Dashboard.store.FirstPie', {
    extend: 'Ext.data.Store',
    alias: 'store.firstpie',

    fields: [ 'label', 'value' ],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'database/API.php?cmd=piedailystats',
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success',
            messageProperty: 'message'
        }
    },

    listeners: {
        load: 'autoreload'
    },

    autoreload: function(){
        //console.log("reloaded");
        var store = this;
        setTimeout(function() {
            store.reload();
        }, 5000); // Reload every x milliseconds
    }
});