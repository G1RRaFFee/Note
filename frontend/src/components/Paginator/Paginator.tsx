import { ReactNode, useEffect, useRef, useState } from "react";

interface PaginatorProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
}

const Paginator = ({
  children,
  onLoadMore,
  hasMore,
}: PaginatorProps): ReactNode => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    if (observer && observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, onLoadMore]);

  return (
    <div className="Paginator">
      {children}
      {hasMore && (
        <div ref={observerRef} style={{ height: 1, backgroundColor: "pink" }} />
      )}
    </div>
  );
};

export default Paginator;
