Amarkal.UI.registerComponent('composite',{
    setValue: function(values) {
        // Given value must be an object (a PHP associative array)
        for(var key in values) {
            this.$el.find('[amarkal-component-name="'+key+'"]')
                .amarkalUIcomponent()
                .setValue(values[key]);
        }
    },
    getValue: function() {
        var values = {};
        this.$el.find('.amarkal-ui-component').each(function(){
            var name = $(this).attr('amarkal-component-name'),
                comp = $(this).amarkalUIcomponent();
                
            values[name] = comp.getValue();
        });
        return values;
    }
});