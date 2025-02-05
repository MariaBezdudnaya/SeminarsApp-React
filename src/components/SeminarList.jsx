import React, { useState, useEffect } from 'react';
import SeminarEdit from './SeminarEdit';
import SeminarItem from './SeminarItem';
import Modal from './Modal';
import { fetchData, deleteData, updateData } from '../apiService';

function SeminarList() {
  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedSeminar, setUpdatedSeminar] = useState(null);

  useEffect(() => {
    const fetchSeminars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchData();
        setSeminars(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeminars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот семинар?')) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteData(id);
        // console.log("ID для удаления (handleDelete):", id, typeof id);
        setSeminars(prevSeminars => prevSeminars.filter(seminar => Number(seminar.id) !== Number(id)));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (seminar) => {
    setUpdatedSeminar(seminar)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setUpdatedSeminar(null)
  }

  const handleUpdateSeminar = async (updatedSeminar) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateData(updatedSeminar);
      setSeminars(seminars.map((seminar) => {
        return Number(seminar.id) === Number(updatedSeminar.id) ? updatedSeminar : seminar;
      }));
      handleCloseModal();
    } catch (error) {
      console.error("Error updating seminar:", error);
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки данных: {error.message}</div>;
  }

  return (
    <div className='seminar-list'>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <SeminarEdit
            seminar={updatedSeminar}
            onSave={handleUpdateSeminar}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default SeminarList;
