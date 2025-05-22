'use client';

import { useSearch } from '@/lib/hooks/useSearch';
import Search from '../../components/search/search';
import RepositoryList from '../../components/repository-list/repositoryList';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';


export default function SearchContainer() {
    useSearch();

    const {
        repositories,
        isLoading
    } = useSelector((state: RootState) => state.search);

    return (
        <div className="container">
            <Search labelProp="Search repositories" />
            <RepositoryList repositories={repositories} isLoading={isLoading} />
        </div>
    );
} 