import React from 'react';
import s from './code-input-box.module.css'

interface CodeInputBoxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  incorrectCode: boolean;
}

const CodeInputBox: React.FC<CodeInputBoxProps> = ({
  id,
  value,
  onChange,
  onKeyDown,
  onPaste,
  incorrectCode,
}) => {
  return (
    <input
      id={id}
      autoComplete="off"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => e.target.select()}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      maxLength={1}
      style={{
        width: 'auto',
        padding: '10px',
        maxWidth: 60,
        backgroundColor: '#181818',
        border: 'none',
        borderBottom: incorrectCode ? '1px solid #FF756E' : '1px solid white',
        outline: 'none',
        color: 'white',
      }}
      className={s.code_box}
    />
  );
};

export default CodeInputBox;
