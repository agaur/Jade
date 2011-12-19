/*
Options:
--------

options.target:::: target url to which data to be sent
options.type:::::: Elmenet type of editable area (text/text area)
options.onblur:::: submit/Cancel
options.submit:::: Submit button value, empty means no button
options.cancel:::: Cancel button value, empty means no button

 */

(function($) {

	$.widget("ui.inLineEditor", {

		// default options
		options : {
			type : "textBox",
			toolTip : "click to edit",
			event : "click",
			onblur : "save",
			paramName : "newContent"
		},
		_create : function() {

			var self = this, o = self.options, el = self.element;
			el.attr('title', this.options.toolTip);
			el.bind(o.event, function() {
				
				//TODO currently its saving the old ile div before starting new one but it should take in the value according to the onblur
				var Oldilediv = $("#ilediv");
				if(Oldilediv.length){
					saveData(Oldilediv.prev(),{newContent:$("#inPlaceEditor").val()},o.saveHandler);
				}
				var ilediv = "<div id='ilediv'>";

				if (o.type === "textArea") {
					ilediv = ilediv + "<textarea id='inPlaceEditor' >" + $(this).text() + "</textarea>";
				} else if (o.type === "select") {
					ilediv = ilediv + "<select id='inPlaceEditor'>";
					var data = o.data;
					for ( var key in data) {
						if (!data.hasOwnProperty(key)) {
							continue;
						}
						ilediv = ilediv + "<option value='" + key + "'>" + data[key] + "</option>";
					}
					ilediv = ilediv + "</select>";
				} else {
					ilediv = ilediv + "<input type='text' id='inPlaceEditor' value='" + $(this).text() + "'>";
				}

				if (o.submit != undefined) {
					ilediv = ilediv + "<input type='button' id='inlineEditSaveBtn' value='" + o.submit + "''/>";
				}

				if (o.cancel != undefined) {
					ilediv = ilediv + "<input type='button' id='inlineEditCancelBtn' value='" + o.cancel + "'/>";
				}
				if (o.remove != undefined){
					ilediv = ilediv + "<input type='button' id='inlineEditRemoveBtn' value='" + o.remove + "'/>";
				}

				ilediv = ilediv + "</div>";

				$(this).after(ilediv);
				$(this).css('display', 'none');
				$("#inPlaceEditor").focus();

				if (o.submit == undefined && o.cancel == undefined) {
					$('#inPlaceEditor').blur(function() {
						var newContent = $(this).val();
						switch (o.onblur) {
						case "save":
							saveData(el, {
								'target' : o.target,
								'newContent' : newContent,
								'paramName' : o.paramName
							});
							break;
						case "cancel":
							cancel(el);
							break;
						}
					});
				} else {
					if (o.submit !== undefined) {
						$('#inlineEditSaveBtn').click(function() {
							var newContent = $("#inPlaceEditor").val();
							saveData(el, {
								'target' : o.target,
								'newContent' : newContent,
								'paramName' : o.paramName
							},o.saveHandler);
						});
						$('#inlineEditSaveBtn').button();
					}

					if (o.cancel !== undefined) {
						$('#inlineEditCancelBtn').click(function() {
							cancel(el,o.cancelHandler);
						});
						$('#inlineEditCancelBtn').button();
					}
					if(o.remove !== undefined){
						$('#inlineEditRemoveBtn').click(function() {
							remove(el,o.removeHandler);
						});
						$('#inlineEditRemoveBtn').button();
					}
					
				}
			});

		},
		// Functions added to get and set the options 
		type: function(type){
	    	if(!type){
	    		return this.options.type;
	    	}
	    	else{
	    		if(_checkType(type)){
	    			this.options.type = type;
	    		}
	    		else{
	    			alert("Incorrect type");
	    		}
	    	}
	    },
	    toolTip:function(toolTip){
	    	if(!toolTip){
	    		return this.options.toolTip;
	    	}
	    	else{
	    		this.options.toolTip = toolTip;
	    		this.element.attr('title', this.options.toolTip);
	    	}
	    },
	    _checkType: function(){
	    	if(type ==="textBox" || type==="textArea" || type==="select"){
	    		return true;
	    	}
	    	else {
	    		return false;
	    	}
	    },
	    event: function(event){
	    	//TODO change the event if param event != null 
	    	return this.options.event;
	    },
	    saveHandler: function(cb){
	    	if(!cb){
	    		return this.options.saveHandler;
	    	}
	    	else{
	    		this.options.saveHandler = cb;
	    	}
	    },
	    removeHandler: function(cb){
	    	if(!cb){
	    		return this.options.removeHandler;
	    	}
	    	else{
	    		this.options.removeHandler = cb;
	    	}
	    }
	    
		
	});
})(jQuery);

function saveData(el, saveOpt, cb) {
	if (saveOpt.target == undefined) {
		$(el).next().remove();
		$(el).html(saveOpt.newContent);
		$(el).css('display', '');
	} else {
		$.ajax({
			type : "GET",
			url : saveOpt.target,
			data : saveOpt.paramName + "=" + saveOpt.newContent,
			success : function(msg) { // alert("success: "+msg);
				$(el).next().remove();
				$(el).html(saveOpt.newContent);
				$(el).css('display', '');
			},
			error : function(e) {
				// alert("error occured while saving your modifications!");
				$(el).next().remove();
				$(el).html(saveOpt.newContent);
				$(el).css('display', '');
			}
		});
	}
	if(cb){
		cb();
	}
	
}

function cancel(el,cb) {
	$(el).next().remove();
	$(el).css('display', '');
	if(cb){
		cb();
	}
}

function remove(el,cb){
	$(el).next().remove();
	$(el).remove();
	if(cb){
		cb();
	}
	
}
