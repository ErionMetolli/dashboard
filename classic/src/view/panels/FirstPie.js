/**
 * Created by noire on 1/8/17.
 */
Ext.define('Dashboard.view.panels.FirstPie', {
    extend: 'Ext.Panel',
    xtype: 'pie-basic',

    requires: [
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.interactions.ItemHighlight',

        'Dashboard.view.FirstPieController',
        'Dashboard.store.FirstPie',
        'Ext.chart.theme.DefaultGradients'
    ],

    controller: 'firstpie',

    alias: 'widget.firstpie',

    layout: 'fit',

    items: [{
        xtype: 'polar',
        reference: 'chart',
        theme: 'default-gradients',
        insetPadding: 10,
        innerPadding: 13,
        store: {
            type: 'firstpie'
        },
        // legend: {
        //     docked: 'bottom'
        // },
        interactions: ['rotate'],
        series: [{
            type: 'pie',
            angleField: 'value',
            label: {
                field: 'label',
                calloutLine: {
                    length: 30,
                    width: 3
                    // specifying 'color' is also possible here
                }
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    }]

});