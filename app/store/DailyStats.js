/**
 * Created by noire on 1/9/17.
 */
Ext.define('Dashboard.store.DailyStats', {
    extend: 'Ext.data.Store',

    alias: 'store.dailystats',

    fields: [ 'label', 'value' ],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'database/API.php?cmd=dailystats',
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