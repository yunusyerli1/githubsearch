'use client';
import { ITableConfig } from '@/lib/hooks/useTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {
  setCurrentPage,
  setSortField,
  setSortDirection,
  setLoading,
  setError,
} from '@/lib/store/features/tableSlice';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { openModal } from '@/lib/store/features/modalSlice';
import { setCampaigns } from '@/lib/store/features/campaignSlice';

export function Table({ config }: { config: ITableConfig }) {
  const dispatch = useDispatch();
  const {
    currentPage,
    sortField,
    sortDirection,
    isLoading,
    error,
    recordsPerPage,
  } = useSelector((state: RootState) => state.table);

  const [sortedRecords, setSortedRecords] = useState(config.records);

  useEffect(() => {
    // Clean the campaign data by removing non-serializable parts
    const cleanCampaigns = config.records.map(campaign => {
      const cleanCampaign = { ...campaign };
      if (cleanCampaign.points && cleanCampaign.points.actions) {
        // Create a new points object without the function references
        cleanCampaign.points = {
          ...cleanCampaign.points,
          actions: cleanCampaign.points.actions.map((action: { actionName: string; iconName: string }) => ({
            actionName: action.actionName,
            iconName: action.iconName
          }))
        };
      }
      return cleanCampaign;
    });
    
    dispatch(setCampaigns(cleanCampaigns));
  }, [dispatch, config.records]);

  async function handleAction(action: Function, item: any, e: React.MouseEvent) {
    e.preventDefault();
    if (isLoading) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const result = await action(item);
      if (result.showDialog) {
        console.log("result:", result);
        dispatch(openModal({
          title: "Edit Campaign",
          contentType: "CampaignForm",
          contentProps: { campaign: result.newItem }, 
          modalType: "Update"
        }));
      } else if (result.success) {
        // If it's a successful delete, refresh the page
        window.location.reload();
      }
    } catch (err) {
      dispatch(setError('An error occurred while processing your request'));
    } finally {
      dispatch(setLoading(false));
    }
  }

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    // If clicking the same field and direction, toggle
    if (field === sortField && direction === sortDirection) {
      const newDirection = direction === 'asc' ? 'desc' : 'asc';
      dispatch(setSortDirection(newDirection));
    }
    // If clicking the same field but different direction, just update direction
    else if (field === sortField) {
      dispatch(setSortDirection(direction));
    }
    // If clicking a different field, set new field and direction
    else {
      dispatch(setSortField(field));
      dispatch(setSortDirection(direction));
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

  // Calculate pagination values
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = useMemo(() => {
    return sortedRecords.slice(startIndex, endIndex);
  }, [sortedRecords, startIndex, endIndex]);

  return (
    <>
      {sortedRecords.length ? (
        <>
          <table className="table table-hover scroll fs-14" id="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                {config.titles.map((title: string) => (
                  <th
                    scope="col"
                    key={title}
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
              {currentRecords.map((record: any, index: number) => (
                <tr key={record.id}>
                  <td>{startIndex + index + 1}</td>
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

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {startIndex + 1} to {Math.min(endIndex, sortedRecords.length)} of {sortedRecords.length} entries
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => dispatch(setCurrentPage(1))}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-3 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => dispatch(setCurrentPage(totalPages))}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>No campaigns found</div>
      )}
    </>
  );
}
