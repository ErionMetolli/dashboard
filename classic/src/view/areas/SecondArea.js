/**
 * Created by Erion on 06-Jan-17.
 */
Ext.define('Dashboard.view.areas.SecondArea', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Dashboard.view.panels.FirstPie',
        'Dashboard.view.panels.DailyStats'
    ],

    alias: 'widget.secondarea',

    // title: 'Të dhënat ditore',

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    items: [{
        xtype: 'firstpie',
        flex: 1
    },{
        xtype: 'dailystats',
        flex: 0.2
    }]
});