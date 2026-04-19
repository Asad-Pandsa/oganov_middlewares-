import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";  // Добавлен useState
import { useParams, useNavigate } from "react-router-dom";
import { fetchSenateMemberById, clearSelectedMember, updateStudent, toggleLike, toggleFavorite, addRating } from "../features/students/studentsSlice";
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaThumbsUp } from "react-icons/fa";

const StudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedMember, status } = useSelector(state => state.students);

  const [editForm, setEditForm] = useState(null);
  
  useEffect(() => {
    if (selectedMember) {
      setEditForm(selectedMember)
    }
  }, [selectedMember]);

  useEffect(() => {
    dispatch(fetchSenateMemberById(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    dispatch(updateStudent({  // Исправлено название функции
      ...editForm,
      age: Number(editForm.age)  
    }));
    navigate("/");  // Добавлена навигация после обновления
  };

  if (status === "loading") return <p>Загрузка студента...</p>;
  if (!selectedMember) return null;

  const averageRating = selectedMember.ratings?.length 
    ? (selectedMember.ratings.reduce((a, b) => a + b, 0) / selectedMember.ratings.length).toFixed(1)
    : "Нет оценок";

  return (
    <div className="container">
      <button
        onClick={() => {
          dispatch(clearSelectedMember());
          navigate("/");
        }}
      >
        ← Назад
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 className="student-senate-name" style={{ margin: 0 }}>
          {selectedMember.name}
          <button 
            onClick={() => dispatch(toggleFavorite(selectedMember.id))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f39c12', marginLeft: '10px', fontSize: '1.5rem' }}
            title="Добавить в избранное"
          >
            {selectedMember.isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
        <button 
          onClick={() => dispatch(toggleLike(selectedMember.id))}
          style={{ padding: '8px 16px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FaThumbsUp /> {selectedMember.likes} Лайков
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <b>Оценка ({averageRating}): </b>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                onClick={() => dispatch(addRating({ id: selectedMember.id, rating: star }))}
                style={{ cursor: 'pointer', color: '#e74c3c', fontSize: '1.5rem' }}
              >
                <FaHeart />
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="age"><b>Возраст:</b> {selectedMember.age}</p>
      <p className="direction"><b>Группа:</b> {selectedMember.direction}</p>
      <p className="post"><b>Пост:</b> {selectedMember.post}</p>
      <p className="description"><b>Описание:</b> {selectedMember.description}</p>

      {editForm && (
        <>
          <h3 className="senate-form-title">Редактировать</h3>
          <input 
            name="name"
            value={editForm.name}
            onChange={handleChange}
            placeholder="Имя"
          />
          <input 
            name="age"
            value={editForm.age}
            onChange={handleChange}
            placeholder="Возраст"
            type="number"
          />
          <input 
            name="direction"
            value={editForm.direction}
            onChange={handleChange}
            placeholder="Направление"
          />
          <input
            name="post"
            value={editForm.post}
            onChange={handleChange}
            placeholder="Должность"
          />
          <input
            name="description"
            value={editForm.description}
            onChange={handleChange}
            placeholder="Описание"
          />
          <button onClick={handleUpdate}>Сохранить изменения</button>
        </>
      )}
    </div>
  );
};

export default StudentDetail;  // Исправлен экспорт