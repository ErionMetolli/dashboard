/**
 * Created by noire on 1/7/17.
 */
Ext.define('Dashboard.store.MainChart', {
    extend: 'Ext.data.Store',

    requires: [
        'Dashboard.model.MainChart'
    ],

    alias: 'store.mainchart',

    viewModel: 'mainchart',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'database/API.php?cmd=mainchart',
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