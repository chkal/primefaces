/**
 * PrimeFaces Dialog Widget
 */
PrimeFaces.widget.Dialog = function(id, cfg) {
    this.id = id;
    this.cfg = cfg;
    this.jqId = PrimeFaces.escapeClientId(id);
    this.jq = jQuery(this.jqId);
    var _self = this;

    //Remove scripts to prevent duplicate widget issues
    this.jq.find("script").remove();

    //Create the dialog
    this.jq.dialog(this.cfg);

    //Close handler
    this.jq.bind('dialogclose', function(event, ui) {_self.onHide(event, ui);});

    //Open handler
    this.jq.bind('dialogopen', function(event, ui) {_self.onShow(event, ui);});

    //Hide close icon if dialog is not closable
    if(this.cfg.closable == false) {
        this.jq.parent().find('.ui-dialog-titlebar-close').hide();
    }

    //Id reset and dom location
    this.jq.removeAttr('id').parent().attr('id', this.id);

    if(this.cfg.appendToBody) {
        this.jq.parent().appendTo(document.body);
    }
}

PrimeFaces.widget.Dialog.prototype.show = function() {
    this.jq.dialog('open');
}

PrimeFaces.widget.Dialog.prototype.hide = function() {
    this.jq.dialog('close');
}

/**
 * Invokes user provided callback
 */
PrimeFaces.widget.Dialog.prototype.onShow = function(event, ui) {
    if(this.cfg.onShow) {
        this.cfg.onShow.call(this, event, ui);
    }
}

/**
 * Fires an ajax request to invoke a closeListener passing a CloseEvent
 */
PrimeFaces.widget.Dialog.prototype.onHide = function(event, ui) {

    if(this.cfg.onHide) {
        this.cfg.onHide.call(this, event, ui);
    }

    if(this.cfg.ajaxClose) {
        var options = {
            source: this.id,
            process: this.id
        }

        if(this.cfg.onCloseUpdate) {
            options.update = this.cfg.onCloseUpdate;
        }

        var params = {};
        params[this.id + "_ajaxClose"] = true;

        PrimeFaces.ajax.AjaxRequest(this.cfg.url, options, params);
    }
}