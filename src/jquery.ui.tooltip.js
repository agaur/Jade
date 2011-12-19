(function($) {
	$.widget("ui.tooltip", {
		options:{
			content:null,
			title: null,
			speed: 500,
			toolTipClass: null,
			effect: null
		},
		_setOption: function(key, value) {
            if (key === "disabled") {
                this[value ? "_disable" : "_enable"]();
                this.options[key] = value;
                return;
            }
            this._super(key, value);
        },
		_create:function(){
			var self = this;
			var el = self.element;
			var o = self.options;
			if(!o.content){
				o.content = el.attr("title");
			}
			el.removeAttr("title");
			el.bind({
				"mouseover" : function(e){
					var title="", contentText = o.content;
					var toolTipClass = "ui-state-default",
						titleClass = "ui-tooltip-title",
						contentClass = "ui-tooltip-content" ;
					var op = {};
					var effect = o.effect;
					if(o.toolTipClass){
						toolTipClass = o.toolTipClass;
						titleClass = o.toolTipClass+"-title";
						contentClass = o.toolTipClass+"-content" ;
					}
					if(o.title){
						title = $("<div/>").addClass(titleClass).html(o.title);
					}
					if ( effect === "scale" ) {
						op = { percent: 100 };
					} else if ( effect === "size" ) {
						op = { to: { width: 150, height: 50 } };
					}
					var content = $("<div/>").addClass(contentClass).html(contentText);
					self.tooltip = $("<div/>").addClass("ui-tooltip").css("top",e.pageY+10).css("left",e.pageX+10).addClass("ui-widget").addClass(toolTipClass);
					self.tooltip.append(title).append(content);
					$("body").append(self.tooltip);
					self.tooltip.show(effect,op,o.speed);
				},
				"mouseout" : function(e){
					self.tooltip.fadeOut(o.speed,function(){
						self.tooltip.remove();
					});
				},
			});
		},
		content:function(content){
			if(!content){
				return this.options.content;
			}
			else{
				this.options.content = content;
			}
		},
		title:function(title){
			if(!title){
				return this.options.title;
			}
			else{
				this.options.title = title;
			}
		},
		speed:function(speed){
			if(!speed){
				return this.options.speed;
			}
			else{
				this.options.title = speed;
			}
		},
		effect:function(effect){
			if(!effect){
				return this.options.effect;
			}
			else{
				this.options.effect = effect;
			}
		}
		
	});
})(jQuery);