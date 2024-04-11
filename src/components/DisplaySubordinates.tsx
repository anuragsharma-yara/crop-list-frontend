'use client'
import React, { useEffect, useState } from 'react';
import { EmployeeHierarchy } from '../type';

const DisplaySubordinates: React.FC<{ employees: EmployeeHierarchy[] }> = ({ employees }) => {
    const [visibleDetails, setVisibleDetails] = useState<Set<number>>(new Set([]));

    useEffect(() => {
        setVisibleDetails(new Set([]));
    }, [employees]);

    // console.log(visibleDetails);

    const toggleDetails = (id: number) => {
        setVisibleDetails(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const renderEmployees = (employees: EmployeeHierarchy[], level: number = 0): JSX.Element[] => {
        // console.log('visibleDetails > ', visibleDetails)
        return employees.map(employee => {
            return (
                <div key={employee.id} className={`pl-${level * 20} mb-4 text-xl`}>
                    <div
                        onClick={() => toggleDetails(employee.id)}
                        className="cursor-pointer font-semibold text-lg flex flex-col gap-1"
                    >
                        <span className={`ml-${level * 5}`}>
                            {visibleDetails.has(employee.id) ? '▼' : '►'} {employee.name}
                        </span>
                        <div className='flex gap-1 p-2 border-1 bg-gray-300'>
                            <div>ID: {employee.id}</div>
                            <div>Manager: {employee.manager_name || 'None'}</div>
                            <div>Designation: {employee.designation}</div>
                            <div>Salary: {employee.salary}</div>
                        </div>
                        {visibleDetails.has(employee.id) && (
                            <div className="ml-6 text-sm p-2 rounded">
                                {employee.subordinates && renderEmployees(employee.subordinates, level + 1)}
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    return <div>{renderEmployees(employees)}</div>;
};



export default DisplaySubordinates;
