import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setLoading, setError, setRepositories, setTotalCount } from '@/lib/store/features/searchSlice';
import { IRepository } from '@/lib/models/IRepository';

export function useSearch() {
    const dispatch = useDispatch();
    const { currentQuery, isLoading, error, sortBy, sortOrder } = useSelector((state: RootState) => state.search);
    const itemsPerPage = 10;
    const page = 1;
    let url = `https://api.github.com/search/repositories?q=${encodeURIComponent(currentQuery)}&per_page=${itemsPerPage}&page=${page}`;

    useEffect(() => {
        async function fetchRepositories() {
            if (!currentQuery.trim()) return;

            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                if (sortBy) {
                    url += `&sort=${sortBy}&order=${sortOrder}`;
                }
                
                const response = await fetch(url);
                const data = await response.json();
                dispatch(setRepositories(data.items as IRepository[]));
                dispatch(setTotalCount(data.total_count));
                
            } catch (err) {
                dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchRepositories();
    }, [currentQuery, sortBy, sortOrder, dispatch]);

    return {
        currentQuery,
        isLoading,
        error
    };
} 