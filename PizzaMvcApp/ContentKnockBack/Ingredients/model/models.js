window.Ingredient = Backbone.Model.extend({

    urlRoot: "api/ingredients",

    initialize: function () {
        this.validators = {};

        this.validators.Name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a ingredient's name"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        Id: null,
        Name: ""
    }
});

window.IngredientCollection = Backbone.Collection.extend({

    model: Ingredient,

    url: "api/ingredients"

});