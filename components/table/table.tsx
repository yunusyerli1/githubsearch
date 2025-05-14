'use client';
import { ITableConfig } from '@/lib/hooks/useTable';
import Image from 'next/image';
import { useState } from 'react';

export function Table({ config }: { config: ITableConfig }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedRecords, setSortedRecords] = useState(config.records);

  async function handleAction(action: Function, item: any, e: React.MouseEvent) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await action(item);
    } catch (err) {
      setError('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    // If clicking the same field and direction, toggle
    if (field === sortField && direction === sortDirection) {
      const newDirection = direction === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
    } 
    // If clicking the same field but different direction, just update direction
    else if (field === sortField) {
      setSortDirection(direction);
    }
    // If clicking a different field, set new field and direction
    else {
      setSortField(field);
      setSortDirection(direction);
    }

    // Use the new values directly for sorting
    const newSortField = field;
    const newSortDirection = field === sortField && direction === sortDirection 
      ? (direction === 'asc' ? 'desc' : 'asc')
      : direction;

    // Sort with the new values
    const sorted = [...config.records].sort((a, b) => {
      const aValue = a[newSortField.toLowerCase()];
      const bValue = b[newSortField.toLowerCase()];

      // Handle date sorting
      if (newSortField.toLowerCase() === 'date') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return newSortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle number sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return newSortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }

      // Handle object with value property (like points)
      if (aValue && typeof aValue === 'object' && 'value' in aValue &&
          bValue && typeof bValue === 'object' && 'value' in bValue) {
        return newSortDirection === 'asc'
          ? aValue.value - bValue.value
          : bValue.value - aValue.value;
      }

      return 0;
    });

    setSortedRecords(sorted);
  };

  const getSortIconStyle = (field: string, iconType: 'asc' | 'desc') => {
    const isActive = sortField.toLowerCase() === field.toLowerCase();
    const isActiveIcon = sortDirection === iconType;
    
    return {
      opacity: isActive && isActiveIcon ? 1 : 0.3,
      cursor: 'pointer'
    };
  };

  return (
    <>
      {sortedRecords.length ? (
        <table className="table table-hover scroll fs-14" id="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {config.titles.map((title: string) => (
                <th 
                  scope="col" 
                  key={title}
                  className="cpointer"
                >
                  <div className="d-flex align-items-center gap-1">
                    {title}
                    <div className="d-flex">
                      <a onClick={(e) => {
                        e.stopPropagation();
                        handleSort(title, 'asc');
                      }}>
                        <Image 
                          src="/svg/arrow-up-long-fill.svg" 
                          alt="arrow-up-line" 
                          width={10} 
                          height={14}
                          style={getSortIconStyle(title, 'asc')}
                        />
                      </a>
                      <a onClick={(e) => {
                        e.stopPropagation();
                        handleSort(title, 'desc');
                      }}>
                        <Image 
                          src="/svg/arrow-down-long-line.svg" 
                          alt="arrow-down-line" 
                          width={10} 
                          height={14}
                          style={getSortIconStyle(title, 'desc')}
                        />
                      </a>
                    </div>
                  </div>
                </th>
              ))}
              {config.actions && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record: any, index: number) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                {config.titles?.map((header: string) => {
                  const headerKey = header.toLowerCase();
                  const cellValue = record[headerKey];

                  return (
                    <td key={`${record.id}-${headerKey}`}>
                      {cellValue && typeof cellValue === 'object' && 'actions' in cellValue
                        ? <>{cellValue.value} {cellValue.actions.map((action: any) => {
                          return (
                            <a 
                              key={action.actionName} 
                              className='secondary-hover cpointer' 
                              onClick={(e) => handleAction(action.function, record, e)}
                            >
                              <Image key={action.actionName} src={`/svg/${action.iconName}.svg`} alt={action.actionName} width={18} height={18} />
                            </a>
                          )
                        })}</>
                        : cellValue
                      }
                    </td>
                  );
                })}
                {config.actions && (
                  <td>
                    <div className="d-flex gap-2">
                      {config.actions.map((action: any) => (
                        isLoading ? (
                          <div key={`${action.actionName}-spinner`} className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <a
                            key={action.actionName}
                            className='secondary-hover cpointer'
                            onClick={(e) => handleAction(action.function, record, e)}
                          >
                            <Image
                              src={`/svg/${action.iconName}.svg`}
                              alt={action.actionName}
                              width={18}
                              height={18}
                            />
                          </a>
                        )
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No campaigns found</div>
      )}
    </>
  );
}
