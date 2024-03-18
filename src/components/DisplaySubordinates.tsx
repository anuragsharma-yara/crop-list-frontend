'use client'
import React, { useState } from 'react';
import { EmployeeHierarchy } from '../type';

const DisplaySubordinates: React.FC<{ employees: EmployeeHierarchy[] }> = ({ employees }) => {
  const [visibleDetails, setVisibleDetails] = useState<number[]>([]);

  const toggleDetails = (id: number) => {
    setVisibleDetails((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const renderEmployees = (employees: EmployeeHierarchy[], level: number = 0): JSX.Element[] => {
    return employees.map((employee) => (
      <div key={employee.id} className={`pl-${level * 20} mb-4 text-xl`}>
        <div
          onClick={() => toggleDetails(employee.id)}
          className="cursor-pointer font-semibold text-lg flex flex-col gap-1"
        >
            <span className={`ml-${level * 5}`}>
                {visibleDetails.includes(employee.id) ? '▼' : '►'} {employee.name}
            </span>
            <div className='flex gap-1 p-2 border-1 bg-gray-600'> 
                    <div>ID: {employee.id}</div>
                    <div>Manager: {employee.manager_name || 'None'}</div>
                    <div>Designation: {employee.designation}</div>
                    <div>Salary: {employee.salary}</div>
            </div>
          {visibleDetails.includes(employee.id) && (
            <div className="ml-6 text-sm p-2 rounded">
                {employee.subordinates && renderEmployees(employee.subordinates, level + 1)}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return <div>{renderEmployees(employees)}</div>;
};

export default DisplaySubordinates;
