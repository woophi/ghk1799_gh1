import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { sendDataToGA } from '../utils/events';
import { testStyles } from './style.css';

type Props = {
  result: {
    results: number[];
    title: string;
    text: string;
    img: string;
  };
  resultsCount: number;
};

export const TestResult = ({ result, resultsCount }: Props) => {
  const [loading, setLoading] = useState(false);

  const openAcc = useCallback(() => {
    setLoading(true);
    sendDataToGA(String(resultsCount), 'Открыть брокерский счет').then(() => {
      setLoading(false);

      (window.location as unknown as string) = 'alfabank://investments/open_brokerage_account';
    });
  }, [resultsCount]);
  const buySt = useCallback(() => {
    setLoading(true);
    sendDataToGA(String(resultsCount), 'Купить облигации').then(() => {
      setLoading(false);

      (window.location as unknown as string) = 'alfabank://investments/catalogue?tab=BOND';
    });
  }, [resultsCount]);

  return (
    <div className={testStyles.container}>
      <div className={testStyles.resultsWrap}>
        <div className={testStyles.iconBg}>
          <img src={result.img} width={40} height={40} />
        </div>

        <Typography.TitleResponsive tag="h3" view="medium" font="system" weight="bold">
          {resultsCount} из 5. {result.title}
        </Typography.TitleResponsive>

        <Typography.Text tag="p" view="primary-medium" className={testStyles.resultsText} defaultMargins={false}>
          {result.text}
        </Typography.Text>
      </div>

      <Gap size={32} />
      <ButtonMobile loading={loading} block={true} view="primary" onClick={openAcc}>
        Открыть брокерский счет
      </ButtonMobile>
      <Gap size={16} />
      <ButtonMobile loading={loading} block={true} view="secondary" onClick={buySt}>
        Купить облигации
      </ButtonMobile>
    </div>
  );
};
