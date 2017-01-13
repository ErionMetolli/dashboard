/**
* Created by Erion on 06-Jan-17.
*/
Ext.define('Dashboard.model.Logs', {
    extend: 'Ext.data.Model',

    alias: 'model.logs',

    fields: [{
        name: 'ID',
        type: 'int'
    }, {
        name: 'Emri',
        type: 'string'
    }, {
        name: 'Përshkrimi',
        type: 'string'
    }, {
        name: 'Hyrja',
        type: 'string'
    }, {
        name: 'Dalja',
        type: 'string'
    }, {
        name: 'Statusi',
        type: 'string'
    }]
});