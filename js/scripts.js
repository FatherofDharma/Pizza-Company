//Business logic section.

//section for the orderlist and it's prototype methods.
//creates an object with an array to store all orders in.

function OrderList() {
  this.orders = [],
  this.orderId = 0;
}

//This prototype assigns id's to new orders while adding them to the orderlist array.

OrderList.prototype.addOrder = function (newOrder) {
  newOrder.orderId = this.assignId();
  this.orders.push(newOrder);
};

//Section for order objects and order prototypes.

function Order(accountName) {
  this.accountName = accountName,
  this.pizzas = [];
  this.totalCost = 0;
}

//assigns an id to an order. Will add functionality for using this later.

OrderList.prototype.assignId = function () {
  this.orderId += 1;
  return this.orderId;
};

Order.prototype.addPizza = function (newPizza) {
  this.pizzas.push(newPizza);
  this.totalCost += newPizza.currentCost;
};

function Pizza(name, size, toppings) {
  this.name = name,
  this.size = size,
  this.toppings = [],
  this.currentCost = 12;
}

Pizza.prototype.addTopping = function (newTopping) {
  this.toppings.push(newTopping);
  this.currentCost += 2;
};

var currentOrderList = new OrderList();
var order1 = new Order('Daniel');
var order2 = new Order('Bob');
var newPizza1 = new Pizza('pepperoni', 'large', ['olives', 'onions']);

currentOrderList.addOrder(order1);
currentOrderList.addOrder(order2);

order1.addPizza(newPizza1);

//User interface logic section.
$(document).ready(function () {
  $('#newOrder').submit(function (event) {
    event.preventDefault();
    var inputtedOrderName = $('input#orderName').val();
    $('input#orderName').val('');
    var inputtedPizzaType = $('input:checkbox[name=pizzatype]:checked').val();
    var inputtedPizzaSize = $('input:radio[class=size]:checked').val();
    var newTopping = $('input:checkbox[name=toppings]:checked').val();
    var newPizza = new Pizza(inputtedPizzaType, inputtedPizzaSize);
    var inputtedOrder = new Order(inputtedOrderName);

    $('input:checkbox[name=toppings]:checked').each(function () {
            newPizza.addTopping($(this).val());
          });

    var runningTotal = newPizza.currentCost;
    inputtedOrder.addPizza(newPizza);
    currentOrderList.addOrder(inputtedOrder);
    $('#placedOrder').text('Your total cost is $ ' + runningTotal);

  });
});
