'use client';

import { RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import classes from './repository-list.module.scss';
import LoadingSpinner from "../loading-spinner/loadingSpinner";
import SortOptions from "../sort-options/sortOptions";
import Pagination from "../pagination/pagination";
import { setCurrentPage } from "@/lib/store/features/searchSlice";
import RepositoryCard from "../repository-card/repositoryCard";
import { IRepository } from '@/lib/models/IRepository';

interface RepositoryListProps {
    repositories: IRepository[];
    isLoading: boolean;
}

export default function RepositoryList({ repositories, isLoading }: RepositoryListProps) {
    const dispatch = useDispatch();
    const {
        currentQuery,
        error,
        totalCount,
        itemsPerPage,
        currentPage
    } = useSelector((state: RootState) => state.search);

    const totalPages = totalCount ? Math.ceil(totalCount / itemsPerPage) : 0;

    console.log("repositories", repositories);
    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };
    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
    if (error) {
        return (
            <div className={classes['error']}>
                Error: {error}
            </div>
        )
    }
    if (!currentQuery) {
        return (
            <div className={classes['no-search']}>
                <p>Enter a search term to find repositories</p>
            </div>
        )
    }

    if (!isLoading && currentQuery && !repositories.length) {
        return (
            <div className={classes['empty-state']} role="status">
                <div className={classes['empty-icon']} aria-hidden="true">📁</div>
                <div>No repositories found</div>
                <div className={classes['empty-subtext']}>Try searching for something else</div>
            </div>
        );
    }

    return (
        <div className={classes['repository-container']}>
            <div className={classes['results-count']} role="status" aria-live="polite">
                Found {totalCount} repositories
            </div>
            <SortOptions />
            <div className={classes['repository-list']} role="list">
                {repositories.map((repo) => (
                    <RepositoryCard key={repo.id} repo={repo} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
} 