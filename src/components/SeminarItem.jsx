import React from 'react';

function SeminarItem({ seminar, onDelete, onEdit }) {
  return (
    <div className="seminar-item">
      <div className='date'>Дата: {seminar.date}</div>
      <div className='seminar-info'>
        <div className='photo'>
          <img src={seminar.photo} alt={seminar.title} />
        </div>

        <div className="text">
          <div className='title'>{seminar.title}</div>
          <hr className='width="300px'/>
          <p className='description'>{seminar.description}</p>
        </div>
      </div>

      <div className="seminar-buttons">
        <button className='edit-button' onClick={() => onEdit(seminar)}></button>
        <button className='delete-button' onClick={() => onDelete(seminar.id)}></button>
      </div>
    </div>
  );
}

export default SeminarItem;