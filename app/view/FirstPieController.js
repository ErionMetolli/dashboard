/**
 * Created by noire on 1/8/17.
 */
Ext.define('Dashboard.view.FirstPieController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.firstpie',

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('label') + ': ' + (record.get('value')));
    }

});