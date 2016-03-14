define(
    'view',
    [
        'model',
        'jquery',
        'tmpl'
    ],
    function() {
        function View(model) {
            var self = this;
            var elements = {};

            function init() {
                var wrapper = tmpl($('#wrapper-template').html());

                $('body').append(wrapper);

                self.elements = {
                    input: $('.item_value'),
                    addBtn: $('.item-add'),
                    listContainer: $('.item-list')
                };
                self.renderList(model.data);
            };

            self.renderList = function (data) {
                var list = tmpl($('#list-template').html(), {data: data});
                self.elements.listContainer.html(list);
                $('.item-counter').html(model.countTasks());
            };

            init();
        };
        return View;
    }
);