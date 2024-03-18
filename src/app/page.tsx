'use client'
import React, { useEffect, useState } from 'react';
import DisplaySubordinates from '../components/DisplaySubordinates';
import { EmployeeHierarchy } from '@/type';
import axiosInstance from '@/utils/axiosInstance';

const EmployeePage = () => {
  const [employees, setEmployees] = useState<EmployeeHierarchy[]>([]);
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    const fetchEmployees = async (id: number) => {
      try {
        const { data } = await axiosInstance.get<EmployeeHierarchy[]>(`/employees/${id}/subordinates`);
        setEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };

    if (employeeId) {
      const id = parseInt(employeeId, 10);
      if (!isNaN(id)) {
        fetchEmployees(id);
      }
    }
  }, [employeeId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Hierarchy</h1>
      <div className="mb-4">
        <label htmlFor="employeeId" className="block text-sm font-medium">
          Enter Employee ID:
        </label>
        <input
          type="number"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-24 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <DisplaySubordinates employees={employees} />
    </div>
  );
};

export default EmployeePage;
