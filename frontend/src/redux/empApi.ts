import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Employee} from "@/types/type";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get All infos
export const fetchGetEmployeeInfos =
    // return value, input value, error value
    createAsyncThunk<Employee[], void, { rejectValue: string }>(
        "fetchGetEmployeeInfos",
        async (_, thunkAPI) => {
            try {
                const response = await axios.get(`${API_URL}/emp/`);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to load data");
            }
        }
    )


// post info
export const fetchPostEmployeeInfos =
    createAsyncThunk<Employee, Employee, { rejectValue: string }>(
        "fetchPostEmployeeInfos",
        async (empInfo, thunkAPI) => {
            try {
                const response = await axios.post(`${API_URL}/emp/`, empInfo);
                console.log("response:", response.data);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to insert data");
            }
        }
    )

// update info
export const fetchPutEmployeeInfos =
    createAsyncThunk<Employee, Employee, { rejectValue: string }>(
        "fetchPutEmployeeInfos",
        async (empInfo, thunkAPI) => {
            try {
                console.log("body:", empInfo);
                const response = await axios.put(`${API_URL}/emp/${empInfo.id}/`, empInfo);
                console.log("response:", response.data);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to update data");
            }
        }
    )


// delete info
export const fetchDeleteEmployeeInfos =
    createAsyncThunk<Employee, Employee, { rejectValue: string }>(
        "fetchDeleteEmployeeInfos",
        async (empInfo, thunkAPI) => {
            try {
                console.log("body:", empInfo);
                const response = await axios.delete(`${API_URL}/emp/${empInfo.id}/`);
                console.log("response:", response.data);
                return response.data;
            } catch {
                return thunkAPI.rejectWithValue("Failed to delete data");
            }
        }
    )