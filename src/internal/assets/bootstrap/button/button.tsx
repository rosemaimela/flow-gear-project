import React, { Children } from 'react';
import css from './button.module.css';
import SaveIcon from 'assets/images/icons/save/save';

interface HeaderProps {
    icon?: string;
    label?: string;
    placeholder?: string;
    isImport? : boolean ;
    onClick?: () => void;
    onFileImport?: (e:any) => void;
    className?: string;
    children?: React.ReactNode;
}

const AppButton = ({
    placeholder: string = 'Quantity',
    isImport = false,
    onClick = () => {},
    onFileImport = (e:any) => {},
    className,
    children,
}: HeaderProps) => {
    const classes = ` ${className ?? ''}`;
    const onUpload = () => {
        document.getElementById('importer').click();
    }
    return (
        <div className={css.wrapper + classes}>
            
            {
                isImport && 
                <input id='importer' className={css.import_excel_input} type='file' onChange={onFileImport} ></input>
            }
            <button
                className={css.button + ` ${className ?? ''}`}
                type='button'
                onClick={isImport ? onUpload : onClick }
            >
                {children}
            </button>
        </div>
    );
};

export default AppButton;
