import React, { useState } from 'react';
import InputField from './InputField.tsx';
import DataTable from './DataTable.tsx';

export default function ComponentDemo() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Pending' },
  ];

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true,
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">React Components Demo</h1>
        <p className="text-lg text-gray-600">InputField & DataTable Components with TypeScript</p>
      </div>

      {/* InputField Demo */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          InputField Component
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Variants</h3>
            <div className="space-y-4">
              <InputField
                label="Outlined (Default)"
                placeholder="Enter text..."
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                clearable
                onClear={() => setInputValue('')}
              />
              <InputField
                label="Filled"
                placeholder="Enter text..."
                variant="filled"
                helperText="This is helper text"
              />
              <InputField
                label="Ghost"
                placeholder="Enter text..."
                variant="ghost"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Sizes</h3>
            <div className="space-y-4">
              <InputField
                label="Small"
                placeholder="Small input..."
                size="sm"
              />
              <InputField
                label="Medium (Default)"
                placeholder="Medium input..."
                size="md"
              />
              <InputField
                label="Large"
                placeholder="Large input..."
                size="lg"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">States</h3>
            <div className="space-y-4">
              <InputField
                label="Password"
                placeholder="Enter password..."
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <InputField
                label="Error State"
                placeholder="Invalid input..."
                invalid
                errorMessage="This field is required"
              />
              <InputField
                label="Disabled"
                placeholder="Disabled input..."
                disabled
                value="Cannot edit this"
              />
              <InputField
                label="Loading"
                placeholder="Processing..."
                loading
              />
            </div>
          </div>
        </div>
      </section>

      {/* DataTable Demo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
          DataTable Component
        </h2>
        <div className="space-y-4">
          {selectedRows.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <span className="font-medium">{selectedRows.length}</span> row(s) selected
              </p>
            </div>
          )}
          <DataTable
            data={sampleData}
            columns={columns}
            selectable
            onRowSelect={setSelectedRows}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Loading State</h3>
          <DataTable
            data={[]}
            columns={columns}
            loading
            onRowSelect={setSelectedRows}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Empty State</h3>
          <DataTable
            data={[]}
            columns={columns}
            emptyMessage="No users found"
            onRowSelect={setSelectedRows}
          />
        </div>
      </section>
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documentation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">InputField Props</h3>
            <div className="bg-white rounded border p-4 text-sm font-mono">
              <div className="space-y-1">
                <div><span className="text-blue-600">value?</span>: string</div>
                <div><span className="text-blue-600">onChange?</span>: (e: ChangeEvent) =&gt; void</div>
                <div><span className="text-blue-600">label?</span>: string</div>
                <div><span className="text-blue-600">placeholder?</span>: string</div>
                <div><span className="text-blue-600">helperText?</span>: string</div>
                <div><span className="text-blue-600">errorMessage?</span>: string</div>
                <div><span className="text-blue-600">disabled?</span>: boolean</div>
                <div><span className="text-blue-600">invalid?</span>: boolean</div>
                <div><span className="text-blue-600">loading?</span>: boolean</div>
                <div><span className="text-blue-600">variant?</span>: 'filled' | 'outlined' | 'ghost'</div>
                <div><span className="text-blue-600">size?</span>: 'sm' | 'md' | 'lg'</div>
                <div><span className="text-blue-600">clearable?</span>: boolean</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">DataTable Props</h3>
            <div className="bg-white rounded border p-4 text-sm font-mono">
              <div className="space-y-1">
                <div><span className="text-blue-600">data</span>: T[]</div>
                <div><span className="text-blue-600">columns</span>: Column&lt;T&gt;[]</div>
                <div><span className="text-blue-600">loading?</span>: boolean</div>
                <div><span className="text-blue-600">selectable?</span>: boolean</div>
                <div><span className="text-blue-600">onRowSelect?</span>: (rows: T[]) =&gt; void</div>
                <div><span className="text-blue-600">emptyMessage?</span>: string</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Features</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>✅ Full TypeScript support with proper interfaces</li>
            <li>✅ Responsive design with mobile-friendly layouts</li>
            <li>✅ ARIA labels and accessibility features</li>
            <li>✅ Modern Tailwind CSS styling</li>
            <li>✅ Interactive states and animations</li>
            <li>✅ Sorting, selection, and loading states</li>
            <li>✅ Clean, scalable component architecture</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
