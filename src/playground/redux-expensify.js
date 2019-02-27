const unsubscribe = store.subscribe(() => {
  const { expenses, filters } = store.getState();
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  console.log(visibleExpenses);
});

const { expense: { id: expenseOneId } } = store.dispatch(addExpense({ description: 'Rent', amount: 300, createdAt: 2001 }));
const { expense: { id: expenseTwoId } } = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: 2002 }));



store.dispatch(sortByAmount());

const user = {
  name: 'Omoefe',
  age: 21
};
