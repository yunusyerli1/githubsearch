'use client';
import { ITableConfig } from '@/lib/hooks/useTable';
import Image from 'next/image';
import { useState } from 'react';

export function Table({ config }: { config: ITableConfig }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(action: Function, item: any, e: React.MouseEvent) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await action(item);
    } catch (err) {
      setError('An error occurred while processing your request');
      console.error('Error executing action:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {config.records.length ? (
        <table className="table table-hover scroll fs-14" id="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {
                config.titles.map((title: string) => (<th scope="col" key={title}>{title}</th>))
              }
              {config.actions && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {config.records.map((record: any, index: number) => (
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
