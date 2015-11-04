(function ($) {
    
    var settings = null;
 
    function Do(panelDiv) {

        settings.sample = panelDiv.data('sample');
        settings.type = panelDiv.data('type');
        settings.value = panelDiv.data('value');
        //find sample code
        var rowsample = $(settings.sample);
        rowsample.css("display", "none");
        var sample = rowsample.html();


        var i = panelDiv.find(".each-section").size();
        //add html details to create a correct template
        var sectionDiv = $('<div />', { "class": 'each-section', 'id': 'section'+i });
        var image = $("<img />", { "src": settings.value,"class":"remove-image" });
        var link = $("<a />", { "text": settings.value,"class":"remove-link" });
        //remove event for remove selected form

        //create new form
        sectionDiv.html(sample);

        link.on('click', function (e) {

            e.preventDefault();
            var $this = $(this);
            $this.closest(".each-section").remove();
        });

        if (i > 0) {
            if (settings.type == 'image') {
                link.text('');
                link.append(image);

            }
            sectionDiv.append(link);
        }

        //add new created form on document
        panelDiv.append(sectionDiv);
       
    }


    //methods
    var methods = {
        init: function (options) {
            //default-settings
             settings = $.extend({
                'sample': '#row-sample',
                'type': 'text',
                'value': 'Remove'
             }, options);
             this.attr('data-sample', settings.sample);
             this.attr('data-type', settings.type);
             this.attr('data-value', settings.value);
            Do(this);
        },
        show: function () {
            this.css("display", "inline");
        },
        hide: function () {
            this.css("display", "none");
        },
        add: function () {
            Do(this);
        },
        remove: function (index) {
            console.log(index);
           this.find(".each-section")[index].remove();
        },
        content: function (index) {
            return this.find(".each-section")[index];
        },
        count: function (index) {
            return this.find(".each-section").size();
        }
    };

    


    $.fn.RowAdder = function (method) {
    
            // call methods
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.RowAdder');
            }
      

    };
})(jQuery);