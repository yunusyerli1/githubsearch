import classes from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function RepositoryList({ currentPage, totalPages, onPageChange }: PaginationProps) {

    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  
    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
        <div className={classes['pagination']}>
      <button
        className={classes['pagination-button']}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button
            className={classes['pagination-button']}
            onClick={() => onPageChange(1)}
            aria-label="Go to first page"
          >
            1
          </button>
          {startPage > 2 && <span className={classes['pagination-ellipsis']}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`${classes['pagination-button']} ${currentPage === page ? classes['active'] : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={classes['pagination-ellipsis']}>...</span>}
          <button
            className={classes['pagination-button']}
            onClick={() => onPageChange(totalPages)}
            aria-label="Go to last page"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={classes['pagination-button']}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
    )
}