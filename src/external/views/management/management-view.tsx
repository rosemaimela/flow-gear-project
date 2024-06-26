import React, { useEffect, useState } from 'react';
import * as xlsx from 'xlsx' ;
import css from './management-view.module.css';
import { useNavigate } from 'react-router-dom';
import AppSearchInput from 'assets/bootstrap/input/search-input/search-input';
import { HttpClientService } from 'service/http-client-service/http-client.service';
import AppH2 from 'assets/bootstrap/header/h2/h2';
import AppNumberInput from 'assets/bootstrap/input/number-input/number-input';
import AppButton from 'assets/bootstrap/button/button';
import SaveIcon from 'assets/images/icons/save/save';


const AppManagementPage = () => {
    const httpClientService: HttpClientService = new HttpClientService();

    const navigate = useNavigate();

   
    const importExcel = (e) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = (e) =>{
            const data = e.target.result;
            const workbook = xlsx.read(data, {type : "array"});
            const sheetName = workbook.SheetNames[0];
            const sheet  = workbook.Sheets[sheetName];
            const parseData = xlsx.utils.sheet_to_json(sheet);
         httpClientService.post<Object,Object>( "/import/stock",parseData,{},true).then( (resp) => {

         }).catch((error)=> {

         }) ;

        };

    }
   
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
            <AppButton className={css.import_excel_button} isImport = {true} onFileImport={importExcel} >
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
