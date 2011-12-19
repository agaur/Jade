$.widget( "AG.menubar", {
    // default options
    options: {
    },
    _create: function() {
    	var elem = this.element;
    	elem.addClass("cssMenu ui-widget ");
    	var items = elem.children( "li" ).addClass("ui-state-default");
    	$(".cssMenu ul").addClass("ui-state-default");
    	$(".cssMenu ul li").addClass("ui-state-default");
    	$(".cssMenu li").each(function(){
    		var self = this;
    		$(self).mouseover(function() {
    			$(self).removeClass("ui-state-active");
    			$(self).removeClass("ui-state-default");	
    			$(self).addClass("ui-state-hover");
    		});
    		$(self).mouseout(function() {
    			$(self).removeClass("ui-state-active");
  			  $(self).removeClass("ui-state-hover");
  			  $(self).addClass("ui-state-default");
    		});
    		$(self).click(function(e) {
    			  e.stopPropagation();
    			  $(self).addClass("ui-state-active");
      		});
    	});
    	$(".cssMenu ul li").each(function(){
    		var self = this;
    		$(self).mouseover(function() {
    			$(self).removeClass("ui-state-active");
    			$(self).removeClass("ui-state-default");	
    			$(self).addClass("ui-state-hover");
    		});
    		$(self).mouseout(function() {
    			$(self).removeClass("ui-state-active");
  			  $(self).removeClass("ui-state-hover");
  			  $(self).addClass("ui-state-default");
    		});
    		$(self).click(function(e) {
    		  e.stopPropagation();
  			  $(self).addClass("ui-state-active");
    		});
    	});
    },
});
