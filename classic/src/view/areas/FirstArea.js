/**
 * Created by Erion on 06-Jan-17.
 */
Ext.define('Dashboard.view.areas.FirstArea', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Dashboard.view.panels.Logs',
        'Dashboard.view.panels.MainChart'
    ],

    alias: 'widget.firstarea',

    header: false,
    frame: false,

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    items: [
        {
            xtype: 'mainchart',
            flex:1.5
        }, {
            xtype: 'logsGrid',
            flex: 3
        }
    ]
});