import { useEffect, useState, type FC } from 'react';
import styles from './index.module.css';

const Root: FC = () => {
  const [res, setRes] = useState('');

  useEffect(() => {
    const sample = async () => {
      const response = await fetch('http://localhost:8787/');
      setRes(await response.text());
    };
    sample();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>PayCrew</h1>

        <p>{res}</p>

        <p className={styles.center}>
          まとめ払いの際の支払いをスムーズにするアプリです。
          <br />
          名前と金額を入力して記録できます。
        </p>

        <form id="loan-form">
          <div className={styles.formGroup}>
            <label>借りた人の名前:</label>
            <input type="text" />
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
