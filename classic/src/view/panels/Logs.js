/**
 * Created by Erion on 06-Jan-17.
 */
Ext.define('Dashboard.view.panels.Logs', {
    extend: 'Ext.grid.Panel',

    requires:[
        'Dashboard.store.Logs',
        'Dashboard.view.LogController'
    ],
    alias: 'widget.logsGrid',

    action: 'logsGrid',

    controller: 'logs',

    border: false,

    selmodel: {
        mode: 'SINGLE'
    },

    store: {
        type: 'logs'
    },

    tbar: [
        { xtype: 'button', text: 'Shto', iconCls: 'add-icon', iconAlign: 'right', action: 'addLogForm' },
        '->',{ xtype: 'textfield', fieldStyle : 'font-family: FontAwesome', emptyText: '\uF002 Kerko sipas emrit', action: 'searchLog'},
        { xtype: 'button', text: 'Klientët', iconCls: 'customers-icon', iconAlign: 'right', action: 'usersGrid' }
    ],

    columns: [
        {dataIndex: 'entryid', hidden: true},
        {header: 'ID', autoSizeColumn: true, dataIndex: 'userid'},
        {header: 'Emri', autoSizeColumn: true, dataIndex: 'name'},
        {header: 'Përshkrimi', flex: 1, dataIndex: 'description'},
        {header: 'Hyrja', autoSizeColumn: true, dataIndex: 'startdate'},
        {header: 'Dalja', autoSizeColumn: true, dataIndex: 'enddate'},
        {header: 'Statusi', autoSizeColumn: true, dataIndex: 'status'}
    ],

    viewConfig: {
        listeners: {
            refresh: function(dataview) {
                Ext.each(dataview.panel.columns, function(column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                })
            }
        },
        // Change the CSS of the row based on the status
        getRowClass: function(record) {
            if(record.get('status') == 'Ndalohet')
                return 'rejected-row';
            else if(record.get('status') == 'Aktivë')
                return 'active-row';
            else if(record.get('status') == 'Përfunduar')
                return 'finished-row';
        },

        loadMask: false
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Duke shfaqur {0} deri {1} prej gjithsej {2} regjistrave',
        emptyMsg: "Nuk ka regjistra",
        beforePageText: 'Faqja',
        afterPageText: 'of {0}',
        firstText:'E Para',
        prevText:'Pas',
        nextText:'Para',
        lastText:'E Fundit',
        refreshText:'Rifresko'
    },

    initComponent:function(){ // if we use initConfig grid will autoresize based on the number of rows
        this.store = Ext.create('Dashboard.store.Logs');
        this.bbar.store = this.store;
        this.callParent();
    }

});