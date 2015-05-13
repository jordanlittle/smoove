var smoove = window.smoove || {};

smoove.ui = (function () {
    
    var isActiveClass   = "is-active";
    var isVisibleClass  = "is-visible";
    var tabActiveClass  = "is-active-tab";
    var trigger         = "[data-ui-trigger]";
    var target          = "[data-ui-target]";
    var triggerReset    = "[data-ui-reset]";
    var overlayClass    = "viewing-overlay";
    
    return {
        
        isActiveClass: isActiveClass,
        isVisibleClass: isVisibleClass,
        tabActiveClass: tabActiveClass,
        trigger: trigger,
        target: target,
        triggerReset: triggerReset,
        overlayClass: overlayClass,
        
        isOpen: function() {
            if($('.' + isVisibleClass + '').length) {
                return true;
            } else {
                return false;
            }
        },
        
        dropdown: function(clicked) {
            var dropdown_target = $('#' + clicked.attr('data-ui-dropdown') + '');
            if( smoove.ui.isOpen() ) {
                clicked.removeClass(isActiveClass);
                dropdown_target.removeClass(isVisibleClass);   
            } else {
                clicked.addClass(isActiveClass);
                dropdown_target.addClass(isVisibleClass); 
            }
        },
                
        tab: function(clicked) {
            var tab_target = $('#' + clicked.attr('data-ui-tab') + '');
            clicked.siblings().removeClass(tabActiveClass);
            clicked.addClass(tabActiveClass);
            tab_target.siblings().removeClass(tabActiveClass);
            tab_target.addClass(tabActiveClass);
        },
        
        modal: function(clicked){
            smoove.ui.reset();
            var modal_target = $('#' + clicked.attr('data-ui-modal') + '');
            clicked.toggleClass(isActiveClass);
            modal_target.toggleClass(isVisibleClass);
            $('body').toggleClass(overlayClass);
        },
        
        reset: function() {
            $('.' + isActiveClass + '').removeClass(isActiveClass);
            $('.' + isVisibleClass + '').removeClass(isVisibleClass);
            $('body').removeClass(overlayClass);
        }
        
    };
})();



$(function(){
    
    // ready tabs
    $('.smoove-tabs--nav .smoove-tab:first-child').addClass(smoove.ui.tabActiveClass);
    $('.smoove-tabs--panels .smoove-tabs--panel:first-child').addClass(smoove.ui.tabActiveClass);  
    
       
    // Esc key
    $(document).on('keyup', function(e){
        if(e.keyCode == 27) {
            smoove.ui.reset();
        }
    });
    
    // "clicking off" of UI elements to close them
    $(document).on('mouseup', function (e) {
        if( smoove.ui.isOpen() ){
            var targets = $('' + smoove.ui.target + '');
            var triggers = $('' + smoove.ui.trigger + '');
            var clickIsTarget = targets.is(e.target);
            var clickIsTargetDescendant =  targets.has(e.target).length > 0;
            var clickIsTrigger = triggers.is(e.target);
            var clickIsTriggerDescendant = triggers.has(e.target).length > 0;
            // if the target of the click isn't a data-ui-target
            // nor a data-ui-trigger
            // nor a descendant of either
            if ( !clickIsTarget && !clickIsTrigger && !clickIsTargetDescendant && !clickIsTriggerDescendant ) {
                smoove.ui.reset();
            }   
        }
	});
    
    // attach click handlers to ui activators
    $('' + smoove.ui.trigger + '').each( function(e) {
        var trigger = $(this);
        trigger.on('click', function(e){
            e.preventDefault();
            
            if(trigger.attr('data-ui-dropdown')) {
                smoove.ui.dropdown(trigger);
            }
            
            if(trigger.attr('data-ui-modal')) {
                smoove.ui.modal(trigger);
            }
            
            if(trigger.attr('data-ui-tab')) {
                smoove.ui.tab(trigger);
            }
            
            
            
        });
    });
    
    $('' + smoove.ui.triggerReset + '').on('click', function(e){
        e.preventDefault();
        smoove.ui.reset();
    });
    
    $('.smoove-modal-overlay').on('click', function(e){
        if ( !$('.smoove-modal-container').has(e.target).length ) {
            smoove.ui.reset();
        }
    });
    
});