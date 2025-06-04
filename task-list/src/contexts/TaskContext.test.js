import { act, renderHook } from '@testing-library/react';
import { TaskProvider, TaskContext } from './TaskContext';
import { useContext } from 'react';

const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;

describe('TaskContext reducer', () => {
  it('adds a task', () => {
    const { result } = renderHook(() => useContext(TaskContext), { wrapper });

    act(() => {
      result.current.addTask({ id: '1', title: 'Test Task', completed: false });
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Test Task');
  });

  it('toggles task completion', () => {
    const { result } = renderHook(() => useContext(TaskContext), { wrapper });

    act(() => {
      result.current.addTask({ id: '2', title: 'Toggle Me', completed: false });
    });

    act(() => {
      result.current.toggleTask('2');
    });

    expect(result.current.tasks.find(t => t.id === '2').completed).toBe(true);
  });
});
