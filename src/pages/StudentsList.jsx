import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";  // Добавлен useState
import { Link } from "react-router-dom";
import { fetchSenateMembers, createStudent } from "../features/students/studentsSlice";  // Добавлен импорт createStudent
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

      <h1 className="senate">Сенаторы</h1>
      <ul className="senate-list">
        {items.map(student => (
          <li key={student.id}>
            <Link to={`/student/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;