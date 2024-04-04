import React from 'react';

// An invisible heading that is sr-only just for reference to TOC in blogs
export const InvisibleHeading = ({ heading, level = 2 }: { heading: string; level?: number }) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <HeadingTag className="sr-only" aria-hidden="true">
            {heading}
        </HeadingTag>
    );
};