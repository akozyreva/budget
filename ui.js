//UI Contorller
var UIController = (function () {
	//dom strings for naming class selector
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	};
	var formatNumber = function(num, type){
			
			var numSplit, int, dec, sign;
			/* + or - bodore number
			exactly 2 decimal points
			comma separating the thousands
			2310.4657 -> + 2,310.46
			*/
			
			num = Math.abs(num);
			//exactly 2 decimal points
			num = num.toFixed(2);
			
			numSplit = num.split('.');
			
			//integer part
			int = numSplit[0];
			if(int.length > 3) {
				//method of string
				int = int.substr(0, int.length - 3) + ',' + int.substr(int.length-3, 3); // 2310 => 2,310
			}
			
			//decimal part
			dec = numSplit[1];
			
			sign = (type === 'exp' ? '-' : '+');
			
			return `${sign} ${int}.${dec}` 
		};
	var nodeListForEach = function(list, callback) {
				for(var i = 0; i< list.length; i++) {
					// we call callback function
					callback(list[i], i);
				}
			};

	return {
		getIput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			}

		},
		addListItem: function (obj, type) {
			var html, newHTML, element;
			//Create html string with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				//% for easy finding
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else {
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace placeholder text with actual data
			newHTML = html.replace('%id%', obj.id);
			//html is declared before and now we refer to new HTML;
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', formatNumber(obj.value, type) );
			
			//Insert the HTML into the DOM
			//we need to find element and add it after this element

			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

		},
		deleteListItem: function(selectorID){
			
			//we select somth, go to parent and then go to child
			// so weird, but it works
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
			
		},
		clearFields: function(){
			var fields, fieldsArr;
			
			//find all paths for inputs
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			
			//trick for return an array  using call mthods
			fieldsArr = Array.prototype.slice.call(fields);
			
			//antoher way, not using for
			// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
			fieldsArr.forEach(function(current){
				current.value = "";
			});
			
			//focus mouse on 1 element
			fieldsArr[0].focus();
		},
		
		//display Budget in html
		displayBudget: function(obj){
			var type;
			obj.budget > 0 ? type = 'inc' : type = 'exp';
			
			//we change only context, that's why  we use textContent
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
			
			
			if(obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
			
		},
		
		//!!!!!!!!!!!!!!!!!! USING CALLBCAK FUNCTION
		displayPercentages: function(percentages){
			
			//return node list
			var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
			
			nodeListForEach(fields, function(current, index){
				
				if(percentages[index] > 0 ) {
					current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				}
				
			});
			
		},
		
		displayMonth: function() {
			var year, now, month, months;
			months = ['Jan' , 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			now = new Date();
			month = now.getMonth();
			year  = now.getFullYear();
			document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;			
		},
		changedType: function() {
			
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ',' + 
				DOMstrings.inputDescription + ',' + 
				DOMstrings.inputValue
			);
			
			nodeListForEach(fields, function(cur){
				cur.classList.toggle('red-focus');
			});
			
			document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
			
			
		},
		getDOMstrings: function () {
			return DOMstrings;
		}
	};
})();

