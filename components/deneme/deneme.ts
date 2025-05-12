
import { ICampaign } from '@/lib/models/ICampaign';
import { useState } from 'react';


interface UseTableProps {
  data: ICampaign[];
  initialSortField?: keyof ICampaign;
  initialSortDirection?: 'asc' | 'desc';
}

interface UseTableReturn {
  sortedData: ICampaign[];
  sortField: keyof ICampaign;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: keyof ICampaign) => void;
  searchTerm: string;
  handleSearch: (term: string) => void;
}

export function useTable({ 
  data, 
  initialSortField = 'title', 
  initialSortDirection = 'asc' 
}: UseTableProps): UseTableReturn {
  const [sortField, setSortField] = useState<keyof ICampaign>(initialSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof ICampaign) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const sortedData = [...data]
    .filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort,
    searchTerm,
    handleSearch
  };
} 