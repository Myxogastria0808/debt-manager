import type { FC } from 'react';
import styles from './index.module.css';

const Root: FC = () => {
  return (
    <>
      <h1 className={styles.subTitle}>debt-manager</h1>
      <p>グループでお金の貸し借りができるアプリです。</p>
      <p>リマインダ機能によって既存のアプリよりも入力忘れ、返し忘れを防げます。</p>
    </>
  );
};

export default Root;
