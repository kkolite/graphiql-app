import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuery } from '../../data/types';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { GraphQLFieldConfigMap, GraphQLFieldMap } from 'graphql';
import { createObj } from '../../utils/createObj';

interface IState {
  origin: IQuery;
  data: IQuery;
  schema: GraphQLFieldConfigMap<unknown, unknown> | undefined;
  select: string;
  isLoading: boolean;
}

const initialState: IState = {
  origin: {},
  data: {},
  schema: undefined,
  select: '',
  isLoading: false,
};

export const getSchema = createAsyncThunk('data/fetchSchema', async (link: string) => {
  let result: IQuery | null = null;

  const remoteExecutor = buildHTTPExecutor({
    endpoint: link,
  });

  const postsSubschema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
  };

  const schema = postsSubschema.schema.getQueryType()?.getFields() as GraphQLFieldMap<unknown, unknown>;
  result = createObj(schema);

  return result;
});

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setSelect(state, { payload }: PayloadAction<string>) {
      state.data = payload
        ? {
            [payload]: state.origin[payload],
          }
        : state.origin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchema.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchema.fulfilled, (state, action) => {
        const result = action.payload;
        state.isLoading = false;
        if (!result) return;

        state.origin = result;
        state.data = result;
      })
      .addMatcher(isError, (state) => {
        state.isLoading = false;
        state.data = {};
        state.origin = {};
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export default querySlice.reducer;

export const { setSelect } = querySlice.actions;
