import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";  // Добавлен useState
import { useParams, useNavigate } from "react-router-dom";
import { fetchSenateMemberById, clearSelectedMember, updateStudent } from "../features/students/studentsSlice";  // Исправлен импорт updateStudent

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

      <h2 className="student-senate-name">{selectedMember.name}</h2>
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