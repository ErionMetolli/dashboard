/**
 * Created by Erion on 06-Jan-17.
 */
Ext.define('Dashboard.store.Logs', {
    extend: 'Ext.data.Store',
    requires: [
        'Dashboard.model.Logs'
    ],

    alias: 'store.logs',

    viewModel: 'logs',

    autoLoad: true,
    pageSize: 20,

    proxy: {
        type: 'ajax',
        url: 'database/API.php?cmd=logs',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    },

    listeners: {
        load: 'autoreload'
    },

    autoreload: function(){
        var store = this;
        setTimeout(function() {
            store.reload();
        }, 5000); // Reload every x milliseconds
    }
});