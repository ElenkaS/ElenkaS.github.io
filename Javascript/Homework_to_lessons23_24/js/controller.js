define(
    'controller',
    [
        'model',
        'view',
        'jquery',
        'tmpl'
    ],
    function() {

        function Controller(model, view) {

            var self = this;

            view.elements.addBtn.on('click', addEditItem);

            function addEditItem() {
                var self = this;

                if ($(this).hasClass('button-edit')) {
                    editItem(self);
                } else {
                    addItem();
                }
            }

            view.elements.listContainer.on('click', '.item_delete', removeItem);
            view.elements.listContainer.on('click', '.item_edit', edit);

            function addItem() {

                var newItem = view.elements.input.val();
                model.addItem(newItem);
                view.renderList(model.data);
                view.elements.input.val('');
            }

            function removeItem() {
                var item = $(this).data('value');

                model.removeItem(item);

                view.renderList(model.data);
            }

            function edit() {
                var item = $(this).data('value');
                view.elements.input.val(item);
                view.elements.addBtn.text('Edit').addClass('button-edit');
                var index = $(this).parent('li').index();
                view.elements.addBtn.data('edit-index', (index - 1));

            }

            function editItem(self) {

                view.elements.addBtn.text('Add').removeClass('button-edit');

                var newItemValue = view.elements.input.val();

                if (newItemValue.length == 0) {
                    return
                }
                ;

                var index = $(self).data('edit-index');


                model.editItem(index, newItemValue);

                view.renderList(model.data);
                view.elements.input.val('');
            }

        };
        return Controller;
    }
);