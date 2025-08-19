import React, { useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
}

function DataTable({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = useCallback((column) => {
    if (!column.sortable) return;
    setSortConfig(prev => ({
      key: column.dataIndex,
      direction: prev.key === column.dataIndex && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleRowSelect = useCallback((row, checked) => {
    const newSelectedRows = checked
      ? [...selectedRows, row]
      : selectedRows.filter(r => r !== row);
    setSelectedRows(newSelectedRows);
    if (onRowSelect) onRowSelect(newSelectedRows);
  }, [selectedRows, onRowSelect]);

  const handleSelectAll = useCallback((checked) => {
    const newSelectedRows = checked ? [...data] : [];
    setSelectedRows(newSelectedRows);
    if (onRowSelect) onRowSelect(newSelectedRows);
  }, [data, onRowSelect]);

  const isRowSelected = useCallback((row) => {
    return selectedRows.includes(row);
  }, [selectedRows]);

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  if (loading) {
    return (
      <div className="w-full border border-gray-200 rounded-lg">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp className={`h-3 w-3 ${sortConfig.key === column.dataIndex && sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <ChevronDown className={`h-3 w-3 -mt-1 ${sortConfig.key === column.dataIndex && sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${isRowSelected(row) ? 'bg-blue-50' : ''}`}>
                  {selectable && (
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isRowSelected(row)}
                        onChange={(e) => handleRowSelect(row, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
                      {column.render ? column.render(row[column.dataIndex], row) : String(row[column.dataIndex] || '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
