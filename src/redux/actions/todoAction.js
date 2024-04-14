import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo } from '../reducers/todoReducer';
// địa chỉ API bạn nên cho vào 1 biến, để sau có chỉnh sửa sẽ không phải chỉnh nhiều lần
const api_url = 'http://192.168.1.30:3000/SinhVien';
export const fetchTodos = () => {
 return async dispatch => {
   try {
     const response = await fetch(api_url);
     const data = await response.json();
     // dữ liệu lấy được từ api về, duyệt mảng và lưu vào store của redux
      // console.log(data);
     data.forEach(row => {
       
       dispatch(addTodo( row));  // trong ví dụ trước ở screen khi thêm sẽ sử dụng dispatch, ở ví dụ này cũng dùng lại cách đó
     });
   } catch (error) {
     console.error('Error fetching todos:', error);
   }
 };
};

export const deleteTodoApi = createAsyncThunk(
    'todo/deleteTodoApi',
    async (id, thunkAPI) => {
      try {
        // Gửi yêu cầu DELETE đến API để xóa todo
        const response = await fetch(`${api_url}/${id}`, {
          method: 'DELETE',
        });
        // console.log(response);
        if (response.ok) {
            // console.log(response);
          // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
          // action.payload ở trong reducer sẽ chính là id
           return id; 
        } else {
          // Nếu có lỗi từ phía server, trả về lỗi cho reducer
          const errorData = await response.json();
          return thunkAPI.rejectWithValue(errorData);
        }
      } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra 
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  // add

  export const addTodoAPI = createAsyncThunk(
    'todos/addTodoAPI',
    async (todoData, thunkAPI) => {
      console.log(todoData);
      try {
        // Gửi yêu cầu DELETE đến API để xóa todo
        const response = await fetch(api_url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todoData)
        });
        const data = await response.json();
        // console.log(response);
        // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
        if (response.ok) {
            // console.log(response);
          // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
           return data; 
        } else {
          // Nếu có lỗi từ phía server, trả về lỗi
          const errorData = await response.json();
          return thunkAPI.rejectWithValue(errorData);
        }
      } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const updateTodoApi = createAsyncThunk(
    'todos/updateTodoApi',
    async (formData, thunkAPI) => {
      // console.log('objupdate: '+ JSON.stringify(objUpdate));
       try {
        // Gửi yêu cầu DELETE đến API để xóa todo
  
        const response = await fetch(`${api_url}/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.data)
        });
        
        const data = await response.json();
        // console.log(response);
        // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
        if (response.ok) {
            // console.log(response);
          // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
           return data; 
        } else {
          // Nếu có lỗi từ phía server, trả về lỗi
          const errorData = await response.json();
          return thunkAPI.rejectWithValue(errorData);
        }
      } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  