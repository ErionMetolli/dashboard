/**
 * Created by noire on 1/12/17.
 */
Ext.define('Dashboard.view.users.UsersGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Dashboard.store.Users',
        'Dashboard.view.users.UserController'
    ],

    alias: 'widget.usersGrid',
    controller: 'users',

    layout: 'fit',

    action: 'usersGrid',

    selmodel: {
        mode: 'SINGLE'
    },

    store: {
        type: 'users'
    },

    tbar: [
        { xtype: 'button', text: 'Shto', iconCls: 'add-icon', iconAlign: 'right', action: 'addUserForm' },
        '->',{ xtype: 'textfield', fieldStyle : 'font-family: FontAwesome', emptyText: '\uF002 Kerko klientin', action: 'searchUser'}
    ],
    columns: [
        { header: 'User ID', autoSizeColumn: true, dataIndex: 'userid' },
        { header: 'Card ID', autoSizeColumn: true, dataIndex: 'cardid' },
        { header: 'Emri', flex: 1, dataIndex: 'name' },
        { header: 'Mbiemri', flex: 1, dataIndex: 'surname' }
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

        loadMask: false
    },

    bbar: ['->',
        { xtype: 'button', text: 'Mbyll', action: 'close', iconCls: 'exit-icon', iconAlign: 'right' }
    ]
});