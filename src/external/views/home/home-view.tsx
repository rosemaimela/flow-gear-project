import React, { useEffect, useState } from 'react';
import css from './home-view.module.css';
import { useNavigate } from 'react-router-dom';
import AppSearchInput from 'assets/bootstrap/input/search-input/search-input';
import AppProductCard from 'assets/bootstrap/product-card/product-card';
import { HttpClientService } from 'service/http-client-service/http-client.service';
import { HTTP_STATUS_CODE } from 'data/const/http-status-code';
import SessionStorageService from 'service/session-storage-service/session-storage-service';
import AppCartIcon from 'assets/bootstrap/cart-icon/cart-icon';

const AppHomePage = () => {
    let session: SessionStorageService = new SessionStorageService();
    const [cart, setCart] = useState(session.read('cart') ?? {});

    const httpClientService: HttpClientService = new HttpClientService();

    const navigate = useNavigate();

    // test data
    const [productList, setProductList] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);

    const onApiCall = async () => {
        let endpoint = '/tags/';

        let request = {
            // 'auth-key': process.env.REACT_APP_API_AUTH_KEY,
        };

        let customErrorHandlers = {
            [HTTP_STATUS_CODE.CONFLICT]: (error: any) => {
                //this.toastrService.error("Incorrect username/password", "Error")
                console.error(
                    'Incorrect username/password',
                    JSON.stringify(error, null, 2)
                );
            },
            [HTTP_STATUS_CODE.FORBIDDEN]: (error: any) => {
                //this.toastrService.error("Your account has been resctricted", "Error")
                console.error(
                    'Your account has been resctricted',
                    JSON.stringify(error, null, 2)
                );
            },
        };

        httpClientService
            .get<Object, Object>(endpoint, request, customErrorHandlers, true)
            .then((response) => {
                console.log(`Response received: ${JSON.stringify(response)}`);
            })
            .catch((error: any) => {
                console.error(
                    'Unexpected error occurred: ',
                    JSON.stringify(error, null, 2)
                );
            })
            .finally(() => {
                console.log('Request completed');
            });
    };

    useEffect(() => {
        onApiCall();
    }, []);
    return (
        <main className={css.main}>
            <AppCartIcon
                onClick={() => navigate('/checkout')}
                count={Object.keys(cart).reduce((total, item) => {
                    return total + cart[item];
                }, 0)}
            />
            <AppSearchInput
                className={css.search_input}
                placeholder='Search for a product'
            />
            <div className={css.product_list}>
                {productList.map((item) => (
                    <AppProductCard
                        key={item}
                        className={css.product_card}
                        flex='column'
                        title='Product Card'
                        onClick={() =>
                            navigate(
                                '/product/' + `?productName=ItemName${item}`
                            )
                        }
                    />
                ))}
            </div>
        </main>
    );
};

export default AppHomePage;
