import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

const Root: React.FC = () => {
  //const backendURL = 'http://localhost:8787';
  const backendURL = 'https://debt-manager-api.yukiosada.work';

  const [historys, setHistorys] = useState<
    {
      id: number;
      from: string;
      to: string;
      amount: number;
    }[]
  >([]);
  const fromInput = useRef<HTMLInputElement>(null);
  const toInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getHistorys();
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    addHistory(fromInput.current!.value, toInput.current!.value, Number(amountInput.current!.value));
    event.currentTarget.reset();
  };

  const addHistory = async (fromName: string, toName: string, amount: number) => {
    const data = {
      from: fromName,
      to: toName,
      amount: Number(amount),
    };
    await fetch(`${backendURL}/historys`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    getHistorys();
  };

  const getHistorys = async () => {
    const response = await fetch(`${backendURL}/historys`, {
      method: 'GET',
    });

    setHistorys(await response.json());
  };

  const deleteHistoryById = async (id: number) => {
    await fetch(`${backendURL}/historys`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
        from: '',
        to: '',
        amount: 0,
      }),
    });

    getHistorys();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.backgroundAlpha}>
            <h1 className={styles.title}>PayCrew</h1>

            <p className={styles.description}>
              まとめ払いの際の支払いをスムーズにするアプリです。
              <br />
              名前と金額を入力して記録できます。
            </p>
          </div>
        </div>

        <form id="loan-form" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>まとめて払った人の名前:</label>
            <input type="text" ref={fromInput} />
          </div>

          <div className={styles.formGroup}>
            <label>返金する人の名前:</label>
            <input type="text" ref={toInput} />
          </div>

          <div className={styles.formGroup}>
            <label>借りた金額 (円):</label>
            <input type="number" id="amount" min="1" required ref={amountInput} />
          </div>

          <button type="submit" className={styles.buttonAdd}>
            追加
          </button>
        </form>

        <div className={styles.history}>
          <h2>現在の状況</h2>
          {/* <div className={styles.historyList}>
            {historys
              .slice()
              .reverse()
              .map((v) => (
                <div className={styles.historyItem} key={v.id}>
                  <div className={styles.historyText}>
                    <div className={styles.historyFrom}>
                      <div className={styles.historyFromTitle}>まとめ払いした人</div>
                      <div className={styles.historyFromText} title={v.from}>
                        {v.from}
                      </div>
                    </div>
                    <div className={styles.historySep}>から</div>
                    <div className={styles.historyTo}>
                      <div className={styles.historyToTitle}>返金する人</div>
                      <div className={styles.historyToText} title={v.to}>
                        {v.to}
                      </div>
                    </div>
                    <div className={styles.historySep}>に</div>
                    <div className={styles.historyAmount}>
                      <div className={styles.historyAmountTitle}>金額</div>
                      <div className={styles.historyAmountText} title={String(v.amount)}>
                        {v.amount}
                      </div>
                    </div>
                    <div className={styles.historySep}>円</div>
                  </div>
                  <button
                    className={styles.buttonDelete}
                    onClick={async () => {
                      deleteHistoryById(v.id);
                    }}
                  >
                    <img src="../../public/dust-box.png" alt="削除" className={styles.dustBox} />
                  </button>
                </div>
              ))}
          </div> */}

          {/* 新しいHTML構造 */}
          <table className={styles.historyList}>
            <tr className={styles.historyHeader}>
              <th className={styles.historyFromHeader}>まとめて払った人</th>
              <th className={styles.historyToHeader}>返金する人</th>
              <th className={styles.historyAmountHeader}>金額</th>
              <th className={styles.historyButtonHeader}></th>
            </tr>

            {historys
              .slice()
              .reverse()
              .map((v) => (
                <tr className={styles.historyItem}>
                  <td className={styles.historyFromText}>{v.from}</td>
                  <td className={styles.historyToText}>{v.to}</td>
                  <td className={styles.historyAmountText}>{v.amount}</td>
                  <td>
                    <button
                      className={styles.buttonDelete}
                      onClick={async () => {
                        deleteHistoryById(v.id);
                      }}
                    >
                      <img src="/dust-box.png" alt="削除" className={styles.dustBox} />
                    </button>
                  </td>
                </tr>
              ))}
          </table>
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
