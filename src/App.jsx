import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();

    if (amount === "" || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (category === "") {
      alert("Please choose a category");
      return;
    }

    const numericAmount = Number(amount);

    if (category !== "Credit" && numericAmount > balance) {
      alert("Insufficient balance");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: category,
      amount: numericAmount,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    if (category === "Credit") {
      setBalance((prevBalance) => prevBalance + numericAmount);
    } else {
      setBalance((prevBalance) => prevBalance - numericAmount);
    }

    setCategory("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    const selectedExpense = expenses.find(
      (expense) => expense.id === id
    );

    if (!selectedExpense) {
      return;
    }

    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );

    if (selectedExpense.title === "Credit") {
      setBalance((prevBalance) => prevBalance - selectedExpense.amount);
    } else {
      setBalance((prevBalance) => prevBalance + selectedExpense.amount);
    }
  };

  const totalCredit = expenses
    .filter((expense) => expense.title === "Credit")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpenses = expenses
    .filter((expense) => expense.title !== "Credit")
    .reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon">💰</div>
        <h1>Expense Tracker</h1>
        <p>Manage your money. Track your spending.</p>
      </header>

      <main className="container">
        <section className="balance-card">
          <p>Available Balance</p>
          <h2>₹{balance.toLocaleString("en-IN")}</h2>
          <span>Your current account balance</span>
        </section>

        <section className="summary">
          <div className="summary-card income-card">
            <span className="summary-icon">↗</span>
            <p>Total Credit</p>
            <h3>₹{totalCredit.toLocaleString("en-IN")}</h3>
          </div>

          <div className="summary-card expense-card">
            <span className="summary-icon">↘</span>
            <p>Total Expenses</p>
            <h3>₹{totalExpenses.toLocaleString("en-IN")}</h3>
          </div>
        </section>

        <section className="form-card">
          <h2>Add Transaction</h2>
          <p className="section-description">
            Record your income or expenses below.
          </p>

          <form onSubmit={handleCalculate}>
            <label htmlFor="category">Transaction Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a category</option>
              <option value="Credit">Credit / Income</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="add-button" type="submit">
              + Add Transaction
            </button>
          </form>
        </section>

        <section className="transactions">
          <div className="transactions-heading">
            <div>
              <h2>Recent Transactions</h2>
              <p className="section-description">
                Your income and expenses
              </p>
            </div>
            <span className="transaction-count">
              {expenses.length} records
            </span>
          </div>

          {expenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No transactions yet</h3>
              <p>Add your first transaction to see it here.</p>
            </div>
          ) : (
            <div className="transaction-list">
              {expenses.map((expense) => (
                <div className="transaction-item" key={expense.id}>
                  <div className="transaction-info">
                    <div
                      className={`transaction-icon ${
                        expense.title === "Credit" ? "credit-icon" : "debit-icon"
                      }`}
                    >
                      {expense.title === "Credit" ? "↗" : "↘"}
                    </div>

                    <div>
                      <h3>
                        {expense.title === "Credit"
                          ? "Credit / Income"
                          : expense.title}
                      </h3>
                      <p>
                        {new Date(expense.id).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="transaction-right">
                    <span
                      className={
                        expense.title === "Credit"
                          ? "credit-amount"
                          : "debit-amount"
                      }
                    >
                      {expense.title === "Credit" ? "+" : "-"}₹
                      {expense.amount.toLocaleString("en-IN")}
                    </span>

                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => deleteExpense(expense.id)}
                      aria-label={`Delete ${expense.title} transaction`}
                      title="Delete transaction"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        Built with React ⚛️ -- Bhaskar
      </footer>
    </div>
  );
}

export default App;