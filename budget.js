//BudgetCtrl
var budgetController = (function () {

	//constructor for expense
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};
	
	Expense.prototype.calcPercentage = function(totalIncome) {
		
		if(totalIncome > 0) {
			this.percentage =  Math.round((this.value / totalIncome)* 100 );
		} else {
			this.percentage = -1;
		}
		
	};
	
	Expense.prototype.getPercentage = function() {
		//return percentage globally
		return this.percentage;
	}

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	//calculate Total exp and inc
	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum += cur.value;
		});
		data.totals[type] = sum;
	};
	
	
	//data for our expences and incomes
	var data = {
		allItems: {
			//store all data of expenses - array
			exp: [],
			inc: []
		},
		totals: {
			//total score of expences
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function (type, des, val) {
			var newItem, ID;
			dataAll = data.allItems[type];

			//determine ID
			if (dataAll.length > 0) {
				ID = dataAll[dataAll.length - 1].id + 1;
			} else {
				ID = 0;
			}


			//Create new item based on inc\exp
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else {
				newItem = new Income(ID, des, val);
			}
			//collect exp/income in obj allItems
			dataAll.push(newItem);

			//Return new element
			return newItem;
		},
		
		deleteItem: function(type, id){
			var ids, index;
			
			// id = 3
			// ids = [1 2 4 6 8]
			//index = 3
			
			//map return result as array
			ids = data.allItems[type].map(function(current){
				return current.id; 
			});
			index = ids.indexOf(parseInt(id) );

			//delete id, using method slice
			if(index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		
		calculateBudget: function(){
			
			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			
			// calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			
			// calculate the percentage of income that we spent 
			if(data.totals.inc > 0){
				data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
			} else{
				data.percentage = -1;
			}
			
			
		},
		
		calculatePercentages: function(){
			
			// a= 20 b=10 c=40 totalincome = 100  a = 20/100 = 20% b = 10/100 = 10%.....
			data.allItems.exp.forEach(function(cur){
				//calc Percentages for each exp
				cur.calcPercentage(data.totals.inc);
			});
			
		},
		
		getPercentages: function(){
			var allPerc = data.allItems.exp.map(function(cur){
				return cur.getPercentage();
			});
			return allPerc;
		},
		
		getBudget: function(){
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},
		
		testing: function () {
			//for calling = BudgetConstrolle.testing();
			console.log(data);
		}

	};

})();
