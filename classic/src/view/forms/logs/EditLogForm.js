/**
 * Created by noire on 1/11/17.
 */
Ext.define('Dashboard.view.forms.logs.EditLogForm', {
    extend: 'Ext.form.Panel',

    alias: 'widget.logform',

    requires: [
        'Dashboard.store.Status'
    ],

    controller: 'logs',

    bodyPadding: 30,
    modal: true,
    closable: false,
    defaultType: 'textfield',

    items: [
        {name:'entryid', hidden: true },
        { xtype: 'numberfield', fieldLabel: 'ID', name: 'userid', hidden:true, readOnly: true },
        { fieldLabel: 'Emri', name: 'name', readOnly: true },
        { xtype:'textarea', fieldLabel: 'Pershkrimi',  name: 'description' },
        // { xtype:'numberfield', fieldLabel: 'H', labelAlign: 'right' },
        // { xtype:'numberfield', fieldLabel: 'M', labelAlign: 'right' },
        { fieldLabel: 'Data e hyrjes', name: 'startdate', readOnly: true },
        { fieldLabel: 'Data e daljes', name: 'enddate', readOnly: true },
        { xtype: 'combobox', fieldLabel: 'Statusi', store: { type: 'status' }, displayField: 'status', valueField: 'status', name: 'status', forceSelection: true }
    ],

    bbar: [{ xtype: 'button', text: 'Fshij', iconCls: 'remove-icon', iconAlign: 'right', action: 'removeLog' },
        '->', { xtype: 'button', text: 'Ruaj', action: 'updateLog', iconCls: 'save-icon', iconAlign: 'right' },
        { xtype: 'button', text: 'Mbyll', action: 'close', iconCls: 'exit-icon', iconAlign: 'right' }
    ]
});