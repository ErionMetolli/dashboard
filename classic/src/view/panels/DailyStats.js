/**
 * Created by noire on 1/8/17.
 */
Ext.define('Dashboard.view.panels.DailyStats', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.dailystats',

    requires:[
        'Dashboard.store.DailyStats'
    ],

    store: {
        type: 'dailystats'
    },

    hideHeaders: true,
    columnLines: false,
    rowLines: false,

    columns: [
        {header: 'Label', autoSizeColumn: true, dataIndex: 'label'},
        {header: 'Value', flex: 1, dataIndex: 'value'}
    ],

    viewConfig: {
        listeners: {
            // resize columns with autoSizeColumn attribute true based on their length
            refresh: function(dataview) {
                Ext.each(dataview.panel.columns, function(column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                    })
                }
            },

            // Change row's CSS based on the label
            getRowClass: function(record) {
                if(record.get('label') == 'Janë ndalur')
                    return 'rejected-row';
                else if(record.get('label') == 'Aktivë tani')
                    return 'active-row';
                else if(record.get('label') == 'Kanë përfunduar')
                    return 'finished-row';
            },

        loadMask: false,
        stripeRows: false
    }
});