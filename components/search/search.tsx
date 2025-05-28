'use client';
import { useState } from "react";
import classes from './search.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setCurrentQuery, setError, setLoading } from "@/lib/store/features/searchSlice";

interface SearchProps {
    labelProp: string;
}

export default function Search({ labelProp }: SearchProps) {

    const dispatch = useDispatch();
    const { currentQuery, isLoading, error } = useSelector((state: RootState) => state.search);
    const [query, setQuery] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                //await new Promise(resolve => setTimeout(resolve, 2000));
                dispatch(setCurrentQuery(query.trim()));
            } catch (err) {
                dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    return (
        <div className={classes['search-wrapper']}>
            <form
                className={classes['search-container']}
                onSubmit={handleSubmit}
                role="search"
                aria-label={labelProp}
            >
                <div className={classes['search-input-wrapper']}>
                    <label htmlFor="search-input" className={classes['visually-hidden']}>
                        {labelProp}
                    </label>
                    <input
                        id="search-input"
                        type="text"
                        className={classes['search-input']}
                        value={query}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        placeholder={`${labelProp}...`}
                        aria-label={labelProp}
                        aria-required="true"
                        aria-describedby="search-description"
                        disabled={isLoading}
                    />
                    <span id="search-description" className={classes['visually-hidden']}>
                        Enter a search term to find the query
                    </span>
                    {error && <div className={classes['error-message']}>{error}</div>}
                </div>
                <button
                    type="submit"
                    className={classes['search-button']}
                    aria-label="Submit search"
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
}