import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axiosInstance from '../../api/axiosInstance';
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/login', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// --- REGISTER ---
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth.user?.userId;
            const response = await axiosInstance.put(`/api/v1/users/${userId}/change-password`, passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Change password failed');
        }
    }
)
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/v1/auth/forgot', data);
            return response;
        } catch (err) {
            return rejectWithValue('Invalid email or server error');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isLoading: false,
        error: null,
        forgotSuccess: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.isLoading = false;
            localStorage.removeItem("user"); // nếu bạn dùng localStorage
            Cookies.remove('accessToken');
        },
        clearAuthState: (state) => {
            state.loading = false;
            state.error = '';
            state.forgotSuccess = false;
        },

    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;

                const token = action.payload?.accessToken;
                if (token) {
                    Cookies.set('accessToken', token, { expires: 1, path: '/' });
                }

                // ✅ Save user to localStorage
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.forgotSuccess = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;