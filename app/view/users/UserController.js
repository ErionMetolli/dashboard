/**
 * Created by noire on 1/12/17.
 */
Ext.define('Dashboard.view.users.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.users',

    control:{
        'button[action=addUserForm]': {
            click: 'addUserForm'
        },

        'grid[action=usersGrid]': {
            itemdblclick: 'editUser'
        },

        'textfield[action=searchUser]':{
            change: 'searchUser'
        },

        'button[action=addUser]': {
            click: 'addUser'
        },

        'button[action=updateUser]': {
            click: 'updateUser'
        },

        'button[action=removeUser]': {
            click: 'removeUser'
        },

        'button[action=close]': {
            click: 'close'
        }
    },

    addUser: function() {
        var form = this.getView().getForm();
        var window = this.getView().up('window');
        var store = Ext.ComponentQuery.query('usersGrid')[0].getStore();

        if(form.isValid())
        {
            form.submit({
                url: 'database/API.php',
                params : {cmd : 'addUser' },
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

    editUser: function() {
        var form = Ext.create('Dashboard.view.forms.users.EditUserForm');

        form.getForm().setValues(this.getView().getSelectionModel().getSelection()[0].data);

        var win = Ext.create('Ext.window.Window', {
            title: 'Ndrysho klientin',
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

    addUserForm: function() {
        var form = Ext.create('Dashboard.view.forms.users.AddUserForm');

        var win = Ext.create('Ext.window.Window', {
            title: 'Shto nje perdorues',
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

    searchUser: function(newValue, oldValue, eOpts) {
        var store = this.getView().store;

        store.proxy.extraParams = {
            'searchUser': oldValue
        };
        store.currentPage = 1;
        store.load();
    },

    updateUser: function(){
        var form = this.getView().getForm();
        var window = this.getView().up('window');
        // var store = Ext.getCmp('logsGrid').getStore(); // by id
        var store = Ext.ComponentQuery.query('usersGrid')[0].getStore();

        if(form.isValid())
        {
            form.submit({
                url: 'database/API.php',
                params : {cmd : 'editUser'},
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

    removeUser: function() {
        var form = this.getView().getForm();
        var window = this.getView().up('window');
        var store = Ext.ComponentQuery.query('usersGrid')[0].getStore();

        Ext.Msg.show({
            title: 'Konfirmoni?',
            message: 'A jeni te sigurte qe deshironi ta fshini kete klient?\nTe gjitha hyrjet e tij do te fshihen!',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            fn: function(btn) {
                if (btn === 'yes') {
                    form.submit({
                        url: 'database/API.php',
                        params : {cmd : 'removeUser'},
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

    close: function(){
        this.getView().up('window').close();
    }
});