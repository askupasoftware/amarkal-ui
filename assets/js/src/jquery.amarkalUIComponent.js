$.fn.extend({
    // NOTE: this function does not return a jQuery object!
    amarkalUIcomponent: function( method ) {
        
        // Store arguments for use with methods
        var args = arguments.length > 1 ? Array.apply(null, arguments).slice(1) : null,
            returnVal;
        
        returnVal = this.each(function() {
            
            if(!$(this).hasClass('amarkal-ui-component')) {
                throw "This element is not an Amarkal UI component";
            }
            
            // If this is the initial call for this component, instantiate a new 
            // component object
            if( typeof $(this).data('amarkal-ui-component') === 'undefined' ) {
                $(this).data('amarkal-ui-component', Amarkal.UI.createComponent($(this)));
            }
            
            // If this is a method call, run the method (if it exists)
            var comp = $(this).data('amarkal-ui-component');
            if( typeof method !== 'undefined' && comp.hasOwnProperty(method)) {
                
                // Override the return value when calling a method
                returnVal = comp[method].apply(comp, args);
                
                // Only call methods for the first element in the set
                return false;
            }
        });
        
        return returnVal;
    }
});