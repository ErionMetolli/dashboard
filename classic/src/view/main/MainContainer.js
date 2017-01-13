/**
 * Created by Erion on 06-Jan-17.
 */
Ext.define('Dashboard.view.main.MainContainer', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.plugin.Viewport',

        'Dashboard.view.areas.FirstArea',
        'Dashboard.view.areas.SecondArea'
    ],

    layout: {
        type: 'hbox',
        align : 'stretch',
        pack  : 'start'
    },

    items: [
        {
            xtype: 'firstarea',
            flex:3
        }, {
            xtype: 'secondarea',
            flex: 1
        }
    ]
});