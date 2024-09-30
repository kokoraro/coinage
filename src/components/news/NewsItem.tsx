import React from 'react';

interface NewsItemProps {

}

const NewsItem = ({ ...props }: NewsItemProps): JSX.Element => {
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, corporis provident hic culpa dolor a accusantium deserunt mollitia consectetur doloribus officia unde exercitationem nulla praesentium? Vel dolorum natus suscipit consectetur?
        </div>
    );
};

export default NewsItem;
