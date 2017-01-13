/**
 * Created by noire on 1/13/17.
 */
Ext.define('Dashboard.view.forms.users.AddUserForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'Dashboard.store.Users'
    ],

    alias: 'widget.addUserForm',

    controller: 'users',

    bodyPadding: 30,
    modal: true,
    closable: false,

    items: [
        { xtype: 'numberfield', name:'cardid', fieldLabel:'Card ID', allowBlank: false },
        { xtype: 'textfield', fieldLabel: 'Emri', name: 'name', allowBlank: false },
        { xtype: 'textfield', fieldLabel: 'Mbiemri',  name: 'surname', allowBlank: false }
    ],

    bbar: ['->',
        { xtype: 'button', text: 'Ruaj', action: 'addUser', iconCls: 'save-icon', iconAlign: 'right' },
        { xtype: 'button', text: 'Mbyll', action: 'close', iconCls: 'exit-icon', iconAlign: 'right' }
    ]
});