import React, {useCallback, useState} from 'react';
import RoundButton from './RoundButton';
import ExpensesModal from './ExpensesModal';

const ExpensesManagement = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onUpdateExpense = useCallback(() => {}, []);

  return (
    <>
      <RoundButton onPress={onOpen} />
      <ExpensesModal
        visible={visible}
        onClose={onClose}
        onUpdateExpense={onUpdateExpense}
      />
    </>
  );
};

export default ExpensesManagement;
