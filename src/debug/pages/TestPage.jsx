export default function TestPage() {
    return (
      <div className="space-y-6 p-8">
        <Header />
        <BalanceOverview />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthlyExpensesChart />
          <SavingsGoalProgress />
        </div>
        <RecentTransactionsTable />
        <Notifications />
      </div>
    );
  }
  
  function Header() {
    return (
      <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center shadow">
        <h3 className="text-xl font-bold">Household Budget</h3>
        <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
      </div>
    );
  }
  
  function BalanceOverview() {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold">Balance Overview</h4>
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <p className="text-gray-500">Total Balance</p>
            <p className="font-bold text-lg">$2,500.00</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Monthly Expenses</p>
            <p className="font-bold text-lg">$1,200.00</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Monthly Income</p>
            <p className="font-bold text-lg">$3,000.00</p>
          </div>
        </div>
      </div>
    );
  }
  
  function RecentTransactionsTable() {
    return (
      <div className="bg-white shadow-md rounded-lg mt-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Responsible</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">11/01/2024</td>
              <td className="py-2 px-4">Groceries</td>
              <td className="py-2 px-4">$50.00</td>
              <td className="py-2 px-4">Food</td>
              <td className="py-2 px-4">John</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">11/03/2024</td>
              <td className="py-2 px-4">Utilities</td>
              <td className="py-2 px-4">$75.00</td>
              <td className="py-2 px-4">Services</td>
              <td className="py-2 px-4">Mary</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  function SavingsGoalProgress() {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold">Savings Goals</h4>
        <div className="mt-4">
          <p className="text-gray-500">Vacation Fund</p>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: "60%" }}></div>
          </div>
          <p className="text-gray-500 mt-4">Emergency Fund</p>
          <div className="w-full bg-gray-300 rounded-full h-4 mt-1">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>
      </div>
    );
  }
  
  function Notifications() {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold">Notifications</h4>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <p>Rent Payment Due</p>
            <span className="text-red-600 font-semibold">Due Soon</span>
          </div>
          <div className="flex justify-between items-center">
            <p>Electric Bill</p>
            <span className="text-yellow-600 font-semibold">3 days left</span>
          </div>
        </div>
      </div>
    );
  }
  
  function MonthlyExpensesChart() {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold">Monthly Expenses</h4>
        <div className="mt-4 h-48 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Graph Placeholder</p>
        </div>
      </div>
    );
  }
  