/**
 * Created by Erion on 06-Jan-17.
 */
Ext.define('Dashboard.view.panels.MainChart', {
    extend: 'Ext.chart.CartesianChart',

    requires: [
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Area',

        'Dashboard.store.MainChart'
    ],

    xtype: 'area-basic',

    alias: 'widget.mainchart',

    store: {
        type: 'mainchart'
    },

    interactions: {
        type: 'panzoom'
    },

    insetPadding: '10 20 10 10', // TOP RIGHT DOWN LEFT - default 10

    // legend: {
    //     docked: 'right'
    // },

    axes: [{
        type: 'numeric',
        position: 'left',
        grid: true,
        minimum: 0

    }, {
        type: 'category',
        position: 'bottom'
        // grid: true
    }],

    series: [
        {
            type: 'area',
            xField: 'date',
            yField: ['allowed'],
            subStyle: {
                stroke: 'rgb(0,204,0)',
                fill: 'rgba(0,204, 0,0.25)',
                'stroke-width': 3
            }
        }, {
            type: 'area',
            xField: 'date',
            yField: ['rejected'],
            subStyle: {
                stroke: 'rgb(204,0,0)',
                fill: 'rgba(204,0, 0,0.25)',
                'stroke-width': 3
            }
        }
    ]
});