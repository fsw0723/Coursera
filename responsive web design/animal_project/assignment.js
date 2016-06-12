// put your javascript code here
var categories_template, animals_template, animal_template, slideshow_template;
var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

function showTemplate(template, data){
    var html    = template(data);
    $('#content').html(html);
}

function showAnimalsTab(event){
    event.preventDefault();
    $("#animals-tab").tab('show');
    showTemplate(animals_template, current_category);

    $(".animal-thumbnail").click(function (){
        var index = $(this).data("id");

        current_animal = current_category.animals[index];

        showTemplate(animal_template, current_animal);
    });
}

$(document).ready(function(){
    var source   = $("#categories-template").html();
    categories_template = Handlebars.compile(source);

    source   = $("#animals-template").html();
    animals_template = Handlebars.compile(source);

    source   = $("#animal-template").html();
    animal_template = Handlebars.compile(source);

    source   = $("#slideshow-template").html();
    slideshow_template = Handlebars.compile(source);

    $('#categories-tab').click(function () {
        showTemplate(categories_template, animals_data);

        $(".category-thumbnail").click(function (e){
            var index = $(this).data("id");
            current_category = animals_data.category[index];
            showAnimalsTab(e);
        });
    });

    $('#animals-tab').click(function (e) {
        showAnimalsTab(e);
    });

    $('#animals-tab').click(function (e) {
        showTemplate(animal_template, current_animal);
    });

    $("#slideshow-tab").click(function () {
        showTemplate(slideshow_template, current_category);
    });

    $("#categories-tab").click();


});