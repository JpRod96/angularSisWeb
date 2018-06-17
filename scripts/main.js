const URL="https://sisweb-product-orders.herokuapp.com";
const ORDER="/order";
const PRODUCT_URL="/products";
const ORDERS_BY_STATUS="/orders?status=";
const DRAFT_STATUS="draft";
const REQUESTED_STATUS="requested";
const FINISHED_STATUS="finished";
let currentOrder;
const productDictionary={};

let app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/nuevo-pedido", {
        templateUrl : "/newPedido.htm",
        controller : "newCtrl"
    })
    .when("/", {
        templateUrl : "/main.htm",
        controller : "mainCtrl"
    })
    .when("/seeOrder/:id", {
        templateUrl : "/newPedido.htm",
        controller : "orderMngrCtrl"
    })
});

app.controller("orderMngrCtrl", function($scope, $http, $routeParams){
    let id=$routeParams.id;
    let req = {
        method: 'GET',
        url: URL+ORDER+"/"+id,
        headers: {
          User:"8823931"
        }
    };

    getOrder($http, req, $scope);

    req = {
        method: 'GET',
        url: URL+PRODUCT_URL,
        headers: {
          User:"8823931"
        }
    };
    fetchProductToScope($http, req, $scope);
    increaseRowCounter();

    $scope.toIndent = () => {
        currentOrder.status = REQUESTED_STATUS;
        saveOrder($http);
    }

    $scope.save = () => {

        saveOrder($http);
    }

    $scope.addProduct = () => {
        let select = document.querySelector("#table-select");
        let id = select.value;
        $scope.order.products.push(id);
        currentOrder = $scope.order;
        increaseRowCounter();
    }
});

function simplerMode(){
    let auxiliarOrder=currentOrder;
    currentOrder={
            "customer": "", 
            "products": [], 
            "status": DRAFT_STATUS
        };
    currentOrder.customer=auxiliarOrder.customer;
    currentOrder.products=auxiliarOrder.products;
    currentOrder.status=auxiliarOrder.status;
}

app.controller("mainCtrl", function($scope, $http){
    let req = {
        method: 'GET',
        url: URL+ORDERS_BY_STATUS+DRAFT_STATUS,
        headers: {
          User:"8823931"
        }
    }
    fetchDraftOrdersToScope($http,req,$scope);
    req = {
        method: 'GET',
        url: URL+ORDERS_BY_STATUS+REQUESTED_STATUS,
        headers: {
          User:"8823931"
        }
    }
    fetchRequestedOrdersToScope($http,req,$scope);
    req = {
        method: 'GET',
        url: URL+ORDERS_BY_STATUS+FINISHED_STATUS,
        headers: {
          User:"8823931"
        }
    }
    fetchFinishedOrdersToScope($http,req,$scope);
    showTab("nuevo");
});

app.controller("newCtrl",newCtrl);

function newCtrl($scope, $http){
    let req = {
        method: 'GET',
        url: URL+PRODUCT_URL,
        headers: {
          User:"8823931"
        }
    };
    fetchProductToScope($http, req, $scope);
    $scope.order={
        "customer": "", 
        "products": [], 
        "status": DRAFT_STATUS
    };
    increaseRowCounter();

    $scope.toIndent = () => {
        currentOrder.status = REQUESTED_STATUS;
        saveOrder($http);
    }

    $scope.save = () => {

        saveOrder($http);
    }

    $scope.addProduct = () => {
        let select = document.querySelector("#table-select");
        let id=select.value;
        $scope.order.products.push(id);
        currentOrder=$scope.order;
        increaseRowCounter();
        console.log(currentOrder);
    }
}

function getOrder(httpService, req, scope){
    httpService(req)
    .then((response) => {
        scope.order = response.data;
        currentOrder = response.data;
    })
    .catch((error) => {
        console.log("error we "+error);
    });
}

function saveOrder(httpService){
    let req;
    if(currentOrder._id){
        let id=currentOrder._id;
        simplerMode();
        req = {
            method: 'PUT',
            url: URL+ORDER+"/"+id,
            data : JSON.stringify(currentOrder),
            headers: {
              User:"8823931"
            }
        };
    }
    else{
        req = {
            method: 'POST',
            url: URL+ORDER,
            data : JSON.stringify(currentOrder),
            headers: {
              User:"8823931"
            }
        };
    }
    httpService(req)
        .then((response)=>{
            window.location.replace('/');
        })
        .catch((error)=>{
            console.log("error we "+error);
        });
}

function fetchDraftOrdersToScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.draftOrders=response.data;
    })
    .catch((error)=>{
        scope.draftOrders=[
            {
                "_id": "abc123",
                "customer": "Pepito", 
                "products": [ "id1", "id2", "id3", "id4"], 
                "status": "draft",
                "date":"12/12/2012"
            }
        ];
    });
}

function fetchRequestedOrdersToScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.requestedOrders=response.data;
    })
    .catch((error)=>{
        scope.requestedOrders=[
            {
                "_id": "abc123",
                "customer": "tuGfa", 
                "products": [ "id1", "id2", "id3", "id4"], 
                "status": "requested",
                "date":"12/12/2015"
            }
        ];
    });
}

function fetchFinishedOrdersToScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.finishedOrders=response.data;
    })
    .catch((error)=>{
        scope.finishedOrders=[
            {
                "_id": "abc123",
                "customer": "yuOtraGfa", 
                "products": [ "id1", "id2", "id3"], 
                "status": "finished",
                "date":"12/12/2015"
            }
        ];
    });
}

function fetchProductToScope(httpService, req, scope){
    httpService(req)
    .then((response)=>{
        scope.products=response.data;
        chargeInProductDictionary(scope.products);
        scope.productDictionary=productDictionary;
    })
    .catch((error)=>{
        scope.products=[
            {
                "_id": "5b1de12011f14dc5a8770cab",
                "name": "Algas Konbu"
            },
            {
                "_id": "5b1de12011f14dc5a70cab",
                "name": "Allahu Akbar"
            }
        ];
    });
}

function chargeInProductDictionary(array){
    for(product of array){
        productDictionary[product._id]=product.name;
    }
}
