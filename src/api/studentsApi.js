// studentsApi.js

const senateMembers = [
{
    id: 1,
    name: "Амир",
    age: 19,
    direction: "BA",
    post: "Президент",
    description: "Координирует работу всего сената, представляет интересы студентов на собраниях с администрацией, ведет заседания",
    likes: 0,
    isFavorite: false,
    ratings: []
},
{
    id: 2,
    name: "Айзирек",
    age: 19,
    direction: "IR",
    post: "Вице-президент",
    description: "Помогает президенту в организационных вопросах, контролирует выполнение решений сената, курирует несколько направлений",
    likes: 0,
    isFavorite: false,
    ratings: []
},
{
    id: 3,
    name: "Асад",
    age: 19,
    direction: "IT",
    post: "Арт-директор / Сценарист / Режиссер",
    description: "Отвечает за творческую часть мероприятий, пишет сценарии для студенческих событий, занимается постановкой выступлений",
    likes: 0,
    isFavorite: false,
    ratings: []
},
{
    id: 4,
    name: "Перизат",
    age: 19,
    direction: "IR",
    post: "SMM-менеджер",
    description: "Ведет социальные сети сената, создает контент для Instagram и TikTok, занимается фото- и видеосъемкой мероприятий",
    likes: 0,
    isFavorite: false,
    ratings: []
},
{
    id: 5,
    name: "Мерей",
    age: 19,
    direction: "LNG",
    post: "SMM-менеджер",
    description: "Помогает с ведением соцсетей, пишет посты, берет интервью у студентов и преподавателей",
    likes: 0,
    isFavorite: false,
    ratings: []
},
{
    id: 6,
    name: "Илья",
    age: 19,
    direction: "BA",
    post: "Ведущий мероприятий",
    description: "Отвечает за проведение студенческих мероприятий, работает с аудиторией, объявляет номера и ведет официальную часть",
    likes: 0,
    isFavorite: false,
    ratings: []
}
];

// Создаем копию массива для мутаций (чтобы не изменять исходный массив)
let mutableSenateMembers = [...senateMembers];

// имитация задержки сервера
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Получить всех членов сената
export const fetchSenateMembersApi = async () => {
    await delay(500);
    return mutableSenateMembers;
};

// Получить одного члена сената по id
export const fetchSenateMemberByIdApi = async (id) => {
    await delay(300);
    return mutableSenateMembers.find(member => member.id === Number(id));
};

// Получить членов сената по должности
export const fetchSenateMembersByPostApi = async (post) => {
    await delay(400);
    return mutableSenateMembers.filter(member => member.post.toLowerCase().includes(post.toLowerCase()));
};

// Получить членов сената по направлению обучения
export const fetchSenateMembersByDirectionApi = async (direction) => {
    await delay(400);
    return mutableSenateMembers.filter(member => member.direction.toLowerCase().includes(direction.toLowerCase()));
};

// ДОБАВЛЯЕМ НОВЫЕ ФУНКЦИИ:

// Создать нового члена сената
export const createStudentApi = async (studentData) => {
    await delay(500);
    
    // Создаем нового члена с уникальным id
    const newMember = {
        likes: 0,
        isFavorite: false,
        ratings: [],
        ...studentData,
        id: Math.max(...mutableSenateMembers.map(m => m.id), 0) + 1 // генерируем новый id
    };
    
    // Добавляем в массив
    mutableSenateMembers.push(newMember);
    
    return newMember;
};

// Обновить существующего члена сената
export const updateStudentApi = async (studentData) => {
    await delay(500);
    
    const index = mutableSenateMembers.findIndex(member => member.id === Number(studentData.id));
    
    if (index === -1) {
        throw new Error("Студент не найден");
    }
    
    // Обновляем данные
    mutableSenateMembers[index] = {
        ...mutableSenateMembers[index],
        ...studentData,
        id: Number(studentData.id) // убеждаемся, что id - число
    };
    
    return mutableSenateMembers[index];
};

// Удалить члена сената (опционально, если понадобится)
export const deleteStudentApi = async (id) => {
    await delay(500);
    
    const index = mutableSenateMembers.findIndex(member => member.id === Number(id));
    
    if (index === -1) {
        throw new Error("Студент не найден");
    }
    
    const deletedMember = mutableSenateMembers[index];
    mutableSenateMembers = mutableSenateMembers.filter(member => member.id !== Number(id));
    
    return deletedMember;
};

// Сбросить данные к исходным (для тестирования)
export const resetToOriginalDataApi = async () => {
    await delay(300);
    mutableSenateMembers = [...senateMembers];
    return mutableSenateMembers;
};