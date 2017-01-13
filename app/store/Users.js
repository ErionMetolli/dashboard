/**
 * Created by noire on 1/12/17.
 */
Ext.define('Dashboard.store.Users', {
    extend: 'Ext.data.Store',

    requires: [
        'Dashboard.model.Users'
    ],

    alias: 'store.users',

    viewModel: 'users',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'database/API.php?cmd=getUsers',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }

});