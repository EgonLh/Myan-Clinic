'use client'; // 🔴 IMPORTANT!!

import { useAppDispatch, useAppSelector } from '../store/hook';
import { decrement, increment, incrementByAmount } from '../store/features/Counter/counter.slice';

export default function Counter() {
  const counter = useAppSelector((state) => state.counter.value); // Return Root State Slices
  const dispatch = useAppDispatch(); // Action Dispatcher

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-12">Count is {counter}</div>

      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>
        <button
          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </button>

        <button
          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch(incrementByAmount(10));
          }}
        >
          Incement By 10
        </button>
      </div>
    </main>
  );
}