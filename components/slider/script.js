Amarkal.UI.registerComponent('slider',{
    props: {},
    setValue: function(value) {
        this.$el.find('input').val(value);
        this._updateLabelPosition();
        this._updateLabelValue(value);
    },
    getValue: function() {
        return this.$el.find('input').val();
    },
    onInit: function() {
        var _this  = this,
            $range = this.$el.find('input'),
            $label = this.$el.find('.slider-value-label');

        this._setProps();
        this._updateLabelPosition();
        this._populateValueLabels();
        this._updateLabelValue($range.val());

        $range.on('input change',function(){
            _this._updateLabelValue($range.val());
            _this._updateLabelPosition();
            _this.onChange();
        });

        $(window).on('resize', this._updateLabelPosition);
        $(window).on('resize', this._populateValueLabels);
    },

    /**
     * Set the component's properties
     */
    _setProps: function() {
        var $range = this.$el.find('input'),
            min = parseFloat($range.attr('min')),
            max = parseFloat($range.attr('max')),
            step = parseFloat($range.attr('step'));
        
        this.props = {
            min: min,
            max: max,
            step: step,
            delta: Math.abs(max-min),
            knobWidth: 26,
            labelWidth: 30, // The width of each label in the horizontal axis, in pixels (must match the CSS)
            minSpacing: 50 // Minimum spacing between labels
        };
    },

    /**
     * Reposition the label above the slider's thumb
     */
    _updateLabelPosition: function() {
        var $range = this.$el.find('input'),
            p = this.props,
            v = $range.val(),
            w = $range.width(),
            left = p.knobWidth/2 + ((w-p.knobWidth)*(v-p.min))/(p.delta);
        
        this.$el.find('.slider-value-label')
                .css({left: left+'px'});
    },
    
    /**
     * Update the value in the label above the thumb
     */
    _updateLabelValue: function(v) {
        this.$el.find('.slider-value-label').text(v);
    },

    /**
     * Populate the values along the horizontal axis below the slider
     */
    _populateValueLabels: function() {
        var $range = this.$el.find('input'),
            $labels = this.$el.find('.slider-values'),
            fn = this._formatNumber,
            lw = 30, // Label width, in pixels (set in the style file)
            ms = 50, // Minimum spacing between labels
            p = this.props,
            v = $range.val(),
            w = $range.width(),
            c = Math.floor(Math.min((w+ms)/(lw+ms),(p.delta/p.step)+1));
        
        $labels.html((function(){
            var html = '';
            for(var i = 0; i < c; i++) {
                var n = (p.delta/(c-1))*i+p.min;
                html += '<span>'+fn(n)+'</span>';
            }
            return html;
        })());
    },

    /**
     * Format the given number, adding K/M when applicable
     */
    _formatNumber: function(n) {
        var d = this.props.delta,
            s = this.props.step;
        if(d/1000000 > 1) return (n/1000000).toFixed(1).replace(/\.0$/, "")+'M';
        if(d/1000 > 1) return (n/1000).toFixed(1).replace(/\.0$/, "")+'K';
        if(s < 1) return n.toFixed(1).replace(/\.0$/, "");
        return Math.round(n);
    }
});