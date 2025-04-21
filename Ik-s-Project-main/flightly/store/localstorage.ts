import {StateStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const zustandStorage: StateStorage = AsyncStorage;
