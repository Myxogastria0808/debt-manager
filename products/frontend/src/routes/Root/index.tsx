import { useEffect, useState, type ChangeEventHandler, type FC } from 'react';
import styles from './index.module.css';

const Root: FC = () => {
  const [historys, sethistorys] = useState<
    {
      id: number;
      from: string;
      to: string;
      amount: number;
    }[]
  >([]);
  // const fromName = useRef<HTMLInputElement | null>(null);
  // const toName = useRef<HTMLInputElement | null>(null);
  // const amount = useRef<HTMLInputElement | null>(null);
  const [fromName, setFromName] = useState<string>('');
  const [toName, setToName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const fromNameHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFromName(target.value);
  };
  const toNameHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setToName(target.value);
  };
  const amountHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setAmount(Number(target.value));
  };

  useEffect(() => {
    console.log(historys);
  }, [historys]);

  useEffect(() => {
    // const sample = async () => {
    //   const res = await fetch('http://localhost:8787/', {
    //     method: 'GET',
    //   });
    //   console.log(res.text());
    // };
    // sample();
    getHistorys();
  }, []);

  const addHistory = async () => {
    const data = {
      from: fromName,
      to: toName,
      amount: Number(amount),
    };
    await fetch('http://localhost:8787/historys', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    getHistorys();
  };

  const getHistorys = async () => {
    const response = await fetch('http://localhost:8787/historys', {
      method: 'GET',
    });

    sethistorys(await response.json());
  };

  return (
    <>
      <div className={styles.container}>
        <h1>PayCrew</h1>

        <p className={styles.center}>
          まとめ払いの際の支払いをスムーズにするアプリです。
          <br />
          名前と金額を入力して記録できます。
        </p>

        <form id="loan-form" onSubmit={addHistory}>
          <div className={styles.formGroup}>
            <label>まとめて払った人の名前:</label>
            <input type="text" value={fromName} onChange={fromNameHandler} />
          </div>

          <div className={styles.formGroup}>
            <label>返金する人の名前:</label>
            <input type="text" value={toName} onChange={toNameHandler} />
          </div>

          <div className={styles.formGroup}>
            <label>借りた金額 (円):</label>
            <input type="number" id="amount" name="amount" min="1" required value={amount} onChange={amountHandler} />
          </div>

          <button type="submit">追加</button>
        </form>
        <div className={styles.history}>
          <h2>履歴</h2>
          <ul className={styles.historyList}>
            {historys.map((v) => (
              <li>
                {v.from} {v.to} {v.amount}
              </li>
            ))}
          </ul>
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
