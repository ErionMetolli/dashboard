/**
 * Created by noire on 1/12/17.
 */
Ext.define('Dashboard.view.forms.logs.AddLogForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'Dashboard.store.Users'
    ],

    alias: 'widget.addLogForm',

    controller: 'logs',

    modal: true,
    bodyPadding: 30,

    items: [
        { xtype: 'combobox', fieldLabel: 'Emri', store: { type: 'users' }, displayField: 'full_name', valueField: 'userid', name: 'userid', forceSelection: true, autoSelectLast: true },
        { xtype: 'textfield', fieldLabel: 'Pershkrimi', name: 'description', allowBlank: false },
        { xtype: 'datefield', fieldLabel: 'Data e hyrjes', name: 'startdate', allowBlank: false },
        { xtype: 'datefield', fieldLabel: 'Data e mbarimit', name: 'enddate' },
        { xtype: 'combobox', fieldLabel: 'Statusi', store: { type: 'status' }, displayField: 'status', valueField: 'statusid', name: 'statusid', forceSelection: true }
    ],

    bbar: ['->',
        { xtype: 'button', text: 'Ruaj', action: 'addLog', iconCls: 'save-icon', iconAlign: 'right' },
        { xtype: 'button', text: 'Mbyll', action: 'close', iconCls: 'exit-icon', iconAlign: 'right' }
    ]
});