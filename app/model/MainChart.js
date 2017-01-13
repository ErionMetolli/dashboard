/**
 * Created by noire on 1/7/17.
 */
Ext.define('Dashboard.model.MainChart', {
    extend: 'Ext.data.Model',

    alias: 'model.mainchart',

    fields: [{
        name: 'allowed',
        type: 'int'
    }, {
        name: 'rejected',
        type: 'int'
    },{
        name: 'date',
        type: 'string'
    }]
});