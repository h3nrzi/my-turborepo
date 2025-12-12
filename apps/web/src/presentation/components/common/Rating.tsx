import { FC } from 'react';

interface Props {
  value: number;
  text?: string;
}

const Rating: FC<Props> = ({ value, text }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: '#f8e825', margin: '0.1rem' }}>
          {value >= star ? '★' : value >= star - 0.5 ? '☆' : '☆'}
        </span>
      ))}
      <span
        style={{ fontSize: '0.8rem', fontWeight: 600, paddingLeft: '0.5rem' }}
      >
        {text && text}
      </span>
    </div>
  );
};

export default Rating;
