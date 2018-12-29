//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

	var setupEventListeners = function () {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
		
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		
		//event listener for triggering
		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
		
	};

	var updateBudget = function () {
		//1. Calculate the budjet
		budgetCtrl.calculateBudget();
		
		//2. return budget
		var budget = budgetCtrl.getBudget();
		
		//3. Display the budget
		//console.log(budget);
		UICtrl.displayBudget(budget);
		
	};
	
	//update percentages in the exp items
	var updatePercentages = function(){
		
		//1. Calculate percentages
		budgetCtrl.calculatePercentages();
		
		//2. Read percentage from Budget Ctrl
		var percentages = budgetCtrl.getPercentages();
		
		//3. Update UI with new values
		UICtrl.displayPercentages(percentages);
	};
	

	var ctrlAddItem = function () {
		var input, newItem;

		//1. Get the field input data
		input = UICtrl.getIput();
		
		//if inputs are not empty
		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
			//2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			//3. Add the item to the UI 
			UICtrl.addListItem(newItem, input.type);

			//4.Clear the fields
			UICtrl.clearFields();

			//5. Calculate and update budget
			updateBudget();
			
			//6. calculate and update percentages
			updatePercentages();
		}
	};
	
	var ctrlDeleteItem = function(event){
		var itemID, splitID, type, ID;
		//console parent which element was clicked, id of parent
		//console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
		itemID  = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if (itemID) {
			
			//inc-1
			splitID = itemID.split('-');
			type = splitID[0];
			ID = splitID[1];
			
			// 1. delete item from the data structure
			budgetCtrl.deleteItem(type, ID);
			
			// 2. delte item from the UI
			UICtrl.deleteListItem(itemID);
			
			// 3. Update and show the budget 
			updateBudget();
			
			//4. calculate and update percentages
			updatePercentages();
		}
	};
	return {

		init: function () {
			setupEventListeners();
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			console.log("Application start");
		}
	};

})(budgetController, UIController);


controller.init();
