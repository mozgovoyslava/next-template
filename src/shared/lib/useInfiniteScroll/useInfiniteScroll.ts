import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
    onLoadMore: () => void;
    isEnabled?: boolean;
    rootMargin?: string;
}

export const useInfiniteScroll = ({ onLoadMore, isEnabled = true, rootMargin = '200px' }: UseInfiniteScrollOptions) => {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isEnabled) {
            return;
        }

        const node = sentinelRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (!first?.isIntersecting) {
                    return;
                }

                onLoadMore();
            },
            { rootMargin },
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [isEnabled, onLoadMore, rootMargin]);

    return sentinelRef;
};
