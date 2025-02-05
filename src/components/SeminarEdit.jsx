import React, { useState, useEffect } from 'react';

const SeminarEdit = ({ seminar, onSave, onCancel }) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [photo, setPhoto] = useState(seminar.photo);

  useEffect(() => {
    setTitle(seminar.title)
    setDescription(seminar.description)
    setDate(seminar.date)
    setPhoto(seminar.photo)
  }, [seminar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSeminar = { ...seminar, title, description, date, photo};
    onSave(updatedSeminar);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Описание:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Дата:</label>
        <input
          type="text"
          id="date"
          value={date}
            onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Фото:</label>
        <input
          type="text"
          id="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
        />
      </div>

      <div className='modal-buttons'>
        <button className='modal-button' type="submit">Сохранить</button>
        <button className='modal-button' type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default SeminarEdit;
