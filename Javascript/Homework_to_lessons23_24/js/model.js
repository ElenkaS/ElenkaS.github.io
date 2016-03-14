define(
    'model',
    [

    ],
    function() {

        function Model(data) {
            var self = this;

            self.addItem = function (item) {

                if (item.length === 0) {
                    return;
                }
                self.data.push(item);

                self.setToStorage();
                return self.data;
            }

            self.removeItem = function (item) {

                var index = self.data.indexOf(item);

                if (index === -1) {
                    return;
                }
                self.data.splice(index, 1);
                self.setToStorage();
                return self.data;
            }

            self.editItem = function (index, newItemValue) {
                self.data[index] = newItemValue;
                self.setToStorage();
            }

            self.countTasks = function () {
                return self.data.length;
            }

            self.setToStorage = function () {
                 localStorage.setItem('tasks', JSON.stringify(self.data));
            }

            self.getFromStorage = function() {
                return JSON.parse(localStorage.getItem('tasks'));
            }

            self.data = data || self.getFromStorage();

        }
        return Model;
    }
);