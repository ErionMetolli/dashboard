/**
 * Created by noire on 1/8/17.
 */
Ext.define('Dashboard.view.LogController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Dashboard.view.users.UsersGrid',
        'Dashboard.view.forms.logs.AddLogForm',
        'Dashboard.view.forms.logs.EditLogForm'
    ],

    control: {
        'grid[action=logsGrid]': {
            itemdblclick: 'editLog'
        },

        'button[action=addLogForm]': {
            click: 'addLogForm'
        },

        'textfield[action=searchLog]': {
            change: 'searchLog'
        },

        'button[action=removeLog]': {
            click: 'removeLog'
        },

        'button[action=updateLog]': {
            click: 'updateLog'
        },

        'button[action=addLog]': {
            click: 'addLog'
        },

        'button[action=usersGrid]': {
            click: 'openUsersGrid'
        },

        'button[action=close]': {
            click: 'close'
        }
    },

    alias: 'controller.logs',

    editLog: function()
    {
        var form = Ext.create('Dashboard.view.forms.logs.EditLogForm');

        form.getForm().setValues(this.getView().getSelectionModel().getSelection()[0].data);

        var win = Ext.create('Ext.window.Window', {
            title: 'Ndrysho hyrjen',
            layout: 'fit',
            resizable: false,
            maximizable: false,
            closable: false,
            modal: true,
            border: false,
            items: form
        });
        win.show();
    },

    addLogForm: function(){
        var form = Ext.create('Dashboard.view.forms.logs.AddLogForm');

        var win = Ext.create('Ext.window.Window', {
            title: 'Shto nje hyrje',
            layout: 'fit',
            resizable: false,
            maximizable: false,
            closable: false,
            modal: true,
            border: false,
            items: form
        });
        win.show();
    },

    addLog: function(){
        var form = this.getView().getForm();
        var window = this.getView().up('window');
        // var store = Ext.getCmp('logsGrid').getStore(); by id
        var store = Ext.ComponentQuery.query('logsGrid')[0].getStore();

        if(form.isValid())
        {
            form.submit({
                url: 'database/API.php',
                params : {cmd : 'addLog'},
                success: function(form, action) {
                    Ext.Msg.alert('Sukses', action.result.message);
                    window.close();
                    store.reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Deshtim', action.result ? action.result.message : 'Ska pergjigje.');
                }
            });
        }else{
            Ext.Msg.alert('Gabim', 'Ju lutem plotesoni te gjitha fushat me vlerat e duhura.');
        }
    },

    searchLog: function(newValue, oldValue, eOpts){
        var store = this.getView().store;

        store.proxy.extraParams = {
            'search': oldValue
        };
        store.currentPage = 1;
        store.load();
    },

    removeLog: function() {
        var form = this.getView().getForm();
        var window = this.getView().up('window');
        var store = Ext.ComponentQuery.query('logsGrid')[0].getStore();

        Ext.Msg.show({
            title: 'Konfirmoni?',
            message: 'A jeni te sigurte qe deshironi ta fshini kete hyrje?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    form.submit({
                        url: 'database/API.php',
                        params : {cmd : 'removeLog'},
                        success: function(form, action) {
                            Ext.Msg.alert('Sukses', action.result.message);
                            window.close();
                            store.reload();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Deshtim', action.result ? action.result.message : 'Ska pergjigje.');
                        }
                    });
                } else if (btn === 'no') {}
            }
        });
    },
    updateLog: function(){
        var form = this.getView().getForm();
        var window = this.getView().up('window');
        // var store = Ext.getCmp('logsGrid').getStore(); // by id
        var store = Ext.ComponentQuery.query('logsGrid')[0].getStore();

        if(form.isValid())
        {
            form.submit({
                url: 'database/API.php',
                params : {cmd : 'editLog'},
                success: function(form, action) {
                    Ext.Msg.alert('Sukses', action.result.message);
                    window.close();
                    store.reload();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Deshtim', action.result ? action.result.message : 'Ska pergjigje.');
                }
            });
        }else{
            Ext.Msg.alert('Gabim', 'Ju lutem plotesoni te gjitha fushat me vlerat e duhura.');
        }
    },

    openUsersGrid: function(){
        var form = Ext.create('Dashboard.view.users.UsersGrid');

        var win = Ext.create('Ext.window.Window', {
            title: 'Perdoruesit',
            layout: 'fit',
            resizable: false,
            maximizable: false,
            modal: true,
            border: false,
            closable: false,
            width: 400,
            height: 500,
            items: form
        });
        win.show();
    },

    close: function(){
        this.getView().up('window').close();
    }
});