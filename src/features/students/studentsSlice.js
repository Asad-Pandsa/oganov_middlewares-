import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    fetchSenateMembersApi, 
    fetchSenateMemberByIdApi,
    createStudentApi,        
    updateStudentApi        
} from "../../api/studentsApi.js";

export const fetchSenateMembers = createAsyncThunk(
    "students/fetchAll", 
    async () => {
        return await fetchSenateMembersApi();
    }
);

export const fetchSenateMemberById = createAsyncThunk(
    "students/fetchById",
    async (id) => {
        return await fetchSenateMemberByIdApi(id);
    }
);

// Добавляем экшен для создания студента
export const createStudent = createAsyncThunk(
    "students/create",
    async (studentData) => {
        return studentData;
    }
);

// Добавляем экшен для обновления студента
export const updateStudent = createAsyncThunk(
    "students/update",
    async (studentData) => {
        return studentData;
    }
);

const studentsSlice = createSlice({
    name: "students",
    initialState: {
        items: [],
        selectedMember: null,
        status: "idle",
        error: null
    },
    reducers: {
        clearSelectedMember(state) {
            state.selectedMember = null;
        },
        toggleLike(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) item.likes += 1;
            if (state.selectedMember && state.selectedMember.id === id) {
                state.selectedMember.likes += 1;
            }
        },
        toggleFavorite(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) item.isFavorite = !item.isFavorite;
            if (state.selectedMember && state.selectedMember.id === id) {
                state.selectedMember.isFavorite = !state.selectedMember.isFavorite;
            }
        },
        addRating(state, action) {
            const { id, rating } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) item.ratings.push(rating);
            if (state.selectedMember && state.selectedMember.id === id) {
                state.selectedMember.ratings.push(rating);
            }
        }
    },
    extraReducers: (builder) => {
        builder 
            // Обработка fetchSenateMembers
            .addCase(fetchSenateMembers.pending, (state) => {
                state.status = "loading";
            }) 
            .addCase(fetchSenateMembers.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (state.items.length === 0) {
                    state.items = action.payload;
                }
            })
            .addCase(fetchSenateMembers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;     
            })
            
            // Обработка fetchSenateMemberById
            .addCase(fetchSenateMemberById.pending, (state) => {
                state.status = "loading";
            }) 
            .addCase(fetchSenateMemberById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const localItem = state.items.find(i => i.id === action.payload.id);
                state.selectedMember = localItem || action.payload;
            })
            .addCase(fetchSenateMemberById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;     
            })
            
            // Добавляем обработку createStudent
            .addCase(createStudent.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            
            // Добавляем обработку updateStudent
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                // Обновляем selectedMember если это тот же студент
                if (state.selectedMember?.id === action.payload.id) {
                    state.selectedMember = action.payload;
                }
            });
    }
}); 

export const { clearSelectedMember, toggleLike, toggleFavorite, addRating } = studentsSlice.actions;
export default studentsSlice.reducer;