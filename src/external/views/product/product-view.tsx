import React, { useState } from 'react';
import css from './product-view.module.css';
import SessionStorageService from 'service/session-storage-service/session-storage-service';
import AppButton from 'assets/bootstrap/button/button';
import AppCartIcon from 'assets/bootstrap/cart-icon/cart-icon';
import { useNavigate } from 'react-router-dom';
import AppH2 from 'assets/bootstrap/header/h2/h2';
const AppProductPage = () => {
    const queryProductName = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('productName');
    };

    const navigate = useNavigate();
    let session: SessionStorageService = new SessionStorageService();
    const [cart, setCart] = useState(session.read('cart') ?? {});
    const [product, setProduct] = useState(queryProductName());

    const addItemToList = (item: string) => {
        setCart({
            ...cart,
            [product]: cart[product] ? cart[product] + 1 : 1,
        });
        session.write('cart', cart);
    };
    return (
        <main className={css.main}>
            <AppCartIcon
                onClick={() => navigate('/checkout')}
                count={Object.keys(cart).reduce((total, item) => {
                    return total + cart[item];
                }, 0)}
            />
            <section className={css.wrapper}>
                <div className={css.image_section}>
                    <img
                        className={css.product_image}
                        src={process.env.PUBLIC_URL + '/images/stock.png'}
                    />
                </div>
                <div className={css.description_section}>
                    <AppH2 className={css.h2} title={product} />
                    <p>Product description to go here</p>
                    <p>
                        {' '}
                        Tesx that will go here is life spodf voiod fjepg lijf e
                        g eowiijf fjef l go here is life spodf voiod fjepg lijf
                        e g eowiijf fjef l go here is life spodf voiod fjepg
                        lijf e g eowiijf fjef l go here is life spodf voiod
                        fjepg lijf e g eowiijf fjef l go here is life spodf
                        voiod fjepg lijf e g eowiijf fjef
                    </p>
                </div>
            </section>

            <AppButton
                className={css.add_to_cart_button}
                onClick={() => addItemToList(product)}
            >
                Add to cart
            </AppButton>
        </main>
    );
};

export default AppProductPage;
