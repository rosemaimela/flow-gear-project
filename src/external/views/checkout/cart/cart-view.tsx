import React, { useState } from 'react';
import css from './cart-view.module.css';
import { useNavigate } from 'react-router-dom';
import AppProductCard from 'assets/bootstrap/product-card/product-card';
import SessionStorageService from 'service/session-storage-service/session-storage-service';
import AppButton from 'assets/bootstrap/button/button';

const AppCheckoutCartPage = () => {
    let session: SessionStorageService = new SessionStorageService();
    const [cart, setCart] = useState(session.read('cart') ?? {});

    const navigate = useNavigate();

    const removeFromCart = (item: string) => {
        delete cart[item];
        setCart(cart);
        session.write('cart', cart);
    };

    const subtractFromCount = (item: string) => () => {
        setCart({
            ...cart,
            [item]: cart[item] - 1,
        });
        session.write('cart', cart);
    };

    const addToCount = (item: string) => () => {
        setCart({
            ...cart,
            [item]: cart[item] + 1,
        });
        session.write('cart', cart);
    };

    return (
        <main className={css.main}>
            <div className={css.product_list}>
                {Object.keys(cart).map((item) => (
                    <div className={css.product_card_wrapper}>
                        <AppProductCard
                            key={item}
                            flex='row'
                            title='Product Card'
                            className={css.product_card}
                            onClick={() =>
                                navigate(
                                    '/product/' + `?productName=ItemName${item}`
                                )
                            }
                        />
                        <div>
                            <p>
                                Item count:{' '}
                                <span className={css.item_count}>
                                    {cart[item]}
                                </span>
                            </p>
                            <AppButton
                                className={css.remove_button}
                                onClick={() => removeFromCart(item)}
                            >
                                Delete
                            </AppButton>
                            <div className={css.add_or_subtract}>
                                <AppButton
                                    className={css.subtract_button}
                                    onClick={subtractFromCount(item)}
                                >
                                    -
                                </AppButton>
                                <AppButton
                                    className={css.add_button}
                                    onClick={addToCount(item)}
                                >
                                    +
                                </AppButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AppButton
                className={css.checkout_button}
                onClick={() => navigate('/checkout/proceed')}
            >
                Proceed to checkout
            </AppButton>
        </main>
    );
};

export default AppCheckoutCartPage;
