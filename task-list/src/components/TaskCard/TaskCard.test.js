import { render, screen } from '@testing-library/react';
import TaskCard from './index';
import { TaskContext } from '../../contexts/TaskContext';

const mockTask = {
  id: '1',
  title: 'Test Card',
  description: 'Test Description',
  completed: false,
  dueDate: '2025-06-04',
};

const mockContext = {
  deleteTask: jest.fn(),
  toggleTask: jest.fn(),
};

describe('TaskCard', () => {
  it('renders task title and description', () => {
    render(
      <TaskContext.Provider value={mockContext}>
        <TaskCard task={mockTask} />
      </TaskContext.Provider>
    );

    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
  });
});
