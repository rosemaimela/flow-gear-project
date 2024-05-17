import React, { useEffect, useState } from 'react';
import css from './management-view.module.css';
import { useNavigate } from 'react-router-dom';
import AppSearchInput from 'assets/bootstrap/input/search-input/search-input';
import AppProductCard from 'assets/bootstrap/product-card/product-card';
import { HttpClientService } from 'service/http-client-service/http-client.service';
import { HTTP_STATUS_CODE } from 'data/const/http-status-code';
import AppH2 from 'assets/bootstrap/header/h2/h2';
import AppNumberInput from 'assets/bootstrap/input/number-input/number-input';
import AppButton from 'assets/bootstrap/button/button';
import SaveIcon from 'assets/images/icons/save/save';

const AppManagementPage = () => {
    const httpClientService: HttpClientService = new HttpClientService();

    const navigate = useNavigate();

    return (
        <main className={css.main}>
            <AppH2 className={css.h2} title='Add Stock' />
            <div className={css.add_stock}>
                <AppSearchInput
                    className={css.search_input}
                    placeholder='Search...'
                />
                <AppNumberInput
                    placeholder='Quantity'
                    className={css.quantity_input}
                />
                <AppButton className={css.save_button}>
                    <SaveIcon />
                </AppButton>
            </div>
            <AppButton className={css.import_excel_button}>
                Import Excel
            </AppButton>

            <AppH2 className={css.h2} title='Get Current Stock Report' />
            <div className={css.date_range}>
                <AppNumberInput
                    placeholder='From'
                    className={css.quantity_input}
                />
                <AppNumberInput
                    placeholder='To'
                    className={css.quantity_input}
                />
            </div>
            <AppButton className={css.download_excel_button}>
                Download Report
            </AppButton>
        </main>
    );
};

export default AppManagementPage;
