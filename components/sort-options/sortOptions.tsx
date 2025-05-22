import React from 'react';
import classes from './sort-options.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setCurrentPage, setSortBy, setSortOrder } from '@/lib/store/features/searchSlice';

export default function SortOptions() {
    const dispatch = useDispatch();
    const { sortBy, sortOrder } = useSelector((state: RootState) => state.search);

    const handleSortChange = (option: 'stars' | 'forks' | 'updated') => {
        if (sortBy === option) {
            dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            dispatch(setSortBy(option));
            dispatch(setSortOrder('desc'));
        }
        dispatch(setCurrentPage(1));
    };

    return (
        <div className={classes['sort-options']}>
            <span className={classes['sort-label']}>Sort by:</span>
            <button
                className={`${classes['sort-button']} ${sortBy === 'stars' ? classes['active'] : ''}`}
                onClick={() => handleSortChange('stars')}
            >
                Stars {sortBy === 'stars' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
                className={`${classes['sort-button']} ${sortBy === 'forks' ? classes['active'] : ''}`}
                onClick={() => handleSortChange('forks')}
            >
                Forks {sortBy === 'forks' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
                className={`${classes['sort-button']} ${sortBy === 'updated' ? classes['active'] : ''}`}
                onClick={() => handleSortChange('updated')}
            >
                Updated {sortBy === 'updated' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
        </div>
    );
};

