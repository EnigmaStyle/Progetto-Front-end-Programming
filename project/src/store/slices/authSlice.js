import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();
    const user = users.find(
      u => u.username === username && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();
    
    const usernameExists = users.some(user => user.username === userData.username);
    const emailExists = users.some(user => user.email === userData.email);
    
    if (usernameExists) {
      throw new Error('Username already exists');
    }
    if (emailExists) {
      throw new Error('Email already exists');
    }

    const newUser = {
      ...userData,
      id: users.length + 1,
      role: 'user'
    };

    const createResponse = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!createResponse.ok) {
      throw new Error('Failed to create user');
    }

    return newUser;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.role === 'admin';
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = false;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;