import { createContext, useContext, useState, useCallback } from 'react';

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState(null);

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      setConfirmState({
        message,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }, []);

  const handleClose = () => setConfirmState(null);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {confirmState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-sm text-center space-y-4">
            <p className="text-gray-800">{confirmState.message}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  confirmState.onConfirm();
                  handleClose();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  confirmState.onCancel();
                  handleClose();
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
