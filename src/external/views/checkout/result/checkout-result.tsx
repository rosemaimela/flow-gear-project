import React from 'react';
import css from './checkout-result.module.css';
import AppH1 from 'assets/bootstrap/header/h1/h1';
import CheckSuccess from 'assets/images/icons/save/check-success';
import CrossUnsuccess from 'assets/images/icons/save/cross-unsuccess';
const AppCheckoutResultPage = () => {
    const [isSuccess, setSuccess] = React.useState(false);
    const message = isSuccess
        ? 'Your order has been successfully processed'
        : 'Your order has been failed to process. Please try again later.';
    return (
        <main className={css.main}>
            <div
                className={
                    css.result_wrapper +
                    ` ${isSuccess ? css.result_success : css.result_error}`
                }
            >
                <AppH1
                    className={css.result_header}
                    title={
                        isSuccess ? 'Order Confirmation' : 'Order Unsuccessful'
                    }
                />
            </div>
            <img
                className={css.image}
                src={
                    process.env.PUBLIC_URL +
                    (isSuccess
                        ? '/images/success_background.png'
                        : '/images/unsuccess_background.png')
                }
                alt='success'
            />
            {isSuccess && <CheckSuccess className={css.success_icon} />}
            {!isSuccess && <CrossUnsuccess className={css.unsuccess_icon} />}
            <p className={css.message}>{message}</p>
        </main>
    );
};

export default AppCheckoutResultPage;
