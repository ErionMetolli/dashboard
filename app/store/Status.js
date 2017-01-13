/**
 * Created by noire on 1/11/17.
 */
Ext.define('Dashboard.store.Status', {
    extend: 'Ext.data.Store',

    alias: 'store.status',

    fields: [
        {
            name: 'statusid',
            type: 'int'
        },
        {
            name: 'status',
            type: 'string'
        }
    ],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'database/API.php?cmd=getStatus',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }

});