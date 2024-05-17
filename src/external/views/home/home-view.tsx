import React, { useEffect, useState } from 'react';
import css from './home-view.module.css';
import { useNavigate } from 'react-router-dom';
import AppSearchInput from 'assets/bootstrap/input/search-input/search-input';
import AppProductCard from 'assets/bootstrap/product-card/product-card';
import { HttpClientService } from 'service/http-client-service/http-client.service';
import { HTTP_STATUS_CODE } from 'data/const/http-status-code';

const AppHomePage = () => {
    const httpClientService: HttpClientService = new HttpClientService();

    const navigate = useNavigate();

    // test data
    const [productList, setProductList] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    const onApiCall = async () => {
        let url = '/tags';

        let request = {
            'auth-key': process.env.REACT_APP_API_AUTH_KEY,
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
            .get<Object, Object>(url, request, customErrorHandlers, true)
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
            <AppSearchInput
                className={css.search_input}
                placeholder='Search for a product'
            />
            <div
                className={css.product_list}
                onClick={() => navigate('/product')}
            >
                {productList.map((item) => (
                    <AppProductCard
                        key={item}
                        className={css.product_card}
                        flex='column'
                        title='Product Card'
                    />
                ))}
            </div>
        </main>
    );
};

export default AppHomePage;
