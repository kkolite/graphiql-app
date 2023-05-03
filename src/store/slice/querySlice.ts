import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuery } from "../../data/types";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";

interface IState {
  origin: IQuery;
  data: IQuery;
  select: string;
  link: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  origin: {},
  data: {},
  select: '',
  link: '',
  isLoading: false,
  isError: false
};

export const getSchema = createAsyncThunk("data/fetchSchema", async (link: string) => {
  let result: IQuery | null = null;
  let isError = false;
  try {
    const remoteExecutor = buildHTTPExecutor({
      endpoint: link,
    });
    
    const postsSubschema = {
      schema: await schemaFromExecutor(remoteExecutor),
      executor: remoteExecutor,
    };

    const fields = postsSubschema.schema.getQueryType()?.getFields();
    result = JSON.parse(JSON.stringify(fields));
  } catch {
    isError = true;
  }
  
  return {isError, result, link}
});

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSelect(state, { payload }: PayloadAction<string>) {
      state.data = payload
      ? {
          [payload]: state.origin[payload]
        }
      : state.origin;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchema.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchema.fulfilled, (state, action) => {
        const { isError, result , link} = action.payload;
        state.isLoading = false;
        state.isError = isError;
        state.link = link;
        if (!result) return;
        
        state.origin = result;
        state.data = result;
      })
      .addMatcher(isError, (state) => {
        state.isError = true;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export default querySlice.reducer;

export const { setSelect } = querySlice.actions;
