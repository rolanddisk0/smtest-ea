import React from 'react'
import { Button } from 'semantic-ui-react'
// import Button from '@material-ui/core/Button';

const BetweenButton = () => <Button content='...' style={{ cursor: 'default' }}/>

const Paginator = ({ currentPage, onPageChange, range = 3, pageCount }) => {
  const renderedPages = [...Array(range * 2 + 1).keys()]
    .map(i => currentPage - range + i)
    .filter(i => i > 0 && i <= pageCount)

  const showStart = currentPage - range > 1
  const showEnd = currentPage + range < pageCount

  return (
    <Button.Group compact>
      {showStart && (
        [
          <Button content={1} onClick={() => onPageChange(1)} key={'showStart'}/>,
          <BetweenButton key={'betweenShowStart'}/>
        ]
      )}
      {renderedPages.map(page => (
        <Button 
          key={page}
          onClick={() => onPageChange(page)} 
          content={page}
          primary={currentPage === page}
        />
      ))}
      {showEnd && (
        [
          <BetweenButton key={'betweenShowEnd'}/>, 
          <Button content={pageCount} onClick={() => onPageChange(pageCount)} key={'showEnd'}/>
        ]
      )}
    </Button.Group>
  )
}

export default Paginator