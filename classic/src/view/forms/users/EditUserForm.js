/**
 * Created by noire on 1/13/17.
 */
Ext.define('Dashboard.view.forms.users.EditUserForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'Dashboard.store.Users'
    ],

    alias: 'widget.edituserform',

    controller: 'users',

    bodyPadding: 30,
    modal: true,
    closable: false,

    defaultType: 'textfield',
    items: [
        { xtype: 'numberfield', name:'userid', fieldLabel:'User ID', readOnly: true},
        { xtype: 'numberfield', name:'cardid', fieldLabel:'Card ID', readOnly: true, allowNegative: false, allowBlank: false, minValue: 1 },
        { fieldLabel: 'Emri', name: 'name' },
        { fieldLabel: 'Surname',  name: 'surname' }
    ],

    bbar: [{ xtype: 'button', text: 'Fshij', iconCls: 'remove-icon', iconAlign: 'right', action: 'removeUser' },
        '->', { xtype: 'button', text: 'Ruaj', action: 'updateUser', iconCls: 'save-icon', iconAlign: 'right' },
        { xtype: 'button', text: 'Mbyll', action: 'close', iconCls: 'exit-icon', iconAlign: 'right' }
    ]
});