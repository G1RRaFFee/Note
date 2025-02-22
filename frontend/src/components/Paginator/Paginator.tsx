import { ReactNode, useEffect, useRef, useState } from "react";

interface PaginatorProps {
  children: React.ReactNode;
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
      { threshold: 1.0 }
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
        <div
          ref={observerRef}
          className="lastItem"
          style={{ height: "10px", backgroundColor: "transparent" }}
        />
      )}
    </div>
  );
};

export default Paginator;
