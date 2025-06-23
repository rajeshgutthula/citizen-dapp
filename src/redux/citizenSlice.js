import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { web3, contract, contractWithMetaMask } from '../utils/web3';
import { toast } from 'react-toastify';

export const fetchCitizens = createAsyncThunk(
  'citizen/fetch',
  async (_, thunkAPI) => {
    try {
      const latest = Number(await web3.eth.getBlockNumber()); // ✅ convert BigInt to Number
      const BATCH_SIZE = 500;
      const fromBlock = latest - 2000 > 0 ? latest - 2000 : 0;

      const allEvents = [];

      for (let start = fromBlock; start <= latest; start += BATCH_SIZE) {
        const end = Math.min(start + BATCH_SIZE - 1, latest);
        console.log(`Fetching events from blocks ${start} to ${end}`);

        const events = await contract.getPastEvents('Citizen', {
          fromBlock: start,
          toBlock: end,
        });

        allEvents.push(...events);
      }

      const citizens = await Promise.all(
        allEvents.map(async (event) => {
          try {
            const { id, age, name, city } = event.returnValues;

            const idStr = id.toString();
            const ageStr = age.toString();

            const idNum = Number(idStr);
            const ageNum = Number(ageStr);

            let note = '(none)';
            try {
              note = await contract.methods.getNoteByCitizenId(idStr).call();
            } catch (e) {
              console.warn(`No note for citizen ID ${idStr}:`, e.message);
            }

            return {
              id: idNum,
              age: ageNum,
              name: String(name),
              city: String(city),
              someNote: note,
            };
          } catch (innerErr) {
            console.error('⛔ Error processing event:', innerErr);
            return null;
          }
        })
      );

      return citizens.filter(Boolean);
    } catch (err) {
      console.error('❌ Fetch Citizens Error:', err);
      toast.error('Failed to load citizens: ' + (err.message || err));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Add Citizen (must use MetaMask)
export const addCitizen = createAsyncThunk(
  'citizen/add',
  async ({ name, age, city, someNote }, thunkAPI) => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await contractWithMetaMask.methods
        .addCitizen(parseInt(age, 10), String(city), String(name), String(someNote))
        .send({ from: accounts[0] });

      toast.success('Citizen added!');
      thunkAPI.dispatch(fetchCitizens());
      return true;
    } catch (err) {
      console.error('❌ Add Citizen Error:', err);
      toast.error('Failed to add citizen');
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice
const citizenSlice = createSlice({
  name: 'citizen',
  initialState: {
    citizens: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitizens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitizens.fulfilled, (state, action) => {
        state.loading = false;
        state.citizens = action.payload;
      })
      .addCase(fetchCitizens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCitizen.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default citizenSlice.reducer;