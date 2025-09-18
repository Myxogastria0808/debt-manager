import { useEffect, useState, type FC } from 'react';
import styles from './index.module.css';

const Root: FC = () => {
  const [geso, setGeso] = useState('');
  useEffect(() => {
    sample();
  }, []);

  useEffect(() => {
    console.log(geso);
  }, [geso]);

  async function sample() {
    const data = {
      name: 'geso',
      email: 'sakana@geso.com',
      password: 'super-unko',
    };
    const response = await fetch('https://debt-manager-api.yukiosada.work/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    setGeso(await response.json());
  }

  return (
    <>
      <div className={styles.container}>
        <h1>お金の貸し借り管理</h1>

        <p>{geso}</p>

        <button onClick={sample}>sample</button>

        <form id="loan-form">
          <div className={styles.formGroup}>
            <label>借りた人の名前:</label>
            <input type="text" value="formData.name" />
          </div>

          <div className={styles.formGroup}>
            <label>借りた金額 (円):</label>
            <input type="number" id="amount" name="amount" min="1" required />
          </div>

          <button type="submit">追加</button>
        </form>

        <div className={styles.history}>
          <h2>履歴</h2>
          <ul className={styles.historyList}></ul>
        </div>

        <div className={styles.reminder}>
          <h2>リマインダー通知</h2>
          <p className={styles.reminderMessage}>現在通知はありません。</p>
        </div>
      </div>
    </>
  );
};

export default Root;
