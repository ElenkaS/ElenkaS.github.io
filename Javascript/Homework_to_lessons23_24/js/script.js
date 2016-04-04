/*function Model(data) {
    var self = this;

    self.data = data;

    self.addItem = function (item) {

        if (item.length === 0) {
            return;
        }
        self.data.push(item);

        return self.data;
    }

    self.removeItem = function (item) {

        var index = self.data.indexOf(item);

        if (index === -1) {
            return;
        }
        self.data.splice(index, 1);

        return self.data;
    }

    self.editItem = function (index, newItemValue) {

        console.log(index, newItemValue);
        self.data[index] = newItemValue;



    }

}*/

/*function View(model) {
    var self = this;

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
    };

    init();
};*/

/*function Controller(model, view) {
    var self = this;

    view.elements.addBtn.on('click', addEditItem);

    function addEditItem() {
        var self = this;

        if ($(this).hasClass('button-edit')){
            editItem(self);
        }else{
            addItem();
        }
    }


    view.elements.listContainer.on('click', '.item_delete', removeItem);
    view.elements.listContainer.on('click', '.item_edit', edit)

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
        var index = $(this).parent().index();
        view.elements.addBtn.data('edit-index', index);

    }

    function editItem(self) {

        view.elements.addBtn.text('Add').removeClass('button-edit');

        var newItemValue = view.elements.input.val();

        if(newItemValue.length == 0) {
            return
        };

        var index = $(self).data('edit-index');


        model.editItem(index, newItemValue);

        view.renderList(model.data);
        view.elements.input.val('');
    }

};*/


/*$(function () {

    var firstToDoList = ['learn js', 'learn html', 'make coffe'];
    var model = new Model(firstToDoList);
    var view = new View(model);
    var controller = new Controller(model, view);
});*/