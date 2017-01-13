/**
 * Created by noire on 1/12/17.
 */
Ext.define('Dashboard.model.Users', {
    extend: 'Ext.data.Model',

    alias: 'model.users',

    fields: [{
        name: 'userid',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'surname',
        type: 'string'
    }, {
        name: 'full_name',
        type: 'string'
    }]
});