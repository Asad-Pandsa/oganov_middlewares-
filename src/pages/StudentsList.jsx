import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";  // Добавлен useState
import { Link } from "react-router-dom";
import { fetchSenateMembers, createStudent } from "../features/students/studentsSlice";
import { FaHeart, FaStar } from "react-icons/fa";
import "../styles/studentsList.css"; 

const StudentsList = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    age: "",
    direction: "",
    post: "",
    description: ""
  });

  const { items, status } = useSelector(state => state.students);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(createStudent({
      id: Date.now(),
      name: form.name,
      age: Number(form.age),  
      direction: form.direction,
      post: form.post,
      description: form.description
    }));

    setForm({
      name: "",
      age: "",
      direction: "",
      post: "",
      description: ""
    });
  };

  useEffect(() => {
    dispatch(fetchSenateMembers());
  }, [dispatch]);

  if (status === "loading") return <p>Загрузка....</p>;

  return (
    <div className="container">
      <h3 className="senate-form-title">Добавить сенатора</h3>

      <form onSubmit={handleSubmit}> 
        <input 
          name="name" 
          placeholder="укажите имя"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          placeholder="укажите возраст"
          value={form.age}
          onChange={handleChange}
          type="number"
          required
        />
        <input
          name="direction"
          placeholder="укажите направление"
          value={form.direction}
          onChange={handleChange}
          required
        />
        <input
          name="post"
          placeholder="укажите должность"
          value={form.post}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="укажите описание"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Добавить</button>
      </form>

      {items.filter(s => s.isFavorite).length > 0 && (
        <>
          <h2 className="senate" style={{ marginTop: '40px', color: '#f39c12' }}>
            <FaStar /> Избранное
          </h2>
          <ul className="senate-list">
            {items.filter(s => s.isFavorite).map(student => {
              const avg = student.ratings?.length 
                ? (student.ratings.reduce((a, b) => a + b, 0) / student.ratings.length).toFixed(1)
                : "0.0";
              return (
                <li key={`fav-${student.id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link to={`/student/${student.id}`}>{student.name}</Link>
                  <span style={{ color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {avg} <FaHeart />
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <h1 className="senate" style={{ marginTop: '40px' }}>Сенаторы</h1>
      <ul className="senate-list">
        {items.map(student => {
          const avg = student.ratings?.length 
            ? (student.ratings.reduce((a, b) => a + b, 0) / student.ratings.length).toFixed(1)
            : "0.0";
          return (
            <li key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/student/${student.id}`}>
                {student.isFavorite && <FaStar style={{ color: '#f39c12', marginRight: '8px' }} />}
                {student.name}
              </Link>
              <span style={{ color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {avg} <FaHeart />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentsList;