import React from 'react';

import BoardListItem from './BoardListItem';

const BoardList = (props) => {
    return (
        <div>
            {props.items.map(item => <BoardListItem post={item} />)}
        </div>
    );
};

export default BoardList;